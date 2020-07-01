import React from 'react'
import Image from '../images/image3.jpg';

export const FilteredStocks = ({ stocksList, onRemove, match }) => {

  const filteredStocks = stocksList.filter((stock) => stock.sector === match.params.name) 

  return (
    <div>
      
      <div className="d-flex flex-row">
        <div className="col-md-5 text-center mt2">
          
          <img src={Image} className="img-fluid" alt="Responsive image"></img>
        </div>

        <div className="col-md-7 text-center">
          <h3>{match.params.name} Stocks</h3>
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
                        className="btn btn-secondary"
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
    </div>
  );
  
}