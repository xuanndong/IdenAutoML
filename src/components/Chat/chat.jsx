import React from "react";
import ChatbotIcon from "./../../assets/chatbot";
import "./index.css";
import ChatMessage from "./ChatMessage";

function Chat({ chatBodyRef, chatHistory, setImageOpen, setChooseImage, downloadFile }) {
  // console.log(chatHistory);
  return (
    <>
      <div ref={chatBodyRef} className="chat-body">
        {/* Render the chat history dynamically */}
        {chatHistory.map((chat, index) => (
          <ChatMessage
            key={index}
            chat={chat}
            setImageOpen={setImageOpen}
            setChooseImage={setChooseImage}
            downloadFile={downloadFile}
          />
        ))}
      </div>
    </>
  );
}

export default Chat; 
