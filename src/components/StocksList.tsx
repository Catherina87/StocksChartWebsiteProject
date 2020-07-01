import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Stock from '../model/Stock';
import { Link } from 'react-router-dom';

export const StocksList = ({ stocksList, onRemove }) => {
  if (stocksList.length === 0) {
    return <p className="mt2">No stocks added</p>
  }
  // return (
  //   <ListGroup className="mt2">
  //     {stocksList.map(stockItem => {
  //       return (
  //         <ListGroup.Item> <Link to={`/list/${stockItem['id']}`}>{stockItem.tiker} </Link>
  //           ${stockItem.buyPrice}
  //           <button 
  //             type="submit" 
  //             className="btn btn-outline-primary ml2"
  //             onClick={() => onRemove(stockItem.id)}
  //           >
  //             Remove Stock
  //           </button>
  //         </ListGroup.Item>
  //       )
  //     })}
  //   </ListGroup>
  // )

  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Tiker</th>
            <th>Buy Price</th>
            <th>Number of Shares</th>
            <th>Sector</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {stocksList.map((item) => {
            return (
              <tr>
                <td>
                  {item.id}
                </td>
                <td>
                  {item.tiker}
                </td>
                <td>
                  {item.buyPrice}
                </td>
                <td>
                  {item.numShares}
                </td>
                <td>
                  {item.sector}
                </td>
                <td>
                <button 
                  type="submit" 
                  className="btn btn-outline-danger ml2"
                  onClick={() => onRemove(item.id)}
                >
                  Remove Stock
                </button>
                </td>
              </tr>
            )
          }
          )}

        </tbody>
      </table>
    </div>
  );
}