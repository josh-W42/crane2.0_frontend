import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormCheck from "react-bootstrap/FormCheck";

const TopNavbar = (props) => {

  const handleThemeChange = () => {
    props.setTheme(props.theme === 'light' ? 'dark' : 'light');
  } 

  return (
    <Navbar bg={props.theme} variant={props.theme} expand="lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            alt="crane logo"
            src="https://res.cloudinary.com/dom5vocai/image/upload/v1613426540/crane_logo_xzo7cm.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Crane
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
            <li className="nav-item">
              <Form className="nav-link">
                <Form.Check
                  type="switch"
                  label={`-${props.theme.toUpperCase()} Theme`}
                  id="light-dark-switch"
                  checked={props.theme === 'light'}
                  onChange={handleThemeChange}
                />
              </Form>
            </li>
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default TopNavbar;
