import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// import icon
import AppsIcon from "@mui/icons-material/Apps";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ImageIcon from "@mui/icons-material/Image";

import "./sidebar.css";

function Sidebar({ setChatHistory }) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Update chat history with the user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Adding a "Thinking..." placeholder for the bot's response
    setTimeout(
      () =>
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Thinking..." },
        ]),
      600
    );
  };

  // close sidebar
  const [close, setClose] = useState(true);
  function handleClick() {
    setClose((prev) => !prev);
  }

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timeout);
  });
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: !close ? "4vw" : "24vw",
          padding: !close ? 1.5 : 2,
          paddingRight: 0,
          transition: "width 0.3s ease-in-out",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: !close ? "center" : "flex-start",
            gap: 4,
            marginBottom: 9,
            padding: 0,
            paddingTop: 1,
          }}
        >
          {close && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
              }}
            >
              <AppsIcon sx={{ color: "#22B143" }} fontSize="large" />
              <Typography
                className="logo"
                variant="span"
                sx={{ fontWeight: "bold", fontSize: "1.6rem" }}
              >
                Sagehood
              </Typography>
            </Box>
          )}
          <ExitToAppIcon
            fontSize="large"
            className={`icon-rotate ${close ? "active" : ""}`}
            sx={{
              transition: "transform 0.5s ease",
              cursor: "pointer",
            }}
            onClick={handleClick}
          />
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: !close ? "flex" : undefined,
            flexWrap: !close ? "wrap" : undefined,
            justifyContent: !close ? "center" : undefined,
            alignItems: !close ? "center" : undefined,
          }}
        >
          <Button
            className="btn-style701"
            sx={{
              minWidth: !close ? "3.9vw" : undefined,
              gap: !close ? 0 : undefined,
              justifyContent: !close ? "center" : undefined,
              marginLeft: !close ? "0" : undefined,
            }}
            onClick={() => setLoading(true)}
            loading={loading}
          >
            <FilePresentIcon fontSize="large" sx={{ color: "black" }} />
            {close && (
              <Typography
                variant="span"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  color: "#000000",
                  transform: "0.5s",
                }}
              >
                Files
              </Typography>
            )}
          </Button>
          <Button
            className="btn-style701"
            sx={{
              minWidth: !close ? "3.9vw" : undefined,
              gap: !close ? 0 : undefined,
              justifyContent: !close ? "center" : undefined,
              marginLeft: !close ? "0" : undefined,
            }}
            onClick={() => setLoading(true)}
            loading={loading}
          >
            <ImageIcon fontSize="large" sx={{ color: "black" }} />

            {close && (
              <Typography
                variant="span"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                Images
              </Typography>
            )}
          </Button>
          <Button
            className="btn-style701"
            sx={{
              minWidth: !close ? "3.9vw" : undefined,
              gap: !close ? 0 : undefined,
              justifyContent: !close ? "center" : undefined,
              marginLeft: !close ? "0" : undefined,
            }}
            onClick={() => setLoading(true)}
            loading={loading}
          >
            <PhotoCameraIcon fontSize="large" sx={{ color: "black" }} />
            {close && (
              <Typography
                variant="span"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                Camera
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
