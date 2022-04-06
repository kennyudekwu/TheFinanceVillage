import './App.css';
import Index from './Pages/index'
import Joinus from './Pages/joinus'
import Aboutus from './Pages/aboutus'
import Login from './Pages/login'
import Signup from './Pages/signup';
import Testimonials from './Pages/testimonials';
import ResetOne from './Pages/resetpassOne';
import ResetTwo from './Pages/resetpassTwo';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Index}/>
        <Route exact path="/joinus" component={Joinus}/>
        <Route exact path="/aboutus" component={Aboutus}/>
        <Route exact path="/testimonials" component={Testimonials}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/resetone" component={ResetOne}/>
        <Route exact path="/resettwo" component={ResetTwo}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;