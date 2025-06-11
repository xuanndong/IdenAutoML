import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as fabric from "fabric";
import "./paint.css";

function paint({ handleCloseDraw, handleCloseMenu }) {
  const canvasRef = useRef(null);
  const drawRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const initCanvas = () => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
      backgroundColor: "#fff",
      isDrawingMode: true,
    });

    fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.color = "#000000";
    if (drawRef.current.clientWidth <= 400) {
      fabricCanvas.freeDrawingBrush.width = 2;
    } else {
      fabricCanvas.freeDrawingBrush.width = 4;
    }
    fabricCanvas.renderAll();
    return fabricCanvas;
  };

  useEffect(() => {
    const fabricCanvas = initCanvas();
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  function dataURLToBlob(dataURL) {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  async function sendToServer() {
    if (!canvas || isProcessing) return;

    setIsProcessing(true);
    const dataURL = canvas.toDataURL("image/png");
    document.querySelector(".canvas-container").style.display = "none";
    const blob = dataURLToBlob(dataURL);

    const formData = new FormData();
    formData.append("image", blob, "drawing.png");

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/get_response_2`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Processing result:", result.response);
      console.log("Processing result:", result.image);


      // Giả sử server trả về base64 image trong trường 'processed_image'
      if (result.response) {
        // setProcessedImage(result.response);
        setProcessedImage(`data:image/png;base64,${result.image}`)
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  const handleClear = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = "#fff";
      canvas.isDrawingMode = true
      canvas.renderAll();
      setProcessedImage(null); // Reset processed image khi clear canvas
    }
  };

  const handleBackToCanvas = () => {
    setProcessedImage(null); // Quay lại canvas để chỉnh sửa
    if (!canvas) {
      const fabricCanvas = initCanvas();
      setCanvas(fabricCanvas);
    }else {
      // Reset che do ve
      canvas.isDrawingMode = true
      canvas.renderAll()
    }
  };

  return (
    <div ref={drawRef} className="drawCanvas">
      <CloseIcon
        className="close-draw"
        onClick={() => {
          handleCloseMenu(), handleCloseDraw();
        }}
        fontSize="medium"
      />
      <div className="container">
        <button onClick={handleClear}>Clear canvas</button>
        {!processedImage ? (
          <button
            className="send"
            onClick={sendToServer}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Send"}
          </button>
        ) : (
          <button className="back" onClick={handleBackToCanvas}>
            Back to Edit
          </button>
        )}
      </div>

      <div className="corner">
        <canvas ref={canvasRef} style={{ display: processedImage ? "none" : "block" }}></canvas>
        {processedImage && (
          <div className="result-container">
            {/* <div >{processedImage}</div> */}
            <img src={processedImage} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default paint;
