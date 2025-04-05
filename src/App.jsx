import React, { useState } from "react";

// other import
import Sidebar from "./components/Sidebar/sidebar";
import Main from "./components/Content/maincontent";

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#D7D5D5",
          display: "flex",
          maxHeight: "100%",
          overflowY: "hidden",
        }}
      >
        <Sidebar setChatHistory={setChatHistory} />
        <Main chatHistory={chatHistory} />
      </div>
    </>
  );
}

export default App;
