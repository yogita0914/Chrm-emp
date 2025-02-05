import React, { useState } from "react";
import "./chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = () => {
    if (input.trim()) {
      if (["close", "exit"].includes(input.trim().toLowerCase())) {
        closeChat();
        setInput("");
        return;
      }

      const userMessage = { type: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botResponse = generateResponse(input);
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);

      setInput("");
    }
  };

  const generateResponse = (userInput) => {
    const responses = {
      hello: "Hi there! How can I help you today?",
      "what is verloop.io":
        "Verloop.io is the world's leading customer support automation platform.",
      "how does it work":
        "We use AI-powered automation to enhance customer experience. Let us know if you'd like a demo!",
      goodbye: "Goodbye! Feel free to chat with me anytime.",
    };

    const defaultResponse =
      "I'm sorry, I didn't understand that. Could you rephrase?";
    const botText = responses[userInput.toLowerCase()] || defaultResponse;

    return { type: "bot", text: botText };
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="chatbot-toggle" onClick={toggleChat}>
          <img
            src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
            alt="circular-icon"
          />
        </div>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Charm Emporium</span>
            <button className="close-btn" onClick={closeChat}>
              X
            </button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-container ${
                  msg.type === "user" ? "user" : "bot"
                }`}
              >
                <div className={`message ${msg.type}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
