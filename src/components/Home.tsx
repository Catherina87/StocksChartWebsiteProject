import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { Chart } from './Chart';

export const Home = () => {

  // For now all categories are hardcoded
  const categories = ['Tech', 'Finance', 'Bonds', 'Real Estate', 'Energy']

  return (
    <>
      <div className="d-flex flex-row">
        <div className="col-md-6 text-center mt2">
          <Chart />
        </div>

        <div className="col-md-6 text-center">
          <h3 className="mt2">Industry Sectors</h3>
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
    </>
  );
}