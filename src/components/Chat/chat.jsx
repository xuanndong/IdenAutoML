import React, { useState } from "react";
import ChatbotIcon from "./../../assets/chatbot";
import "./index.css";

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  return (
    <>
      <div className="chat-body">
        <div className="message bot-message">
          <ChatbotIcon />
          <p className="message-text">
            Hey there <br /> How can I help you?
          </p>
        </div>
        <div className="message user-message">
          <p className="message-text">LOOoo</p>
        </div>
      </div>
    </>
  );
}

export default Chat;
