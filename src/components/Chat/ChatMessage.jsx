import React from "react";
import ChatbotIcon from "./../../assets/chatbot";

const ChatMessage = ({ chat, setImageOpen, setChooseImage, downloadFile }) => {
  const isImageUrl = (url) => {
    return (
      url &&
      (url.endsWith(".jpg") ||
        url.endsWith(".jpeg") ||
        url.endsWith(".png") ||
        url.endsWith(".gif") ||
        url.startsWith("data:image/jpeg;base64,/") ||
        url.startsWith("data:image/png;base64,") ||
        url.startsWith("blob:"))
    );
  };

  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className="message-text group"
        >
          {content.slice(0, 3).map((url, index) =>
            isImageUrl(url) ? (
              <img
                key={index}
                src={url}
                alt={`Chat Image ${index + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  margin: "3px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setImageOpen(true);
                  setChooseImage(url);
                }}
              />
            ) : (
              <p key={index}> {url} </p>
            )
          )}
          {content.length > 3 && <span>...</span>}
        </div>
      );
    } else if (isImageUrl(content)) {
      return (
        <img
          src={content}
          alt="Chat Image"
          className="message-text"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            margin: "3px",
            borderRadius: "12px",
            borderEndEndRadius: "0px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            setImageOpen(true);
            setChooseImage(content);
          }}
        />
      );
    } else {
      return (
        <>
          <p className="message-text">{content}</p>
          {content && downloadFile && content.trim() !== "" && (
            <button onClick={downloadContent} style={{ backgroundColor: "transparent", border: "none" }}>
              <img className="downloadIcon" src="src/assets/download.png" alt="" />
            </button>
          )}
        </>
      );
    }
  };

  const downloadContent = () => {
    if (!chat.text) return;

    const element = document.createElement("a");
    const file = new Blob([chat.text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `result.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
 
  return (
    <div
      className={`message ${chat.role === "model" ? "bot" : "user"}-message`}
    >
      {chat.role === "model" && <ChatbotIcon />}
      {renderContent(chat.text)}
    </div>
  );
};

export default ChatMessage;
