import React, { useRef } from "react"; // Import useRef
import Navbar from "../components/navbar.js";
import SubjectsTable from "../components/teacherSubjectTable.js";
import TeacherCalendar from "../components/teacherCalendar";
import QuoteOfTheDay from "../components/quote";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button"; // Import Button

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
  },
});

function FullScreenWelcome({ onButtonClick }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1533709475520-a0745bba78bf?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070")', // Set the background image here
        backgroundSize: "cover", // Ensure the image covers the entire div
        backgroundPosition: "center", // Center the background image
      }}
    >
      <Typography variant="h3" component="h1" sx={{ color: "#FFFFFF" }}>
        Welcome
      </Typography>
      <Typography variant="h1" component="h1" sx={{ color: "#FFFFFF" }}>
        Online Classroom
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={onButtonClick}
        style={{
          marginTop: "20px",
          borderRadius: "0",
          color: "#FFFFFF",
          borderColor: "#FFFFFF",
        }}
      >
        Go to your courses
      </Button>
    </div>
  );
}

function teacherdashboard() {
  const dashboardRef = useRef(null); // Create a reference

  const handleButtonClick = () => {
    dashboardRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the reference
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="App">
        <FullScreenWelcome onButtonClick={handleButtonClick} />
        <div ref={dashboardRef}>
          {" "}
          {/* Set the reference here */}
          <Grid
            container
            spacing={10}
            padding={5}
            style={{ marginTop: "5%", marginBottom: "12%" }}
          >
            <Grid item xs={7}>
              <SubjectsTable />
            </Grid>
            <Grid item xs={4}>
              <TeacherCalendar />
              <QuoteOfTheDay />
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default teacherdashboard;
