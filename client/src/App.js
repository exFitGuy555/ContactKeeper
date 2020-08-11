import React,{Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import AuthState from './Context/auth/AuthState'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import AlertState from './Context/alert/AlertState'
import Alerts from './components/Layout/Alerts'
import setAuthToken from './utils/setAuthToken'
import ContactState from './Context/contact/ContextState'
import PrivateRoute from './components/routing/privateRoute'
     
     //means == as soon as the app loaded , check if there is token in the local storage fire setAuthToken()
     if (localStorage.token) {
       setAuthToken(localStorage.token);
     }

const App = () => {
  return (
    <AuthState>
    < ContactState>
    <AlertState>
    <Router>
        <Fragment >
    <Navbar />
    <div className="container">
         <Alerts />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
    </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
