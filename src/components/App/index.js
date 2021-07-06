import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../Landing'
import Footer from '../Footer'
import Welcome from '../Welcome'
import Login from '../Login'
import Signup from '../Signup'
import ErrorPage from '../ErrorPage'
import ForgetPassword from '../ForgetPassword'
import Recette from '../Recette'
import Navbar from '../Navbar/Navbar'
import About from '../About'
import Contact from '../Contact'
import '../../App.css';


function App() {
  return (
      <div>
        <Router>
          <Navbar />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/welcome" component={Welcome}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgetpassword" component={ForgetPassword} />
            <Route path="/recette" component={Recette} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={ErrorPage } />
          </Switch>

          <Footer />
        </Router>
      </div>
  );
}

export default App;
