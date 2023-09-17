import './App.css';
import Home from './components/Home';
import Nevbar from './components/Nevbar';
import About from './components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteSate from './context/notes/NoteState';

function App() {
  return (
    <>
      <NoteSate>
        <Router>
          <Nevbar />
          <Switch>
            <Route excat path="/">

              <Home />
            </Route>
            <Route excat path="/About">
              <About />
            </Route>
          </Switch>
        </Router>
      </NoteSate>
    </>
  );
}

export default App;
