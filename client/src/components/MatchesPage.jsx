import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MatchRequirementForm } from "./MatchRequirementForm";
import { MatchResultsView } from "./MatchResultsView";

export function MatchesPage({ user, isVerified }) {
  const navigate = useNavigate();
  const [matchState, setMatchState] = useState({
    matchRequest: null,
    isCached: false,
    loading: false,
    error: null,
    viewMode: "form", // 'form' | 'results'
  });

  // Fetch latest cached match request on mount
  useEffect(() => {
    if (user && isVerified && !matchState.matchRequest) {
      fetch("/api/match/history/latest")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.matchRequest) {
            setMatchState((prev) => ({
              ...prev,
              matchRequest: data.matchRequest,
              isCached: true,
              viewMode: "results",
            }));
          }
        })
        .catch(() => {});
    }
  }, [user, isVerified]);

  const handleFindMatches = async (
    { requesterType, criteria },
    forceRecompute = false,
  ) => {
    setMatchState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch(
        `/api/match/request${forceRecompute ? "?recompute=true" : ""}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requesterType, criteria, forceRecompute }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Failed to calculate matches",
        );
      }

      setMatchState({
        matchRequest: data.matchRequest,
        isCached: Boolean(data.isCached),
        loading: false,
        error: null,
        viewMode: "results",
      });
    } catch (err) {
      setMatchState((prev) => ({
        ...prev,
        loading: false,
        error: err.message,
      }));
    }
  };

  return (
    <div>
      {matchState.error && (
        <div className="error-alert" style={{ textAlign: "left", marginBottom: "1.2rem" }}>
          {matchState.error}
        </div>
      )}

      {matchState.viewMode === "form" ? (
        <MatchRequirementForm
          user={user}
          loading={matchState.loading}
          onFindMatches={handleFindMatches}
          onNavigateToProfile={() => navigate("/app/profile")}
        />
      ) : (
        <MatchResultsView
          matchRequest={matchState.matchRequest}
          isCached={matchState.isCached}
          onRecompute={(force) => {
            if (matchState.matchRequest?.criteria) {
              handleFindMatches(
                {
                  requesterType: matchState.matchRequest.requesterType,
                  criteria: matchState.matchRequest.criteria,
                },
                force,
              );
            } else {
              setMatchState((prev) => ({ ...prev, viewMode: "form" }));
            }
          }}
          onBackToForm={() => setMatchState((prev) => ({ ...prev, viewMode: "form" }))}
          onOpenChat={(targetId) => {
            navigate(`/app/chats?target=${targetId}`);
          }}
        />
      )}
    </div>
  );
}
