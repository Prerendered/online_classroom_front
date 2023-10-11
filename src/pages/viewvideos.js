// This just calls the videoplayer.js file
// Does most of the rendering, but videoplayer.js and subject-title.js are the ones to check

import React from "react";
import "../App.css";
import "../components/navbar.js";
import "../components/navbar.css";
import "./subject-title.css";
import Navbar from "../components/navbar.js";
import Video from "./videoplayer.js";
import Subtitle from "./subject-title.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
  },
});

const viewVideos = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <div className="app">
          <Subtitle />
          <Video />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default viewVideos;
