// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import io from 'socket.io-client';
import axios from "axios";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// CSS
import './App.css';

// Components
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from  './components/Profile';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import About from './components/About';
import Footer from './components/Footer';

const { REACT_APP_SERVER_URL, REACT_APP_SOCKET_URL } = process.env;

// Sockets
const socket = io(REACT_APP_SOCKET_URL, {
  reconnectionAttempts: 10,
  reconnectionDelay: 10000,
  reconnectionDelayMax: 10000,
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
    // Ok so basically this is saying if there is a token AKA
    // If they are logged in we route 
    return token ? <Component {...rest} {...props} /> : <Redirect to="/login"/>;
  }} />
};

// finds the theme preference if they set it before.
const themePreference = () => {
  if (localStorage.getItem('theme')) {
    return localStorage.getItem('theme') === 'Dark' ? true : false;
  }
  return false
}

function App() {
  // Set state values

  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(themePreference());
 
  useEffect(() => {
    // We can check if a user is authenticated if there is a token avalible in localstorage
    // We do this every time the app is mounted.
    let token;

    const localToken = localStorage.getItem('jwtToken');

    if (!localToken) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localToken);
      setAuthToken(localToken);
      setCurrentUser(token);
    }
  }, []);

  useEffect(() => {
    // socket specific stuff
    socket.on('connect', () => {
      console.log('hi');
    });
    socket.on('disconnect', () => {
      console.log('bye');
    });
    socket.on('message', (data) => {
      console.log(data);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [])

  const nowCurrentUser = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) { 
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  // Themeing
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkModeEnabled ? 'dark' : 'light',
        },
      }),
    [darkModeEnabled],
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
        <h1>MERN Authentication</h1>
        <div className="container mt-5">
          <Switch>
            <Route path='/signup' component={Signup} />
            <Route 
              path="/login"
              render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} />}
            />
            <PrivateRoute path="/profile" component={Profile} user={currentUser} handleLogout={handleLogout} />
            <Route exact path="/" component={Welcome} /> 
            <Route exact path="/about" component={About} /> 
          </Switch>
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
