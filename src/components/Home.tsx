import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from '../images/image1.jpg';
import { Link } from 'react-router-dom';

export const Home = () => {

  const categories = ['Tech', 'Finance', 'Bonds', 'Real Estate', 'Energy']

  return (
    <div>
      
      <div className="d-flex flex-row">
        <div className="col-md-6 text-center mt2">
          
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
                      <Link to={`/category/${category}`}>{category}</Link>
                    </div>
                    <div>
                      %
                    </div>
                  </div>
                </ListGroup.Item>
              )
            })}
          </ListGroup>

          <Link to="/add" className="btn btn-outline-primary mt2">Add Stock</Link>
        </div>
      
      </div>
    </div>
  );
}