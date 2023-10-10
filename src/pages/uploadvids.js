import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  styled,
  Typography,
  TextField,
} from "@mui/material";

import "../App.css";
import Navbar from "../components/navbar.js";
import UploadArea from "../components/upload_area.js";

const UploadVideos = () => {
  return (
    <div>
      <Navbar />
      <UploadArea />
    </div>
  );
};

export default UploadVideos;
