import React, { useEffect, useReducer, useRef, useState } from "react";

// other import
import Sidebar from "./components/Sidebar/sidebar";
import Main from "./components/Content/content";
import Camera from "./components/Camera/camera";
import Image from "./components/Photo/image";
import Begin from "./components/Begin/begin";

// import css
import "./App.css";

function App() {
  // Handles get data
  const [image, setImage] = useState(null); // state of image
  const [images, setImages] = useState([]); // state of imagea
  const [camera, setCamera] = useState(null); // state of camera
  const [initScreen, setInitScreen] = useState(false); // state of show initation screen
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

  const uploadImage = (url) => {
    setChatHistory((history) => [...history, { role: "user", text: url }]);

    // Adding a "Thinking..." placeholder for the bot's response
    setTimeout(
      () =>
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Thinking..." },
        ]),
      600
    );
    // để generateRespone
  };

  // Helper function to update chat history
  const updateHistory = (text, isError = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking..."),
      { role: "model", text, isError },
    ]);
  };

  // Get API
  const generateRespone = async (history) => {
    // Format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const respone = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await respone.json();
      if (!respone.ok)
        throw new Error(data.error.message || "Something went wrong");

      const apiRespone = 0; // get data from server
      updateHistory(apiRespone);
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

  // // reducer for image feature
  // const initialState = { data: null, loading: false, error: null };

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case "FETCH_INIT":
  //       return { ...state, loading: true, error: null };
  //     case "FETCH_SUCCESS":
  //       return { ...state, loading: false, data: action.payload };
  //     case "FETCH_FAILURE":
  //       return { ...state, loading: false, error: action.payload };
  //     default:
  //       throw new Error(`Unknown action: ${action.type}`);
  //   }
  // }

  // const [state, dispatch] = useReducer(reducer, initialState);
  // const fetchData = async () => {
  //   dispatch({ type: "FETCH_INIT" });
  //   try {
  //     const response = await fetch("https://api.example.com/data");
  //     const data = await response.json();
  //     dispatch({ type: "FETCH_SUCCESS", payload: data });
  //   } catch (error) {
  //     dispatch({ type: "FETCH_FAILURE", payload: error.message });
  //   }
  // };

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
    }, 6000);

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
          />
          <Main
            chatBodyRef={chatBodyRef}
            chatHistory={chatHistory}
            setImageOpen={setImageOpen}
            setChooseImage={setChooseImage}
            initScreen={initScreen}
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
        </>
      )}
    </>
  );
}

export default App;
