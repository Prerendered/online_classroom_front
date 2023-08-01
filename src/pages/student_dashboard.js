import './student_dashboard.css';
import Navbar from '../components/navbar.js';

// function NavBar() {

//     return (
//         <nav className="navbar">
//             <h2 class="logo">logo</h2>
//             <ul className="nav-list">
//                 <li className="nav-item"><h2><a href="/">Home</a></h2></li>
//                 <li className="nav-item"><h2><a href="/">Online Forum</a></h2></li>
//                 <li className="nav-item" id='Logout'> <h2><a href="/">Log Out</a></h2></li>
//             </ul>
//         </nav>
//     );
// }
const subjects = ['Math', 'History', 'English','French','Science','Geography'];

function ListDiv(props) {
    return (
        <div className="list-div">
            <h2 className='subName'>{props.subject}</h2>
            <div className="link-buttons">
                <a href="/" className="button">Status</a>
                <a href="/" className="button">Watch Video</a>
            </div>
        </div>
    );
}

function Welcome() {
    return (
        <div className='Welcome_div'>
            <h1>Welcome to your dashboard!</h1>
        </div>
    );
}
/*Function to create a chat-bot log at the bottom right of the screen*/
function Chatbot()
{
    return(

        <div className="link-buttons">
            <a href="/" className="chat-bot">Need Assistance?</a>
        </div>

    )
}

function App() {
    return (
        <div className="App">
            <Navbar />
            <Welcome />
            <div className="list-div-container">
                {subjects.map((subject, index) => (
                    <ListDiv key={index} subject={subject} />
                ))}
            </div>
            <Chatbot/>
        </div>
    );
}

export default App;