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
import Login from './components/Login';
import Singup from './components/Singup';
import { useState } from 'react';


function App() {
  
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteSate>
        <Router>
          <Nevbar />
          <Alert alert={alert} />
          <div className="container">
          <Routes>
            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/about' element={<About />} />         
            <Route path='/login' element={<Login showAlert={showAlert}/>}/>
            <Route path='/singup' element={<Singup showAlert={showAlert}/>} />
          </Routes>
          </div>
          
        </Router>
      </NoteSate>
    </>

  );
}

export default App;
