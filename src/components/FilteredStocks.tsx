import React from 'react'
import { match } from 'react-router';
import { Chart } from './Chart';
import Stock from '../model/Stock';
import Alert from 'react-bootstrap/Alert'

interface FilteredStocksProps {
  stocksList: Stock[],
  onRemove: (id: string) => void,
  flashMessage: string,
  updateFlashMessage: (status: string) => void,
  match: match<any>,
}

export const FilteredStocks = (props: FilteredStocksProps) => {

  const filteredStocks: Stock[] = props.stocksList.filter((stock) => stock.sector === props.match.params.name);

  const tickerToTotalPrice: { string: number[] } | {} = filteredStocks.reduce((accum, stock) => {
    if(accum[stock.ticker] === undefined) {
      accum[stock.ticker] = stock.price * stock.count;
    } else {
      accum[stock.ticker] = accum[stock.ticker] + stock.price * stock.count;
    }

    accum[stock.ticker] = Math.round(accum[stock.ticker] * 100) / 100;
    return accum;
  }, {});

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
    if (flashMessageStatusFromProps === 'success') {
      return renderFlashMessage("success", "The stock has been successfully removed")
    } else if (flashMessageStatusFromProps === 'error') {
      return renderFlashMessage("danger", "Error happened! The stock was not removed")
    }
  }

  return (
    <>
      {displayFlashMessageStatus(props.flashMessage)}
      
      <div className="d-flex flex-row">
        
        <div className="col-md-5 text-center mt2">
          <Chart labelsPriceMap={tickerToTotalPrice as { string: number }} />
        </div>

        <div className="col-md-7 text-center">
          <h3 className="mt2 font-weight-light">{props.match.params.name} Stocks</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Ticker</th>
                <th>Buy Price</th>
                <th>Num Shares</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock, i) => {
                return (
                  <tr key={i}>
                    <td>{stock.ticker}</td>
                    <td>{stock.price}</td>
                    <td>{stock.count}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        type="submit"
                        onClick={() => props.onRemove(stock.tradeId)}
                      >
                       Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      
      </div>
    </>
  );
}