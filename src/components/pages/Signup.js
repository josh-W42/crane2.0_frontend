// Imports
import React, { useState } from "react";
import axios from "axios";
import { Redirect, NavLink } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const { REACT_APP_SERVER_URL } = process.env;

const Signup = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("https://res.cloudinary.com/dom5vocai/image/upload/v1613426540/crane_logo_xzo7cm.png");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return alert("Passwords don't match");
    if (password.length <= 8)
      return alert("Password has to be at least 8 characters.");

    const newUser = { userName, email, password };
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/users/register`,
        newUser
      );
      setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleProfilePic = (event) => {
    const inputTag = event.target;
    // if they submit an image, show a preview
    if (inputTag.files.length > 0) {
      setProfilePic(URL.createObjectURL(inputTag.files[0]));
    }
  }

  if (redirect || props.user) return <Redirect to="/profile" />;

  return (
    <div className="col-md-12 col-lg-8 m-auto mt-5">
      <Card
        className="text-start"
        bg={props.theme}
        text={props.theme === "light" ? "dark" : "white"}
      >
        <Form onSubmit={handleSubmit}>
          <Card.Body className="p-3">
            <div className="my-4">
              <Card.Title>SignUp</Card.Title>
            </div>
            <Card.Text className="nav-item">
              Already have an account?
              <NavLink to="/login">
                Login Here.
              </NavLink>
            </Card.Text>
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group className="form-group mb-4" controlId="username">
                  <Form.Label>Username *</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={userName}
                    onChange={handleUserName}
                    className="form-control"
                    placeholder="Enter Username"
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group mb-4" controlId="email">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter Email"
                    className="form-control"
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group mb-4" controlId="password">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Enter Password"
                    className="form-control"
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group mb-4" controlId="password-confirm">
                  <Form.Label>Confirm Password *</Form.Label>
                  <Form.Control
                    type="password"
                    name="password-confirm"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    placeholder="Confirm Password"
                    className="form-control"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} className="text-center">
                <Form.Group className="form-group mb-4">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.File id="profilePic" accept="image/*" onChange={handleProfilePic} />
                  <Image
                    width="100"
                    height="100"
                    alt="profile pic holder"
                    src={profilePic}
                    roundedCircle
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4 text-center">
              <Button
                type="submit"
                variant={
                  props.theme === "light" ? "outline-dark" : "outline-light"
                }
              >
                Sign Up
              </Button>
            </div>
          </Card.Body>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
