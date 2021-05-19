import React from 'react';

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Home = (props) => {
  return (
    <div id="homeContent">
      <Card
        className="col-md-4 col-lg-3 m-auto text-center"
        bg={props.theme}
        text={props.theme === "light" ? "dark" : "white"}
      >
        <Card.Img
          id="homeLogo"
          variant="top"
          width="50"
          height="300"
          src="https://res.cloudinary.com/dom5vocai/image/upload/v1613426540/crane_logo_xzo7cm.png"
        />
        <Card.Body>
          <Card.Title>Welcome To Crane!</Card.Title>
          <Card.Text className="capitalize">
            A social media Application.
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-around">
          <Button variant={props.theme === "light" ? "outline-dark" : "outline-light"}>Signup</Button>
          <Button variant={props.theme === "light" ? "outline-dark" : "outline-light"}>Login</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Home;