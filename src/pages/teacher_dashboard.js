import React, { useRef } from "react"; // Import useRef
import Navbar from "../components/navbar.js";
import TeacherSubjectTiles from "../components/TeacherSubjectTiles";
import TeacherCalendar from "../components/teacherCalendar";
import QuoteOfTheDay from "../components/quote";
import ProgressTable from "../components/progressTable";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button"; // Import Button

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
  },
});

function FullScreenWelcome({ onButtonClick, onViewProgressClick }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column", // Maintain the column layout for the parent div
        backgroundImage:
          'url("https://images.unsplash.com/photo-1533709475520-a0745bba78bf?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h3" component="h1" sx={{ color: "#FFFFFF" }}>
        Welcome
      </Typography>
      <Typography variant="h1" component="h1" sx={{ color: "#FFFFFF" }}>
        Online Classroom
      </Typography>
      <div style={{ flexDirection: "row", display: "flex", marginTop: "20px" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onButtonClick}
          style={{
            marginRight: "10px", // Adjust marginRight to create a gap between buttons
            borderRadius: "0",
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
          }}
        >
          Go to your courses
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={onViewProgressClick}
          style={{
            borderRadius: "0",
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
          }}
        >
          View your progress
        </Button>
      </div>
    </div>
  );
}

function teacherdashboard() {
  const dashboardRef = useRef(null); // Create a reference
  const progressRef = useRef(null);

  const handleButtonClick = () => {
    dashboardRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the reference
  };

  const handleViewProgressClick = () => {
    progressRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to ProgressTable section
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="App">
        <FullScreenWelcome
          onButtonClick={handleButtonClick}
          onViewProgressClick={handleViewProgressClick}
        />
        <div ref={dashboardRef} style={{ height: "100vh" }}>
          {/* Set the reference here */}
          <Grid
            container
            style={{ height: "100%", padding: "0 10%" }}
            justifyContent="center"
            alignItems="center"
          >
            <TeacherSubjectTiles />
          </Grid>
        </div>
        {/* ProgressTable Grid item */}
        <div ref={progressRef} style={{ width: "100%", padding: "0 10%" }}>
          <Grid
            container
            spacing={10}
            direction="row"
            style={{ width: "100%" }}
          >
            <Grid item xs={12}>
              <ProgressTable />
            </Grid>
          </Grid>
        </div>
        {/* Existing Grid container */}
        <div style={{ height: "100vh", padding: "10%" }}>
          <Grid
            container
            spacing={10}
            direction="row"
            style={{ height: "100%" }}
          >
            <Grid item xs={12} md={6}>
              <TeacherCalendar />
            </Grid>
            <Grid item xs={12} md={6}>
              <QuoteOfTheDay />
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default teacherdashboard;
