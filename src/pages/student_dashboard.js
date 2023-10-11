import "./student_dashboard.css";
import Navbar from "../components/navbar.js";
import SubjectsTable from "../components/subjectTable.js";
// import BasicDateCalendar from '../components/calendar.js';
import StudentCalendar from "../components/studentCalendar.js";
import QuoteOfTheDay from "../components/quote";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
  },
});

//Welcome message
function Welcome() {
  return (
    <Grid container justify="flex-start" padding={5}>
      <Typography variant="h2" component="h1">
        Welcome to your dashboard!
      </Typography>
    </Grid>
  );
}

function studentdashboard() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Welcome />
        <Grid container spacing={10} padding={5}>
          <Grid item xs={7}>
            <SubjectsTable />
          </Grid>
          <Grid item xs={4}>
            <StudentCalendar />
            <QuoteOfTheDay />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default studentdashboard;
