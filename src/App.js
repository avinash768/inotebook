import './App.css';
import Home from './components/Home';
import Nevbar from './components/Nevbar';
import About from './components/About';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteSate from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteSate>
        <Router>
          <Nevbar />
          <Alert message="this is ok"/>
          <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
          </div>
        </Router>
      </NoteSate>
    </>

  );
}

export default App;
