import React from "react";

// other import
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chat from "./Chat/chat";

// import icon from svg
import ArOnIcon from "./../assets/ar_on_you";
import ArStickIcon from "./../assets/ar_stickers";
import EyeTrackIcon from "./../assets/eye_tracking";

function Main() {
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
        <Box sx={{}}>
          <Typography variant="h6" sx={{ fontSize: 32, fontWeight: "bold" }}>
            Have you a good day! 😊
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 6,
              fontSize: 32,
              fontWeight: "bold",
              color: "#8A8787",
            }}
          >
            How can I help you today?
          </Typography>

          {/*Features*/}
          <div
            style={{
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
        </Box>
        <Chat />
      </Paper>
    </>
  );
}

export default Main;
