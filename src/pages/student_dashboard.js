import './student_dashboard.css';
import Navbar from '../components/navbar.js';
import SubjectsTable  from '../components/subjectTable.js';
import BasicDateCalendar from '../components/calendar.js';
import QuoteOfTheDay from '../components/quote';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
      
      {/* <div className="list-div-container">
      {subjects.map((subject, index) => (
      <ListDiv key={index} subject={subject} />
      ))}
      </div> */}
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