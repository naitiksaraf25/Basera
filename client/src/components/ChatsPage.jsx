import { useSearchParams, useNavigate } from "react-router-dom";
import { ChatView } from "./ChatView";

export function ChatsPage({ user }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const targetId = searchParams.get("target");

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <ChatView
        user={user}
        initialChatId={targetId}
        onBackToMatching={() => navigate("/app/matches")}
      />
    </div>
  );
}
