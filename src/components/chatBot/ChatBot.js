import React, {useState, useEffect, useRef, useContext} from "react";
import "./ChatBot.scss";
import StyleContext from "../../contexts/StyleContext";
import {sendChatMessage} from "../../services/aiChatService";

const SUGGESTIONS = [
  "What are your core AI & LLM skills?",
  "Tell me about your AI Agent projects",
  "Where did you study?",
  "How can I contact or hire you?"
];

export default function ChatBot() {
  const {isDark} = useContext(StyleContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am Jamil Khan's AI Representative. Ask me anything about Jamil's AI engineering experience, technical skills, publications, education, or contact details."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
      if (typeof window !== "undefined" && window.innerWidth <= 768) {
        document.body.style.overflow = "hidden";
      }
    } else {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "unset";
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, messages]);

  const handleSend = async textToSend => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg = {role: "user", content: query};
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(query, updatedMessages);
      setMessages(prev => [...prev, {role: "assistant", content: response}]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered an error processing your query. Please contact Jamil Khan directly at jamilkhan.ju@gmail.com."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Conversation cleared. How can I assist you with Jamil Khan's background today?"
      }
    ]);
  };

  return (
    <div className={`chatbot-wrapper ${isDark ? "dark-theme" : "light-theme"}`}>
      {/* Floating Circular Trigger Button */}
      <button
        className={`chatbot-circle-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
        title={isOpen ? "Close Chat" : "Chat with Jamil's AI"}
      >
        <div className="circle-btn-inner">
          {isOpen ? (
            <i className="fas fa-times" />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png?v=2026`}
              alt="Jamil AI"
              className="circle-btn-logo"
            />
          )}
        </div>
        {!isOpen && hasUnread && <span className="chatbot-unread-dot" />}
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <img
                  src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png?v=2026`}
                  alt="Jamil AI"
                  className="chatbot-avatar-img"
                />
                <span className="chatbot-status-indicator" />
              </div>
              <div className="chatbot-header-text">
                <h4 className="chatbot-name">Jamil AI Assistant</h4>
                <p className="chatbot-tagline">Online</p>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-action-btn"
                onClick={clearChat}
                title="Clear conversation"
                aria-label="Clear chat"
              >
                <i className="fas fa-trash-alt" />
              </button>
              <button
                type="button"
                className="chatbot-action-btn"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="chatbot-suggestions">
            {SUGGESTIONS.map((text, idx) => (
              <button
                key={idx}
                type="button"
                className="chatbot-chip"
                onClick={() => handleSend(text)}
                disabled={isLoading}
              >
                {text}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message-row ${
                  msg.role === "user" ? "user-row" : "assistant-row"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="msg-avatar">
                    <img
                      src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png?v=2026`}
                      alt="Jamil AI"
                      className="msg-avatar-img"
                    />
                  </div>
                )}
                <div className="chatbot-message-content-col">
                  <div className="chatbot-message-bubble">
                    <p>{msg.content}</p>
                  </div>
                  {msg.role === "assistant" &&
                    (msg.content.includes("jamilkhan.ju@gmail.com") ||
                      msg.content.includes("+880 1760") ||
                      msg.content.toLowerCase().includes("whatsapp") ||
                      msg.content.toLowerCase().includes("email") ||
                      msg.content.toLowerCase().includes("contact") ||
                      msg.content.toLowerCase().includes("reach out") ||
                      msg.content.includes("যোগাযোগ")) && (
                      <div className="chatbot-quick-contact-actions">
                        <a
                          href="mailto:jamilkhan.ju@gmail.com"
                          className="chatbot-contact-action-btn email-action"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Send Email to Jamil"
                        >
                          <i className="fas fa-envelope" />
                          <span>Email</span>
                        </a>
                        <a
                          href="https://wa.me/8801760413449"
                          className="chatbot-contact-action-btn whatsapp-action"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Chat on WhatsApp"
                        >
                          <i className="fab fa-whatsapp" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href="https://linkedin.com/in/jamilkhanemon"
                          className="chatbot-contact-action-btn linkedin-action"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View LinkedIn Profile"
                        >
                          <i className="fab fa-linkedin" />
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-message-row assistant-row">
                <div className="msg-avatar">
                  <img
                    src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png?v=2026`}
                    alt="Jamil AI"
                    className="msg-avatar-img"
                  />
                </div>
                <div className="chatbot-message-bubble typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area (ChatGPT Style Pill) */}
          <div className="chatbot-footer">
            <div className="chatbot-input-container">
              <button
                type="button"
                className="chatbot-plus-btn"
                onClick={() => {
                  const randomPrompt =
                    SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
                  setInput(randomPrompt);
                  inputRef.current?.focus();
                }}
                title="Insert Quick Question"
                aria-label="Insert Quick Question"
              >
                <i className="fas fa-plus" />
              </button>
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Ask about Jamil's AI experience..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                style={{
                  transform: "none",
                  textAlign: "left",
                  width: "100%",
                  margin: 0
                }}
              />
              <button
                type="button"
                className="chatbot-send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                aria-label="Send Message"
                title="Send"
              >
                <i className="fas fa-arrow-up" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
