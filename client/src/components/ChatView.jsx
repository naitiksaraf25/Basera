import { useState, useEffect, useRef } from "react";
import { ReportModal } from "./ReportModal";

export function ChatView({ user, initialChatId = null, onBackToMatching }) {
  const [chatList, setChatList] = useState([]);
  const [activeChatId, setActiveChatId] = useState(initialChatId);
  const [activeChatData, setActiveChatData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loadingList, setLoadingList] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const messagesEndRef = useRef(null);

  const currentUserId = String(user?.id);

  // Scroll to bottom of message thread
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Fetch active matched chats list
  const fetchChatList = async (showLoading = false) => {
    if (showLoading) setLoadingList(true);
    try {
      const res = await fetch("/api/chat/list");
      if (res.ok) {
        const data = await res.json();
        const chats = data.chats || [];
        setChatList(chats);

        // Auto-select first chat if no activeChatId is set and chats exist
        if (!activeChatId && chats.length > 0 && !initialChatId) {
          setActiveChatId(chats[0]._id);
        }
      }
    } catch (err) {
      console.error("[ChatView] Error fetching chat list:", err);
    } finally {
      if (showLoading) setLoadingList(false);
    }
  };

  // 2. Fetch messages for active chat thread
  const fetchMessages = async (chatId, isPolling = false) => {
    if (!chatId) return;
    if (!isPolling) setLoadingMessages(true);
    try {
      const res = await fetch(`/api/chat/${chatId}/messages`);
      const data = await res.json();

      if (res.ok) {
        setMessages(data.messages || []);
        setActiveChatData(data.otherParticipant);
        setErrorAlert(null);
      } else {
        setErrorAlert(data.message || "Failed to load chat thread.");
      }
    } catch (err) {
      console.error("[ChatView] Error fetching messages:", err);
    } finally {
      if (!isPolling) setLoadingMessages(false);
    }
  };

  // Initial load of chat list
  useEffect(() => {
    fetchChatList(true);
  }, []);

  // Set initial chat ID if provided as prop
  useEffect(() => {
    if (initialChatId) {
      setActiveChatId(initialChatId);
    }
  }, [initialChatId]);

  // Load messages whenever activeChatId changes
  useEffect(() => {
    if (activeChatId) {
      fetchMessages(activeChatId, false);
    } else {
      setMessages([]);
      setActiveChatData(null);
    }
  }, [activeChatId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 3. Polling for near-real-time updates while a chat is open (PRD US-11 requirement #2)
  useEffect(() => {
    if (!activeChatId) return;

    // Poll active chat thread every 3 seconds
    const messageInterval = setInterval(() => {
      fetchMessages(activeChatId, true);
    }, 3000);

    // Poll chat list every 8 seconds for list activity & unread status
    const listInterval = setInterval(() => {
      fetchChatList(false);
    }, 8000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(listInterval);
    };
  }, [activeChatId]);

  // Handle message sending
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();

    if (!trimmed) {
      setErrorAlert("Message text cannot be empty or whitespace only.");
      return;
    }

    if (trimmed.length > 2000) {
      setErrorAlert(
        `Message exceeds max limit of 2000 characters (${trimmed.length} chars).`,
      );
      return;
    }

    setSendingMessage(true);
    setErrorAlert(null);

    try {
      const res = await fetch(`/api/chat/${activeChatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await res.json();

      if (res.ok) {
        setInputText("");
        // Append new message locally immediately
        setMessages((prev) => [...prev, data.message]);
        // Refresh chat list to update last message preview
        fetchChatList(false);
      } else {
        setErrorAlert(data.message || "Failed to send message.");
      }
    } catch (err) {
      setErrorAlert("Network error sending message.");
    } finally {
      setSendingMessage(false);
    }
  };

  const formatTimestamp = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const activeChatObj = chatList.find((c) => c._id === activeChatId);
  const otherParticipant = activeChatData || activeChatObj?.otherParticipant;

  return (
    <div style={{ maxWidth: "850px", margin: "1rem auto", textAlign: "left" }}>
      {/* Header Bar */}
      <div
        className="card"
        style={{
          display: "flex",
          justify: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          padding: "0.85rem 1.25rem",
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: "#f8fafc" }}>
            💬 Active Matched Chats
          </h3>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            Near-Real-Time In-App Messaging • PRD §5.4 (US-11)
          </span>
        </div>
        {onBackToMatching && (
          <button
            onClick={onBackToMatching}
            style={{ fontSize: "0.85rem", padding: "0.4rem 0.8rem" }}
          >
            ← Back to Matching
          </button>
        )}
      </div>

      {errorAlert && (
        <div
          className="error-alert"
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{errorAlert}</span>
          <button
            onClick={() => setErrorAlert(null)}
            style={{
              background: "transparent",
              border: "none",
              color: "#ef4444",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Grid Container: Chat List (Left) + Message Thread (Right) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: chatList.length > 0 ? "280px 1fr" : "1fr",
          gap: "1.25rem",
          minHeight: "560px",
        }}
      >
        {/* Chat List Sidebar */}
        <div
          className="card"
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            borderRadius: "18px",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "var(--text-muted)",
              fontSize: "0.78rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
              paddingLeft: "0.25rem",
            }}
          >
            Conversations ({chatList.length})
          </div>

          {loadingList ? (
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                padding: "2rem 0",
                textAlign: "center",
              }}
            >
              ⏳ Loading matched chats...
            </div>
          ) : chatList.length === 0 ? (
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                padding: "2.5rem 1rem",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: "2rem" }}>💬</p>
              <p style={{ margin: "0.5rem 0", fontWeight: 700, color: "var(--text-primary)" }}>
                No active chats yet
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                When you and another student or landlord express mutual interest, your private conversation unlocks here!
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                overflowY: "auto",
              }}
            >
              {chatList.map((chat) => {
                const isSelected = chat._id === activeChatId;
                const candidate = chat.otherParticipant || {};
                const lastMsg = chat.lastMessage;

                return (
                  <div
                    key={chat._id}
                    onClick={() => setActiveChatId(chat._id)}
                    style={{
                      padding: "0.75rem 0.9rem",
                      borderRadius: "14px",
                      cursor: "pointer",
                      background: isSelected ? "var(--accent-primary-subtle)" : "var(--bg-surface-subtle)",
                      border: isSelected ? "1.5px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.92rem",
                          color: isSelected ? "var(--accent-primary)" : "var(--text-primary)",
                        }}
                      >
                        {candidate.name || "Matched User"}
                      </span>
                      {chat.unreadCount > 0 && (
                        <span
                          className="badge badge-success"
                          style={{ fontSize: "0.7rem", padding: "1px 6px" }}
                        >
                          {chat.unreadCount} new
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginTop: "2px",
                        textTransform: "capitalize",
                      }}
                    >
                      {candidate.role || "Student"} • {candidate.city || "Launch City"}
                    </div>

                    {lastMsg && (
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-secondary)",
                          marginTop: "5px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {lastMsg.senderId === currentUserId ? "You: " : ""}
                        {lastMsg.text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Message Thread View */}
        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 0,
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          {activeChatId && otherParticipant ? (
            <>
              {/* Thread Top Bar */}
              <div
                style={{
                  padding: "0.9rem 1.25rem",
                  background: "var(--bg-surface-subtle)",
                  borderBottom: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                  }}
                >
                  {otherParticipant.photoUrl ? (
                    <img
                      src={otherParticipant.photoUrl}
                      alt={otherParticipant.name}
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        objectFit: "cover",
                        border: "1.5px solid var(--accent-primary)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, var(--accent-primary), var(--accent-warm))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        color: "#fff",
                        fontSize: "1.1rem",
                      }}
                    >
                      {(otherParticipant.name || "B").charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h4
                      style={{
                        margin: 0,
                        color: "var(--text-primary)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                      }}
                    >
                      {otherParticipant.name || "Matched Candidate"}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        textTransform: "capitalize",
                      }}
                    >
                      {otherParticipant.role} • 📍 {otherParticipant.locality ? `${otherParticipant.locality}, ` : ""}{otherParticipant.city || "Launch City"}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <span className="badge badge-success" style={{ fontSize: "0.75rem" }}>
                    ✓ Matched
                  </span>
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="pill-btn-ghost"
                    style={{
                      color: "#ef4444",
                      fontSize: "0.75rem",
                      padding: "0.3rem 0.65rem",
                    }}
                  >
                    🚨 Report
                  </button>
                </div>
              </div>

              {/* Privacy Notice Banner */}
              <div
                style={{
                  background: "var(--accent-primary-subtle)",
                  borderBottom: "1px solid var(--border-subtle)",
                  padding: "0.45rem 1rem",
                  fontSize: "0.75rem",
                  color: "var(--accent-primary)",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                🔒 Contact information is protected. Feel free to exchange phone/socials voluntarily when ready.
              </div>

              {/* Messages Container */}
              <div
                style={{
                  flex: 1,
                  padding: "1.25rem",
                  overflowY: "auto",
                  maxHeight: "380px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                {loadingMessages ? (
                  <div
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.85rem",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  >
                    ⏳ Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      margin: "auto",
                      padding: "2rem 0",
                    }}
                  >
                    👋 Say hello to <strong>{otherParticipant.name}</strong>! Ask about room visits or living habits.
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = String(msg.senderId) === currentUserId;
                    return (
                      <div
                        key={msg._id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isMe ? "flex-end" : "flex-start",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "75%",
                            padding: "0.7rem 1.05rem",
                            borderRadius: isMe
                              ? "18px 18px 4px 18px"
                              : "18px 18px 18px 4px",
                            background: isMe
                              ? "linear-gradient(135deg, var(--accent-primary), #1d4ed8)"
                              : "var(--bg-surface-subtle)",
                            color: isMe ? "#ffffff" : "var(--text-primary)",
                            border: isMe ? "none" : "1px solid var(--border-subtle)",
                            fontSize: "0.92rem",
                            lineHeight: "1.45",
                            wordBreak: "break-word",
                            boxShadow: "var(--shadow-sm)",
                          }}
                        >
                          {msg.text}
                        </div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--text-muted)",
                            marginTop: "3px",
                            padding: "0 4px",
                          }}
                        >
                          {isMe ? "You • " : `${otherParticipant.name} • `}
                          {formatTimestamp(msg.sentAt)}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Text Input Form */}
              <form
                onSubmit={handleSendMessage}
                style={{
                  padding: "0.85rem 1.25rem",
                  background: "var(--bg-surface-subtle)",
                  borderTop: "1px solid var(--border-subtle)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <input
                    type="text"
                    placeholder="Type a friendly message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    maxLength={2000}
                    disabled={sendingMessage}
                    style={{
                      flex: 1,
                      padding: "0.7rem 1rem",
                      borderRadius: "9999px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      fontSize: "0.92rem",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={sendingMessage || !inputText.trim()}
                    className="pill-btn-primary"
                    style={{
                      padding: "0.6rem 1.4rem",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    {sendingMessage ? "Sending..." : "Send 📤"}
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    padding: "0 4px",
                  }}
                >
                  <span>Press Enter to send</span>
                  <span>{inputText.length} / 2000 characters</span>
                </div>
              </form>
            </>
          ) : (
            <div
              style={{
                height: "100%",
                padding: "3rem 1.5rem",
                color: "var(--text-muted)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                💬
              </div>
              <h4 style={{ margin: 0, color: "var(--text-primary)", fontSize: "1.1rem" }}>
                Select a Matched Conversation
              </h4>
              <p
                style={{
                  fontSize: "0.85rem",
                  maxWidth: "340px",
                  color: "var(--text-muted)",
                  marginTop: "0.4rem",
                }}
              >
                Choose a matched flatmate from the left panel to view messages or start chatting.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Report Modal inside Chat */}
      {showReportModal && otherParticipant && (
        <ReportModal
          reportedUserId={
            otherParticipant.userId ||
            otherParticipant.candidateId ||
            otherParticipant.id ||
            otherParticipant._id
          }
          reportedUserName={otherParticipant.name}
          onClose={() => setShowReportModal(false)}
          onReportSubmitted={() => {
            setErrorAlert(
              "Report submitted successfully to platform moderators.",
            );
          }}
        />
      )}
    </div>
  );
}
