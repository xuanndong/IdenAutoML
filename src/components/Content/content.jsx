import React, { useEffect, useRef } from "react";

// other import
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chat from "../Chat/chat";

// import icon from svg
import ArOnIcon from "../../assets/ar_on_you";
import ArStickIcon from "../../assets/ar_stickers";
import EyeTrackIcon from "../../assets/eye_tracking";

// import css
import "./maincontent.css";

function Main({
  chatBodyRef,
  chatHistory,
  setImageOpen,
  setChooseImage,
  initScreen,
}) {
  return (
    <>
      <section className="home">
        <div className="main" style={{ display: initScreen ? "none" : "flex" }}>
          <p className="cursor typewriter-animation">Have you a good day! 😊</p>
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
                padding: "24px 34px",
                backgroundColor: "#4698B3",
                borderRadius: "10px",
                padding: 2,
              }}
              className="box"
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
                className="subbox"
              >
                <ArOnIcon />
              </Box>
              <Typography variant="h6" className="text" sx={{ marginTop: 4 }}>
                Đơn ảnh
              </Typography>
            </Box>
            <Box
              sx={{
                height: "183px",
                width: "249px",
                padding: "25px 34px",
                backgroundColor: "#B73ED2",
                borderRadius: "10px",
                padding: 2,
              }}
              className="box"
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
                className="subbox"
              >
                <ArStickIcon />
              </Box>
              <Typography variant="h6" className="text" sx={{ marginTop: 4 }}>
                Đa ảnh
              </Typography>
            </Box>
            <Box
              sx={{
                height: "183px",
                width: "249px",
                padding: "25px 34px",
                backgroundColor: "#F65F3D",
                borderRadius: "10px",
                padding: 2,
              }}
              className="box"
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
                className="subbox"
              >
                <EyeTrackIcon />
              </Box>
              <Typography variant="h6" className="text" sx={{ marginTop: 4 }}>
                Camera
              </Typography>
            </Box>
          </div>
          {/*Features*/}
        </div>
        <Chat
          chatBodyRef={chatBodyRef}
          chatHistory={chatHistory}
          setImageOpen={setImageOpen}
          setChooseImage={setChooseImage}
        />
      </section>
    </>
  );
}

export default Main;
