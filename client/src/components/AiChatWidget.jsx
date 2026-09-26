import React, { useState, useRef, useEffect } from "react";

const FAQ_SUGGESTIONS = [
  "🎯 How does matching work?",
  "💰 Is Basera free to use?",
  "🛡️ How are listings verified?",
];

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "bot",
      text: "👋 Hi! I'm Basera AI Concierge. Ask me anything about how lifestyle matching works, verified rooms, or our zero-brokerage platform!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMessageId = `msg-${Date.now()}`;
    const newMessages = [...messages, { id: userMessageId, sender: "user", text }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      // Build brief history for context (exclude welcome message)
      const historyPayload = newMessages
        .filter((m) => m.id !== "welcome-1")
        .slice(-4)
        .map((m) => ({ sender: m.sender, text: m.text }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      const botReply =
        data?.reply ||
        "Basera connects you with verified roommates and student housing based on lifestyle compatibility with zero brokerage.";

      setMessages((prev) => [
        ...prev,
        { id: `reply-${Date.now()}`, sender: "bot", text: botReply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: "bot",
          text: "Sorry, I ran into a brief connection hiccup. Please ask again or explore our listings!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      id="basera-ai-widget"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        fontFamily: "inherit",
      }}
    >
      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          id="basera-ai-panel"
          style={{
            position: "absolute",
            bottom: "4rem",
            right: 0,
            width: "370px",
            maxWidth: "calc(100vw - 2rem)",
            height: "500px",
            maxHeight: "calc(100vh - 7rem)",
            backgroundColor: "var(--bg-surface)",
            borderRadius: "20px",
            border: "1px solid var(--border-subtle)",
            boxShadow:
              "0 20px 35px -10px rgba(0, 0, 0, 0.25), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fadeScaleIn 0.2s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "0.85rem 1.1rem",
              background:
                "linear-gradient(135deg, var(--accent-primary) 0%, #4338ca 100%)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                ✨
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", lineHeight: 1.2 }}>
                  Basera Concierge
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    opacity: 0.9,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    marginTop: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#4ade80",
                      display: "inline-block",
                    }}
                  />
                  AI Assistant • Online
                </div>
              </div>
            </div>

            <button
              id="ai-widget-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "none",
                color: "#fff",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                fontWeight: 700,
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.28)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")
              }
            >
              ✕
            </button>
          </div>

          {/* Messages list */}
          <div
            id="ai-messages-container"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              background: "var(--bg-main)",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "0.65rem 0.9rem",
                    borderRadius:
                      m.sender === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background:
                      m.sender === "user"
                        ? "var(--accent-primary)"
                        : "var(--bg-surface)",
                    color:
                      m.sender === "user"
                        ? "#ffffff"
                        : "var(--text-primary)",
                    fontSize: "0.85rem",
                    lineHeight: 1.45,
                    border:
                      m.sender === "user"
                        ? "none"
                        : "1px solid var(--border-subtle)",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick Suggestion Chips (when only 1 or 2 turns) */}
            {messages.length <= 2 && !loading && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  marginTop: "0.3rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Suggested Questions
                </span>
                {FAQ_SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    id={`ai-suggestion-chip-${idx}`}
                    onClick={() => handleSendMessage(sug)}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                      borderRadius: "9999px",
                      padding: "0.4rem 0.8rem",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent-primary)";
                      e.currentTarget.style.background = "var(--bg-surface-subtle)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.background = "var(--bg-surface)";
                    }}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Typing Indicator */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "0.6rem 0.9rem",
                    borderRadius: "16px 16px 16px 4px",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Basera AI is typing...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div
            style={{
              padding: "0.65rem 0.85rem",
              background: "var(--bg-surface)",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "0.35rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <input
                ref={inputRef}
                id="ai-chat-input"
                type="text"
                placeholder="Ask about matching, rooms, safety..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "0.55rem 0.8rem",
                  fontSize: "0.83rem",
                  borderRadius: "9999px",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-surface-subtle)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
              <button
                id="ai-chat-send-btn"
                onClick={() => handleSendMessage()}
                disabled={loading || !inputValue.trim()}
                style={{
                  background:
                    loading || !inputValue.trim()
                      ? "var(--bg-surface-subtle)"
                      : "var(--accent-primary)",
                  color: loading || !inputValue.trim() ? "var(--text-muted)" : "#fff",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "0.55rem 0.9rem",
                  fontSize: "0.83rem",
                  fontWeight: 700,
                  cursor: loading || !inputValue.trim() ? "not-allowed" : "pointer",
                  transition: "background 0.15s ease",
                }}
              >
                Send
              </button>
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                textAlign: "center",
              }}
            >
              Powered by Gemini AI • Zero Brokerage • Verified Students
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        id="ai-widget-launcher-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle AI Concierge Chat"
        style={{
          background: "linear-gradient(135deg, var(--accent-primary) 0%, #4338ca 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "9999px",
          padding: "0.65rem 1.15rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.88rem",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 12px 25px rgba(99, 102, 241, 0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(99, 102, 241, 0.4)";
        }}
      >
        <span style={{ fontSize: "1.1rem" }}>{isOpen ? "✕" : "✨"}</span>
        <span>{isOpen ? "Close" : "Basera AI"}</span>
      </button>
    </div>
  );
}
