import './App.css';
import Index from './Pages/index'
import Joinus from './Pages/joinus'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Index}/>
        <Route exact path="/joinus" component={Joinus}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;