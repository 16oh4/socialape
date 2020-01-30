//Libs
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//Styling
import './App.css';

//Components
import Navbar from './components/Navbar'
import AuthRoute from './include/AuthRoute'

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

//Includes
import myTheme from './include/theme';

//MUI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export const theme = createMuiTheme(myTheme);

//AUTHENTICATION ONLY RUNS ONCE
let authenticated; //global value
const token = localStorage.FBIdToken;

if(token) { //if it's not undefined
  const decodedToken = jwtDecode(token);

  if(decodedToken.exp * 1000 < Date.now()) { //if token is expired, then redirect to login
    window.location.href = '/login';
    authenticated = false;
  } else authenticated = true;
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
                      <AuthRoute path="/login" component={login} authenticated={authenticated} />
                      <AuthRoute path="/signup" component={signup} authenticated={authenticated} />
                    </Switch> 
                  </div>              
              </Router>
            </Provider>
          </MuiThemeProvider>
      )
  }
}

export default App