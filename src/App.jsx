import React, { useEffect, useReducer, useRef, useState } from "react";

// other import
import Sidebar from "./components/Sidebar/sidebar";
import Main from "./components/Content/content";
import Camera from "./components/Camera/camera";
import Image from "./components/Photo/image";
import Begin from "./components/Begin/begin";
import Draw from "./components/Content/paint";
import Scoring from "./components/Exam Marking/scoring";

// import css
import "./App.css";

function App() {
  // Handles get data
  const [image, setImage] = useState(null); // state of image
  const [images, setImages] = useState([]); // state of imagea
  const [camera, setCamera] = useState(null); // state of camera
  const [initScreen, setInitScreen] = useState(false); // state of show initation screen

  // handle write character
  const [drawOpen, setDrawOpen] = useState(false);
  const handleCloseDraw = () => {
    setDrawOpen(false);
  };

  // handle exam marking
  const [scoringOpen, setScoringOpen] = useState(false);
  const handleCloseScoring = () => {
    setScoringOpen(false);
  };

  // Handles take photo

  const [cameraOpen, setCameraOpen] = useState(false); // camera có active hay không
  const [photo, setPhoto] = useState(false); // xác nhận đã chụp ảnh -> điều chỉnh lại giao diện
  const [done, setDone] = useState(false); // xác nhận lấy ảnh đã chụp

  const [imageOpen, setImageOpen] = useState(false); // hiển thị ảnh khi chon ảnh trong khung chat
  const [chooseImage, setChooseImage] = useState(null); // chọn ảnh để phóng to

  const startCamera = async (mode) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });
      videoRef.current.srcObject = stream;
      setCameraOpen(true);
    } catch (err) {
      console.error("Error accessing the camera", err);
      alert("Error accessing the camera: " + err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null; // Giải phóng nguồn video
    }
  };

  const handleCloseCamera = () => {
    stopCamera(); // Dừng camera
    setCameraOpen(false); // Đóng giao diện camera
  };

  // Draw photo and display video
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const chatBodyRef = useRef();

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL("image/jpeg");
    setCamera(imageDataUrl);
  };

  // Handle display image
  const [chatHistory, setChatHistory] = useState([]);
  const [downloadFile, setDownloadFile] = useState(false)

  const uploadImage = (imgUrl, formData) => {
    setChatHistory((history) => [...history, { role: "user", text: imgUrl }]);

    // Adding a "Thinking..." placeholder for the bot's response
    setTimeout(
      () =>
        setChatHistory((history) => [
          ...history,
          {
            role: "model",
            text: `Processing...`,
          },
        ]),
      600
    );
    generateRespone(formData);
  };

  // ngrok http --url=legible-engaged-bluebird.ngrok-free.app 80

  // Helper function to update chat history
  const updateHistory = (text, imageResponse, isError = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Processing..."),
      { role: "model", text, isError },
    ]);
  };

  // state close menu in screen (witdth: 400px)
  const [hover, setHover] = useState(false);
  const handleCloseMenu = () => {
    if (hover) {
      setHover(false);
    }
  };

  // Get API
  const generateRespone = async (formdata) => {
    // Format chat history for API request
    // history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    setDownloadFile(false)

    const requestOptions = {
      method: "POST",
      body: formdata
    };

    try {
      const respone = await fetch(import.meta.env.VITE_API_URL + `/get_response`, requestOptions);
      const data = await respone.json();
      if (!respone.ok)
        throw new Error(data.error.message || "Something went wrong");

      const apiRespone = data.response; // get data from server
      const imageResponse = `data:image/png;base64,${data.image}`;
      updateHistory(apiRespone, imageResponse);
      setDownloadFile(true);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    if (cameraOpen) {
      startCamera("environment");
    }
    // Dọn dẹp stream khi component unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [cameraOpen]); // Chạy khi cameraOpen thay đổi

  // --------------------------- //

  useEffect(() => {
    // Auto scroll whenever chat history update
    if (!loading && chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Đặt loading thành false sau 6000ms
    }, 3000);

    return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
  }, []);

  return (
    <>
      {loading ? (
        <Begin />
      ) : (
        <>
          <Sidebar
            setCameraOpen={setCameraOpen}
            setPhoto={setPhoto}
            setImage={setImage}
            setImages={setImages}
            setCamera={setCamera}
            setDone={setDone}
            uploadImage={uploadImage}
            setInitScreen={setInitScreen}
            setDrawOpen={setDrawOpen}
            setScoringOpen={setScoringOpen}
            handleCloseMenu={handleCloseMenu}
            hover={hover}
            setHover={setHover}
          />
          <Main
            chatBodyRef={chatBodyRef}
            chatHistory={chatHistory}
            setImageOpen={setImageOpen}
            setChooseImage={setChooseImage}
            initScreen={initScreen}
            handleCloseMenu={handleCloseMenu}
            downloadFile={downloadFile}
          />
          {cameraOpen && (
            <Camera
              handleCloseCamera={handleCloseCamera}
              videoRef={videoRef}
              capturePhoto={capturePhoto}
              setPhoto={setPhoto}
              photo={photo}
              canvasRef={canvasRef}
              camera={camera}
              stopCamera={stopCamera}
              startCamera={startCamera}
              setDone={setDone}
              uploadImage={uploadImage}
              setInitScreen={setInitScreen}
            />
          )}
          {imageOpen && chooseImage && (
            <Image
              url={chooseImage}
              setChooseImage={setChooseImage}
              setImageOpen={setImageOpen}
            />
          )}
          {drawOpen && (
            <Draw
              handleCloseDraw={handleCloseDraw}
              handleCloseMenu={handleCloseMenu}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;





