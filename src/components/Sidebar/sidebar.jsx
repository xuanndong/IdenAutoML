import React, { useEffect, useRef, useState } from "react";

// import icon
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AppsIcon from "@mui/icons-material/Apps";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ImageIcon from "@mui/icons-material/Image";
import BrushIcon from "@mui/icons-material/Brush";

// import JS and CSS
import "./sidebar.css";

function Sidebar({
  setCameraOpen,
  setPhoto,
  setImage,
  setImages,
  setDone,
  uploadImage,
  setInitScreen,
  setDrawOpen,
  handleCloseMenu,
  hover,
  setHover,
}) {
  // Handle events

  // Handle open/close sidebar
  const handleToggle = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("close");
  };

  // Handle Mode Switch
  const handleModeSwitch = () => {
    const body = document.querySelector("body");
    const modeText = document.querySelector(".mode-text");

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      modeText.textContent = "Light Mode";
    } else {
      modeText.textContent = "Dark Mode";
    }
  };

  // Handle get image
  const imageRef = useRef();

  // chuyển url về image state để gọi api
  // gửi ảnh lên khung chat
  const handleImageChange = (e) => {
    e.preventDefault();

    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      setImage(null);
      return;
    }

    const url = URL.createObjectURL(selectedImage);
    setImage(url);

    const formData = new FormData();
    formData.append("image", selectedImage);
    uploadImage(url, formData);
    setInitScreen(true);

    // reset input
    e.target.value = null;
  };

  // Handle get multi images
  const imagesRef = useRef();

  const handleImagesChange = (e) => {
    e.preventDefault();

    const selectedImages = Array.from(e.target.files);
    if (!selectedImages || selectedImages.length === 0) {
      setImages([]);
      return;
    }

    setImages(selectedImages);

    const imageUrls = selectedImages.map((image) => URL.createObjectURL(image));

    const formData = new FormData();
    selectedImages.map((image) => {
      formData.append("images", image);
    });

    uploadImage(imageUrls, formData);
    setInitScreen(true);

    // reset input
    e.target.value = null;
  };

  return (
    <>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <AppsIcon
              className="image"
              sx={{ color: "#22B143" }}
              fontSize="large"
              onClick={() => setHover(true)}
            />

            <div className="text header-text">
              <span className="name">Sagehood</span>
            </div>
          </div>
          <KeyboardArrowRightIcon className="toggle" onClick={handleToggle} />
        </header>

        <div className="menu-bar">
          <div className={`menu ${hover ? "active" : ""}`}>
            <ul className="menu-links">
              {/*========Draw========*/}
              <div>
                <li className="nav-link">
                  <div
                    className="in"
                    onClick={() => {
                      setDrawOpen(true);
                    }}
                  >
                    <BrushIcon className="icon" />
                    <span className="text nav-text">Draw</span>
                  </div>
                </li>
              </div>
              {/*========Image========*/}
              <div>
                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  id="imageInput"
                  onChange={handleImageChange}
                  onClick={handleCloseMenu}
                />
                <label htmlFor="imageInput">
                  <li className="nav-link">
                    <div className="in">
                      <ImageIcon className="icon" />
                      <span className="text nav-text">Image</span>
                    </div>
                  </li>
                </label>
              </div>
              {/*========Images========*/}
              <div>
                <input
                  ref={imagesRef}
                  type="file"
                  accept="image/*"
                  id="imagesInput"
                  multiple
                  onChange={handleImagesChange}
                  onClick={handleCloseMenu}
                />
                <label htmlFor="imagesInput">
                  <li className="nav-link">
                    <div className="in">
                      <PhotoLibraryIcon className="icon" />
                      <span className="text nav-text">Images</span>
                    </div>
                  </li>
                </label>
              </div>
              {/*========Camera========*/}
              <div>
                <li className="nav-link">
                  <div
                    className="in last"
                    onClick={() => {
                      setCameraOpen(true);
                      setPhoto(false);
                      setDone(false);
                      handleCloseMenu();
                    }}
                  >
                    <PhotoCameraIcon className="icon" />
                    <span className="text nav-text">Camera</span>
                  </div>
                </li>
              </div>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="mode">
              <div className="moon-sun">
                <DarkModeIcon className="icon moon" />
                <LightModeIcon className="icon sun" />
              </div>
              <span className="mode-text text">Dark Mode</span>
              <div className="toggle-switch" onClick={handleModeSwitch}>
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
