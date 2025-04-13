import React, { useRef, useState } from "react";

// import icon from material ui
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DoneIcon from "@mui/icons-material/Done";

// import css
import "./camera.css";

function camera({
  handleCloseCamera,
  videoRef,
  capturePhoto,
  setPhoto,
  photo,
  canvasRef,
  camera,
  stopCamera,
  startCamera,
  setDone,
  uploadImage,
  setInitScreen,
}) {
  // Handle change camera (facing mode)
  const changeRef = useRef(null);

  const changeCamera = () => {
    const isActive = changeRef.current?.classList.toggle("activate");

    // Chọn camera dựa trên trạng thái 'isActive'
    const cameraType = isActive ? "user" : "environment";

    // Bắt đầu camera với loại đã chọn
    stopCamera();
    startCamera(cameraType);
  };

  return (
    <div className="wrapper">
      <div className="camera">
        <header>
          <CloseIcon
            className="close"
            onClick={() => {
              if (photo) {
                startCamera("environment");
                setPhoto(false);
              } else {
                handleCloseCamera();
              }
            }}
            fontSize="large"
          />

          <DoneIcon
            sx={{ marginRight: 6, display: photo ? "flex" : "none" }}
            className="done icon"
            onClick={() => {
              handleCloseCamera();
              setDone(true);
              uploadImage(camera);
              setInitScreen(true);
            }}
          />

          <RestartAltIcon
            className="restart icon"
            ref={changeRef}
            onClick={() => {
              changeCamera();
            }}
            sx={{ display: !photo ? "flex" : "none" }}
          />
        </header>
        <div className="photo">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="video"
            style={{ display: !photo ? "flex" : "none" }}
          ></video>
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <img
            src={camera}
            alt="Captured"
            className="captured-photo"
            style={{ display: photo ? "flex" : "none" }}
          />
        </div>
        <footer>
          <button
            onClick={() => {
              capturePhoto();
              stopCamera();
              setPhoto(true);
            }}
            className="take"
            style={{ display: !photo ? "flex" : "none" }}
          ></button>
        </footer>
      </div>
    </div>
  );
}

export default camera;
