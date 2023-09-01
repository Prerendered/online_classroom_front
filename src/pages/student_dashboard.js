import './student_dashboard.css';
import Navbar from '../components/navbar.js';
import SubjectsTable  from '../components/subjectTable.js';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import BasicDateCalendar from '../components/calendar.js';
import QuoteOfTheDay from '../components/quote';

// function NavBar() {
//   return (
//     <nav className="navbar">
//       <h2 class="logo">logo</h2>
//       <ul className="nav-list">
//         <li className="nav-item"><h2><a href="/">Home</a></h2></li>
//         <li className="nav-item"><h2><a href="/">Students</a></h2></li>
//         <li className="nav-item"><h2><a href="/">Online Forums</a></h2></li>
//         <li className="nav-item" id='Logout'> <h2><a href="/">Log Out</a></h2></li>
//       </ul>
//     </nav>
//   );
// }

//Welcome message

function Welcome() {
  return (
    <Grid container justify="flex-start" padding={3}>
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
      <Grid container spacing={10}>
        <Grid item xs={7}>
          <SubjectsTable />
        </Grid>
        <Grid item xs={4.5}>
          <BasicDateCalendar />
          <QuoteOfTheDay />
        </Grid>
          
      </Grid>
    </div>
  );
}

export default studentdashboard;