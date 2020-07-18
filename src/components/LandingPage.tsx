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
        <p>Vizual preview helps to make smart investment decisions</p>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../images/imageEleven.jpg')}
          alt="Third slide"
        />

      <Carousel.Caption>
        <h3>Protect Data</h3>
        <p>StocksPortfolio helps you protect your data using reliable Okta authentication platform</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
};

export default LandingPage;