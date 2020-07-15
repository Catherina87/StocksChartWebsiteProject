import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { Chart } from './Chart';
import Stock from '../model/Stock';
import { IndustrySector } from '../model/IndustrySector';
import Alert from 'react-bootstrap/Alert'

interface HomeProps {
  stocksList: Stock[],
  flashMessage: string,
  updateFlashMessage: (status: string) => void
};

export const Home: React.FC<HomeProps> = (props) => {

  const sectorToStocksPriceMap: { IndustrySector: number } | {} = props.stocksList.reduce((accum, stock) => {
    if(accum[stock.sector] === undefined) {
      accum[stock.sector] = stock.price * stock.count;
      console.log("when accum undefined", accum[stock.sector])
    } else {
      accum[stock.sector] = accum[stock.sector] + stock.price * stock.count;
      console.log("when accum is not undefined", accum[stock.sector])
    }

    accum[stock.sector] = Math.round(accum[stock.sector] * 100) / 100;

    return accum;
  }, {});
  
  const userStocksSectors: IndustrySector[] = Object.keys(sectorToStocksPriceMap) as IndustrySector[];

  const renderFlashMessage = (variant, text) => {
    return (
      <Alert
        variant={variant}
        onClose={() => props.updateFlashMessage('none')}
        dismissible
        className="mt2"
      >
        {text}
      </Alert>
    )
  }

  const displayFlashMessageStatus = (flashMessageStatusFromProps) => {
    if (flashMessageStatusFromProps === 'error') {
      return renderFlashMessage("danger", "Error happened! The stock data was not uploaded")
    }
  }

  return (
    <>
      {displayFlashMessageStatus(props.flashMessage)}
      <div className="d-flex flex-row">
        <div className="col-md-6 text-center mt2">
          <Chart labelsPriceMap={sectorToStocksPriceMap as { string: number }} />
        </div>

        <div className="col-md-6 text-center">
          <h3 className="mt2 font-weight-light">Industry Sectors</h3>
          <ListGroup className="mt2">
            {userStocksSectors.map((sector, i) => {
              return (
                <Link to={`/category/${sector}`} key={i} className="link">
                  <ListGroup.Item className="mt05"> 
                    <div className="category-item">
                      <div>
                        {sector}
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