import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import styled, { css } from 'styled-components';

// const Nav = styled.nav`
//     background: ${({ theme }) => theme.body};
//     color: ${({ theme }) => theme.text};
// `


const TopNavbar = (props) => {
  return (
    <Navbar bg={props.theme} variant={props.theme} expand="lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          MERN Auth
        </Link>
        <Navbar.Toggle aria-controls="topNav" />
        <Navbar.Collapse id="topNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            {
              // Now we'll add in the part of the navbar for when a user is vs isn't logged in.
              props.isAuth ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link logut-link"
                      onClick={props.handleLogout}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )
            }
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default TopNavbar;
