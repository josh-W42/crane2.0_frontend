// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import io from 'socket.io-client';
import axios from "axios";

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './utils/theme';
import { GlobalStyles } from './utils/global';

// CSS
import './App.css';

// Components
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Profile from  './components/pages/Profile';
import Navbar from './components/partials/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Footer from './components/partials/Footer';

const { REACT_APP_SERVER_URL, REACT_APP_SOCKET_URL } = process.env;

// Sockets
const socket = io(REACT_APP_SOCKET_URL, {
  reconnectionAttempts: 10,
  reconnectionDelay: 10000,
  reconnectionDelayMax: 10000,
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Protected Routes For Authorized Users;
  let token = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
    return token ? <Component {...rest} {...props} /> : <Redirect to="/login"/>;
  }} />
};

function App() {
  // Set state values

  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [theme, setTheme] = useState('dark');
 
  useEffect(() => {
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

  return (
    <div className="App">
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div id="particles-js"></div>
        <Navbar
          theme={theme}
          setTheme={setTheme}
          handleLogout={handleLogout}
          isAuth={isAuthenticated}
        />
        <div className="container mt-5">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  nowCurrentUser={nowCurrentUser}
                  setIsAuthenticated={setIsAuthenticated}
                  user={currentUser}
                  theme={theme}
                />
              )}
            />
            <PrivateRoute
              path="/profile"
              component={Profile}
              user={currentUser}
              handleLogout={handleLogout}
              theme={theme}
            />
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} theme={theme} />;
              }}
            />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
        <Footer theme={theme} />
      </ThemeProvider>
    </div>
  );
}

export default App;
