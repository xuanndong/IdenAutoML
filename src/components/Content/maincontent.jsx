import React from "react";

// other import
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chat from "./../Chat/chat";

// import icon from svg
import ArOnIcon from "./../../assets/ar_on_you";
import ArStickIcon from "./../../assets/ar_stickers";
import EyeTrackIcon from "./../../assets/eye_tracking";

// import css
import "./maincontent.css";

function Main({ chatHistory }) {
  return (
    <>
      <Paper
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#ffffff",
          margin: 1.5,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          paddingTop: 6,
          alignItems: "center",
        }}
      >
        <Box>
          <p className="cursor typewriter-animation">Have you a good day! 😊</p>
          <br />
          <p className="text cursor typewriter-animation">
            How can I help you today?
          </p>

          {/*Features*/}
          <div
            className="slide-up"
            style={{
              visibility: "hidden",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <Box
              sx={{
                height: "183px",
                width: "249px",
                backgroundColor: "#4698B3",
                borderRadius: "10px",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  height: "3rem",
                  width: "3rem",
                  background: "#FFFFFF",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ArOnIcon />
              </Box>
              <Typography variant="h6" sx={{ marginTop: 6 }}>
                Feature 1
              </Typography>
            </Box>
            <Box
              sx={{
                height: "183px",
                width: "249px",
                backgroundColor: "#B73ED2",
                borderRadius: "10px",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  height: "3rem",
                  width: "3rem",
                  background: "#FFFFFF",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ArStickIcon />
              </Box>
              <Typography variant="h6" sx={{ marginTop: 6 }}>
                Feature 2
              </Typography>
            </Box>
            <Box
              sx={{
                height: "183px",
                width: "249px",
                backgroundColor: "#F65F3D",
                borderRadius: "10px",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  height: "3rem",
                  width: "3rem",
                  background: "#FFFFFF",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EyeTrackIcon />
              </Box>
              <Typography variant="h6" sx={{ marginTop: 6 }}>
                Feature 3
              </Typography>
            </Box>
          </div>
          {/*Features*/}
        </Box>
        <Chat chatHistory={chatHistory} />
      </Paper>
    </>
  );
}

export default Main;
