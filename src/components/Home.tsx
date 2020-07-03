import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { Chart } from './Chart';
import isEmpty from 'lodash/isEmpty';
import Stock from '../model/Stock';
import { IndustrySector } from '../model/IndustrySector';

interface HomeProps {
  stocksList: Stock[]
};

export const Home: React.FC<HomeProps> = (props) => {

  const sectorToStockMap: { IndustrySector: Stock[] } | {} = props.stocksList.reduce((accum, stock) => {
    if(isEmpty(accum[stock.sector])) {
      accum[stock.sector] = [stock];
    } else {
      accum[stock.sector] = [...accum[stock.sector], stock];
    }

    return accum;
  }, {});

  console.log(sectorToStockMap);

  const sectorToStocksPriceMap: { IndustrySector: number } | {} = Object.keys(sectorToStockMap).reduce((accum, sector) => {
    const sectorStocks: Stock[] = sectorToStockMap[sector];
    accum[sector] = sectorStocks.map(stock => stock.buyPrice * stock.numShares).reduce((accum, price) => accum + price, 0);

    return accum;
  }, {})
  
  const userStocksSectors: IndustrySector[] = Object.keys(sectorToStockMap) as IndustrySector[];

  return (
    <>
      <div className="d-flex flex-row">
        <div className="col-md-6 text-center mt2">
          <Chart labelsPriceMap={sectorToStocksPriceMap as { string: number }} />
        </div>

        <div className="col-md-6 text-center">
          <h3 className="mt2">Industry Sectors</h3>
          <ListGroup className="mt2">
            {userStocksSectors.map(sector => {
              return (
                <ListGroup.Item> 
                  <div className="category-item">
                    <div>
                      <Link to={`/category/${sector}`}>{sector}</Link>
                    </div>
                    <div>
                      $ {sectorToStocksPriceMap[sector]}
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