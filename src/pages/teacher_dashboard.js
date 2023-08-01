import './teacher_dashboard.css';
import Navbar from '../components/navbar.js';

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
const subjects = ['Math', 'History', 'English','French','Science','Geography'];

function ListDiv(props) {
  return (
    <div className="list-div">
      <h2 class='subName'>{props.subject}</h2>
      <div className="link-buttons">
        <a href="/" className="button">View Course</a>
        <a href="/" className="button">Manage Progress</a>
      </div>
    </div>
  );
}

function Welcome() {
  return (
    <div class='Welcome_div'>
      <h1>Welcome to your dashboard!</h1>
    </div>
  );
}

function teacherdashboard() {
  return (
    <div className="App">
      <Navbar />
      <Welcome />
      <div className="list-div-container">
      {subjects.map((subject, index) => (
      <ListDiv key={index} subject={subject} />
      ))}
      </div>
    </div>
  );
}

export default teacherdashboard;