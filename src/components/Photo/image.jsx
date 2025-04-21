import React from "react";

// Import CSS
import "./index.css";

// import icon from material ui
import CloseIcon from "@mui/icons-material/Close";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

function image({ url, setChooseImage, setImageOpen }) {
  return (
    <div className="image-chat">
      <div className="show-image">
        <header>
          <CloseIcon
            className="close"
            onClick={() => {
              setChooseImage(null);
              setImageOpen(null);
            }}
            fontSize="large"
          />
        </header>
        <div className="view">
          <TransformWrapper
            doubleClick={{ disabled: true }}
            pinch={{ disabled: false }}
            wheel={{ step: 50 }}
            minScale={1}
            maxScale={4}
          >
            <TransformComponent>
              <img
                src={url}
                alt="Show Image"
                className="show-photo"
                style={{ touchAction: "none" }}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default image;
