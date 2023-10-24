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
    background: "#FFF2D8",
  },
});

const viewVideos = () => {
  return (
      <div className={"App"}> {/* this is the background color */}
        <ThemeProvider theme={theme}>
          <div>
            <Navbar />
            <div className="App" style={ { paddingTop: "80px" } }>
              <Subtitle />
              <Video />
            </div>
          </div>
        </ThemeProvider>
      </div>
  );
};

export default viewVideos;
