//Libs
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//Styling
import './App.css';

//Components
import Navbar from './components/layout/Navbar'
import AuthRoute from './include/AuthRoute'

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

//Includes
import myTheme from './include/theme';

//MUI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export const theme = createMuiTheme(myTheme);

//AUTHENTICATION ONLY RUNS ONCE
const token = localStorage.FBIdToken;

if(token) { //if it's not undefined
  const decodedToken = jwtDecode(token);

  if(decodedToken.exp * 1000 < Date.now()) { //if token is expired, then redirect to login
    store.dispatch(logoutUser()); //
    window.location.href = '/login';
  } else {
    
    //this dispatch will be propagated to all who read the store
    //login.js and signup.js
    store.dispatch( {type: SET_AUTHENTICATED} ); 

    //when refreshing the page, the headers are gone
    //need to setup axios headers again
    axios.defaults.headers.common['Authorization'] = token;

    //this dispatch will also propagate to all who read the store with 'connect'
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
      return (
          <MuiThemeProvider theme={theme}> {/*Styling for the app */}
            <Provider store={store}> {/*Redux store will have access to entire app */}
              <Router>
                <Navbar />
                  <div className="container">                    
                    <Switch>
                      <Route exact path="/" component={home}/>
                      <AuthRoute path="/login" component={login} />
                      <AuthRoute path="/signup" component={signup} />
                      <Route exact path="/users/:handle" component={user}/>
                      <Route exact path="/users/:handle/scream/:screamId" component={user}/>
                    </Switch> 
                  </div>              
              </Router>
            </Provider>
          </MuiThemeProvider>
      )
  }
}

export default App