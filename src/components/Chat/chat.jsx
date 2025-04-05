import React, { useState } from "react";
import ChatbotIcon from "./../../assets/chatbot";
import "./index.css";
import ChatMessage from "./ChatMessage";

function Chat({ chatHistory }) {
  return (
    <>
      <div className="chat-body">
        <div className="message bot-message">
          <ChatbotIcon />
          <p className="message-text">
            Hey there <br /> How can I help you?
          </p>
        </div>
        {/* Render the chat history dynamically */}
        {chatHistory.map((chat, index) => {
          <ChatMessage key={index} chat={chat} />;
        })}
      </div>
    </>
  );
}

export default Chat;
