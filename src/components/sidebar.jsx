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

function Sidebar() {
  const [close, setClose] = useState(false);
  function handleClick() {
    setClose((prev) => !prev);
  }

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  });
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: !close ? "5vw" : "25vw",
          padding: 2,
          paddingRight: 0,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: !close ? "center" : "flex-start",
            gap: 4,
            marginBottom: 9,
            padding: 0,
            paddingTop: 1,
          }}
        >
          {close && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
              <AppsIcon sx={{ color: "#22B143" }} fontSize="large" />
              <Typography
                variant="span"
                sx={{ fontWeight: "bold", fontSize: "1.6rem" }}
              >
                Sagehood
              </Typography>
            </Box>
          )}
          <ExitToAppIcon
            fontSize="large"
            sx={{
              transform: !close ? "none" : "rotate(180deg)",
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
          <Button sx={{ backgroundColor: "#AEACAC" }}>
            <FilePresentIcon fontSize="large" sx={{ color: "black" }} />
            {close && (
              <Typography
                variant="span"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                Files
              </Typography>
            )}
          </Button>
          <Button
            color="secondary"
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
          <Button onClick={() => setLoading(true)} loading={loading}>
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
