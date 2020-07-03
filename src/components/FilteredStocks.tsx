import React from 'react'
import { match } from 'react-router';
import { Chart } from './Chart';
import Stock from '../model/Stock';

interface FilteredStocksProps {
  stocksList: Stock[],
  onRemove: (id: string) => void,
  match: match<any>,
}

export const FilteredStocks = (props: FilteredStocksProps) => {

  const filteredStocks: Stock[] = props.stocksList.filter((stock) => stock.sector === props.match.params.name);

  const tickerToTotalPrice: { string: number[] } | {} = filteredStocks.reduce((accum, stock) => {
    if(accum[stock.tiker] === undefined) {
      accum[stock.tiker] = stock.buyPrice * stock.numShares;
    } else {
      accum[stock.tiker] = accum[stock.tiker] + (stock.buyPrice * stock.numShares);
    }

    return accum;
  }, {});

  return (
    <>
      <div className="d-flex flex-row">
        
        <div className="col-md-5 text-center mt2">
          <Chart labelsPriceMap={tickerToTotalPrice as { string: number }} />
        </div>

        <div className="col-md-7 text-center">
          <h3 className="mt2">{props.match.params.name} Stocks</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Tiker</th>
                <th>Buy Price</th>
                <th>Num Shares</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map(stock => {
                return (
                  <tr>
                    <td>{stock.tiker}</td>
                    <td>{stock.buyPrice}</td>
                    <td>{stock.numShares}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        type="submit"
                        onClick={() => props.onRemove(stock.id)}
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