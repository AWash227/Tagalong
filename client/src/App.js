//Local, Node_Modules
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';


//Redux
import { Provider } from 'react-redux';
import store from './store';

//Components, Layouts
import { Layout } from 'antd';
import Navigationbar from './components/layout/Navigationbar';
import Landing from './components/layout/Landing';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
//POST, PATCH, etc...
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import TripForm from './components/Trip/TripFormBasic';

const { Header, Footer, Sider, Content} = Layout;

// Check for token to keep user logged in
if(localStorage.jwtToken){
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser()); 

    //Redirect user to login
    window.location.href = './login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Layout>
            <Content />
          </Layout>
          <Navigationbar style={{position: 'fixed', left: 0, top: 0, width: '100%'}} />
          <Route exact path ="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/trips/add" component={TripForm} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
