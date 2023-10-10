import './student_dashboard.css';
import Navbar from '../components/navbar.js';
import SubjectsTable  from '../components/teacherSubjectTable.js';
import BasicDateCalendar from '../components/calendar.js';
import QuoteOfTheDay from '../components/quote';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to get name from url

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
    <div className="App">
      <Navbar />
      <Welcome />
      <Grid container spacing={10} padding={5}>
        <Grid item xs={7}>
          <SubjectsTable />
        </Grid>
        <Grid item xs={4}>
          <BasicDateCalendar />
          <QuoteOfTheDay />
        </Grid>
          
      </Grid>
    </div>
  );
}

export default studentdashboard;