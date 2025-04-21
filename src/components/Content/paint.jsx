import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as fabric from "fabric";
import "./paint.css";

function paint({ handleCloseDraw }) {
  const canvasRef = useRef(null);
  const drawRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
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
    const blob = dataURLToBlob(dataURL);

    const formData = new FormData();
    formData.append("image", blob, "drawing.png");

    try {
      const response = await fetch("/api/process-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Processing result:", result);

      // Giả sử server trả về base64 image trong trường 'processed_image'
      if (result.processed_image) {
        setProcessedImage(result.processed_image);
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
      canvas.renderAll();
      setProcessedImage(null); // Reset processed image khi clear canvas
    }
  };

  const handleBackToCanvas = () => {
    setProcessedImage(null); // Quay lại canvas để chỉnh sửa
  };

  return (
    <div ref={drawRef} className="drawCanvas">
      <CloseIcon
        className="close-draw"
        onClick={handleCloseDraw}
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

      {processedImage ? (
        <div className="result-container">
          <img
            src={processedImage}
            alt="Processed result"
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              border: "1px solid #ccc",
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>
      ) : (
        <canvas ref={canvasRef}></canvas>
      )}
    </div>
  );
}

export default paint;
