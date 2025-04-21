import React, { useEffect, useRef, useState } from "react";

// import shapes
import CropSquareIcon from "@mui/icons-material/CropSquare";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import BrushIcon from "@mui/icons-material/Brush";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import CloseIcon from "@mui/icons-material/Close";
import "./draw.css";

function draw({ handleCloseDraw, setupDraw, setSetupDraw }) {
  let prevMouseX, prevMouseY, snapshot;
  let isDrawing = false;
  let selectedTool = "brush";
  const brushWidth = 5;
  let selectedColor = "#000";

  useEffect(() => {
    if (setupDraw) {
      console.log("hêlo");
      const canvas = document.querySelector("canvas"),
        toolBtns = document.querySelectorAll(".tool"),
        fillColor = document.querySelector("#fill-color"),
        sizeSlider = document.querySelector("#size-slider"),
        colorBtns = document.querySelectorAll(".colors .option"),
        colorPicker = document.querySelector("#color-picker"),
        clearCanvas = document.querySelector(".clear-canvas"),
        ctx = canvas.getContext("2d");

      window.addEventListener("load", () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      });

      const drawRect = (e) => {
        if (fillColor.checked) {
          return ctx.strokeRect(
            e.offsetX,
            e.offsetY,
            prevMouseX - e.offsetX,
            prevMouseY - e.offsetY
          );
        }
        ctx.fillRect(
          e.offsetX,
          e.offsetY,
          prevMouseX - e.offsetX,
          prevMouseY - e.offsetY
        );
      };

      const drawCircle = (e) => {
        ctx.beginPath();

        let radius = Math.sqrt(
          Math.pow(prevMouseX - e.offsetX, 2) +
            Math.pow(prevMouseY - e.offsetY, 2)
        );
        ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
        ctx.stroke();

        fillColor.checked ? ctx.fill() : ctx.stroke();
      };

      const drawTriangle = (e) => {
        ctx.beginPath();
        ctx.moveTo(prevMouseX, prevMouseY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
        ctx.closePath();
        fillColor.checked ? ctx.fill() : ctx.stroke();
      };

      const startDraw = () => {
        isDrawing = true;
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
        ctx.beginPath();
        ctx.lineWidth = brushWidth;
        ctx.strokeStyle = selectedColor;
        ctx.fillStyle = selectedColor;
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      };

      const drawing = (e) => {
        if (!isDrawing) return;
        ctx.putImageData(snapshot, 0, 0);

        if (selectedTool === "brush" || selectedTool === "eraser") {
          ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
        } else if (selectedTool === "rectangle") {
          drawRect(e);
        } else if (selectedTool === "circle") {
          drawCircle(e);
        } else if (selectedTool === "triangle") {
          drawTriangle(e);
        }
      };

      toolBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelector(".options .active").classList.remove("active");
          btn.classList.add("active");
          selectedTool = btn.id;
        });
      });

      // sizeSlider.addEventListener(
      //   "change",
      //   () => (brushWidth = sizeSlider.value)
      // );

      colorBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelector(".options .selected")
            .classList.remove("selected");
          btn.classList.add("selected");
          selectedColor = window
            .getComputedStyle(btn)
            .getPropertyValue("background-color");
        });
      });

      // colorPicker.addEventListener("change", () => {
      //   colorPicker.parentElement.style.background = colorPicker.value;
      //   colorPicker.parentElement.click();
      // });

      clearCanvas.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });

      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mousemove", drawing);
      canvas.addEventListener("mouseup", () => (isDrawing = false));
    }
  }, [setupDraw]);

  return (
    <div className="drawCanvas">
      <div className="container">
        <CloseIcon
          className="close-draw"
          onClick={handleCloseDraw}
          fontSize="medium"
        />
        <section className="tools-board">
          <div className="row">
            <label htmlFor="" className="title">
              Shapes
            </label>
            <ul className="options">
              <li className="option tool" id="rectangle">
                <CropSquareIcon fontSize="small" className="icon" />
                <span className="character">Rectangle</span>
              </li>
              <li className="option tool" id="circle">
                <PanoramaFishEyeIcon fontSize="small" className="icon" />
                <span className="character">Circle</span>
              </li>
              <li className="option tool" id="triangle">
                <ChangeHistoryIcon fontSize="small" className="icon" />
                <span className="character">Triangle</span>
              </li>
              <li className="option">
                <input type="checkbox" name="" id="fill-color" />
                <label htmlFor="fill-color" className="character">
                  Fill color
                </label>
              </li>
            </ul>
          </div>
          <div className="row">
            <label htmlFor="" className="title">
              Options
            </label>
            <ul className="options">
              <li className="option tool" id="brush">
                <BrushIcon fontSize="small" className="icon" />
                <span className="character">Brush</span>
              </li>
              <li className="option tool" id="eraser">
                <AutoFixHighIcon fontSize="small" className="icon" />
                <span className="character">Eraser</span>
              </li>
              <li className="option">
                <input
                  type="range"
                  min={"1"}
                  id="size-slider"
                  max={"30"}
                  value={brushWidth}
                  onChange={() => (brushWidth = sizeSlider.value)}
                />
              </li>
            </ul>
          </div>
          <div className="row colors">
            <label className="title">Colors</label>
            <ul className="options">
              <li className="option"></li>
              <li className="option"></li>
              <li className="option"></li>
              <li className="option"></li>
              <li className="option">
                <input
                  type="color"
                  id="color-picker"
                  value={selectedColor}
                  onChange={() => {
                    colorPicker.parentElement.style.background =
                      colorPicker.value;
                    colorPicker.parentElement.click();
                  }}
                />
              </li>
            </ul>
          </div>
          <div className="row buttons">
            <button className="clear-canvas">Clear Canvas</button>
            <button className="send">Send</button>
          </div>
        </section>
        <section className="drawing-board">
          <canvas></canvas>
        </section>
      </div>
    </div>
  );
}

export default draw;
