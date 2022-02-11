import './App.css';
import Index from './Pages/index'
import Joinus from './Pages/joinus'
import Aboutus from './Pages/aboutus'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Index}/>
        <Route exact path="/joinus" component={Joinus}/>
        <Route exact path="/aboutus" component={Aboutus}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;