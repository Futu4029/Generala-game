import './App.css';
import Index from './components/Index';
import UnJugador from './components/UnJugador.jsx';
import DosJugadores from './components/DosJugadores.jsx';
import Tutorial from './components/Tutorial.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/index" component={Index} />
        <Route path="/unJugador" component={UnJugador} />
        <Route path="/dosJugadores" component={DosJugadores} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path="*" component={Index} />
      </Switch>
    </Router>
  );
}

export default App;
