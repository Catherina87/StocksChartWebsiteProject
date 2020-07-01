import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from '../image1.jpg';

export const Home = () => {

  const categories = ['Tech', 'Finance', 'Bonds', 'Real Etate', 'Energy']

  return (
    <div>
    <h1>Home Page</h1>
    <div className="d-flex flex-row">
      <div className="col-md-6 text-center">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, in!</p>
        <img src={Image} className="img-fluid" alt="Responsive image"></img>
      </div>

      <div className="col-md-6 text-center">
        <h3>Industry Sectors</h3>
        <ListGroup className="mt2">
        {categories.map(category => {
          return (
            <ListGroup.Item> 
              <div className="category-item">
                <div>
                  {category} 
                </div>
                <div>
                  %
                </div>
              </div>
            </ListGroup.Item>
          )
      })}
        </ListGroup>
      </div>
     
    </div>
  </div>
  );
}