import React from "react";

// Import CSS
import "./index.css";

// import icon from material ui
import CloseIcon from "@mui/icons-material/Close";

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
          <img src={url} alt="Show Image" className="show-photo" />
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default image;
