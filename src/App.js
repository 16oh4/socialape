//Libs
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Styling
import './App.css';

//Components
import Navbar from './components/Navbar'

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

//Includes
import myTheme from './include/theme';

//MUI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export const theme = createMuiTheme(myTheme);

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
              <div className="App">
                <Router>
                <Navbar />
                  <div className="container">                    
                    <Switch>
                      <Route exact path="/" component={home}/>
                      <Route path="/login" component={login}/>
                      <Route path="/signup" component={signup}/>
                    </Switch> 
                  </div>              
                </Router>
            </div>
            </MuiThemeProvider>
        )
    }
}

export default App