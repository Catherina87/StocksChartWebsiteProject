import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { Chart } from './Chart';
import Stock from '../model/Stock';
import { IndustrySector } from '../model/IndustrySector';

interface HomeProps {
  stocksList: Stock[]
};

export const Home: React.FC<HomeProps> = (props) => {

  const sectorToStocksPriceMap: { IndustrySector: number } | {} = props.stocksList.reduce((accum, stock) => {
    if(accum[stock.sector] === undefined) {
      accum[stock.sector] = Math.round((stock.price * stock.count + Number.EPSILON) * 100) / 100;
    } else {
      accum[stock.sector] = accum[stock.sector] + Math.round((stock.price * stock.count + Number.EPSILON) * 100) / 100;
    }

    return accum;
  }, {});
  
  const userStocksSectors: IndustrySector[] = Object.keys(sectorToStocksPriceMap) as IndustrySector[];

  return (
    <>
      <div className="d-flex flex-row">
        <div className="col-md-6 text-center mt2">
          <Chart labelsPriceMap={sectorToStocksPriceMap as { string: number }} />
        </div>

        <div className="col-md-6 text-center">
          <h3 className="mt2 font-weight-light">Industry Sectors</h3>
          <ListGroup className="mt2">
            {userStocksSectors.map(sector => {
              return (
                <Link to={`/category/${sector}`} className="link">
                <ListGroup.Item className="mt05"> 
                  <div className="category-item">
                    <div>
                      <Link to={`/category/${sector}`} className="link">{sector}</Link>
                    </div>
                    <div>
                      $ {sectorToStocksPriceMap[sector]}
                    </div>
                  </div>
                </ListGroup.Item>
                </Link>
              )
            })}
          </ListGroup>

          <Link to="/add" className="btn btn-outline-primary mt2">Add Stock</Link>
        </div>
      </div>
    </>
  );
}