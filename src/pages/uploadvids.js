import React from "react";

import "../App.css";
import Navbar from "../components/navbar.js";
import UploadArea from "../components/upload_area.js";

const UploadVideos = () => {
  return (
    <div>
      <Navbar />
      <div style={ { paddingTop: "80px" } } >
        <UploadArea />
      </div>
    </div>
  );
};

export default UploadVideos;
