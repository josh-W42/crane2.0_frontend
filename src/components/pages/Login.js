// Imports
import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { NavLink, Redirect } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

const { REACT_APP_SERVER_URL } = process.env;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    // Get user data
    const userData = { email, password };
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/users/login`,
        userData
      );
      // obtain the token
      const { token } = response.data;
      // store in localstorage
      localStorage.setItem("jwtToken", token);
      // set axios auth header
      setAuthToken(token);
      // decode the json web token and store in App state
      const decoded = jwt_decode(token);
      props.nowCurrentUser(decoded);
    } catch (error) {
      console.error(error);
      alert("Either Email or Password is incorrect.  Please try again.");
    }
  };

  if (props.user) return <Redirect to="/profile" />;

  return (
    <div className="col-md-4 col-lg-3 m-auto mt-5">
      <Card
        className="text-start"
        bg={props.theme}
        text={props.theme === "light" ? "dark" : "white"}
      >
        <Form onSubmit={handleSubmit}>
          <Card.Body className="p-3">
            <div className="my-4">
              <Card.Title>Login</Card.Title>
            </div>

            <Form.Group className="form-group mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                placeholder="Enter email"
                className="form-control"
                required
              />
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
                className="form-control"
                required
              />
            </Form.Group>

            <div className="mt-4 text-center">
              <Card.Text className="nav-item">
                Don't have an account?
                <NavLink to="/signup">
                  Sign up Here.
                </NavLink>
              </Card.Text>
              <Button
                type="submit"
                variant={
                  props.theme === "light" ? "outline-dark" : "outline-light"
                }
              >
                Login
              </Button>
            </div>
          </Card.Body>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
