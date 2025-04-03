import React from "react";

// other import
import Sidebar from "./components/sidebar";
import Main from "./components/maincontent";

function App() {
  return (
    <>
      <div style={{ backgroundColor: "#D7D5D5", display: "flex" }}>
        <Sidebar />
        <Main />
      </div>
    </>
  );
}

export default App;
