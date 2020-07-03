import React from 'react'
import { Chart } from './Chart';

export const FilteredStocks = ({ stocksList, onRemove, match }) => {

  const filteredStocks = stocksList.filter((stock) => stock.sector === match.params.name) 

  return (
    <>
      <div className="d-flex flex-row">
        
        <div className="col-md-5 text-center mt2">
          <Chart />
        </div>

        <div className="col-md-7 text-center">
          <h3 className="mt2">{match.params.name} Stocks</h3>
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
                        onClick={() => onRemove(stock.id)}
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