import './App.css';
import Index from './components/Index';
import RollDice from './components/RollDice.jsx';
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
        <Route path="/game" component={RollDice} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path="*" component={Index} />
      </Switch>
    </Router>
  );
}

export default App;
