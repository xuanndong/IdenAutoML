import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import "./scoring.css";

function scoring({ handleCloseScoring, handleCloseMenu }) {
  // event display file name
  const [importLabel, setImportLabel] = useState(null);
  // Handle get image
  const importRef = useRef();

  // chuyển url về image state để gọi api
  // gửi ảnh lên khung chat
  const handleImportChange = (e) => {
    e.preventDefault();
 
    const selectedImport = e.target.files[0];

    if (!selectedImport) {
      setImportLabel(null);
      return;
    }

    const url = URL.createObjectURL(selectedImport);
    setImportLabel(url);

    // const formData = new FormData();
    // formData.append("image", selectedImport);
    // uploadImage(url, formData);
    // setInitScreen(true);

    // reset input
    e.target.value = null;
  };

  const handleReset = () => {
    setImportLabel(null);
  };

  // processing input
  const [processInput, setProcessInput] = useState(false);

  return (
    <div className="exam">
      <CloseIcon
        className="close-draw"
        onClick={() => {
          handleCloseMenu(), handleCloseScoring();
        }}
        fontSize="medium"
      />
      <div className="sub-exam">
        <div className="exam-container">
          <input
            ref={importRef}
            type="file"
            accept="image/*"
            id="label"
            onChange={handleImportChange}
          />
          <label htmlFor="label">
            <div className="output-label">Import</div>
          </label>
        </div>
        <KeyboardDoubleArrowRightIcon
          style={{ display: importLabel ? "flex" : "none" }}
        />
        <div
          className="import-file"
          style={{ display: importLabel ? "flex" : "none" }}
        >
          {importLabel}
        </div>
        <button
          className="reset"
          type="reset"
          style={{ display: importLabel ? "flex" : "none" }}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="paper">
        <div
          className="input-paper"
          onClick={() => setProcessInput(true)}
          style={{ width: processInput ? "100%" : "47.5%" }}
        ></div>
        <TrendingFlatIcon style={{ display: processInput ? "flex" : "none" }} />
        <div
          className="output-paper"
          style={{ display: processInput ? "flex" : "none" }}
        ></div>
      </div>
    </div>
  );
}

export default scoring;
