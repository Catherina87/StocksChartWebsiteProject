import React from "react";
import { Carousel } from "react-bootstrap";

const LandingPage = () => {

  return (
    <Carousel className="mt2">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../images/imageSeven.jpg')}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Organize Data</h3>
          <p>Keep your stocks data all in one place</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../images/imageTen.jpg')}
          alt="Third slide"
        />

      <Carousel.Caption>
        <h3>Visualize Data</h3>
        <p>Visual preview helps to make smart investment decisions</p>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../images/imageEleven.jpg')}
          alt="Third slide"
        />

      <Carousel.Caption>
        <h3>Manage Data</h3>
        <p>Update your stocks portfolio with every investment</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
};

export default LandingPage;