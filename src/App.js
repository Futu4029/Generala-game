import './App.css';
import Index from './components/Index';
import RollDice from './components/RollDice.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="generala">
        <Switch>
          <Route path="/index" component={Index}/>
          <Route path="/game-on" component={RollDice}/>
          <Route path="*" component={Index}/>
        </Switch>
      </div>
      <nav>

      </nav>
    </Router>
  );
}

export default App;
