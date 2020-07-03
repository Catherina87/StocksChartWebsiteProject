import React from 'react'

export const StocksList = ({ stocksList, onRemove }) => {
  if (stocksList.length === 0) {
    return <p className="mt2">No stocks added</p>
  }

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
                <td>{item.id}</td>
                <td>{item.tiker}</td>
                <td>{item.buyPrice}</td>
                <td>{item.numShares}</td>
                <td>{item.sector}</td>
                <td>
                <button 
                  type="submit" 
                  className="btn btn-outline-danger btn-sm"
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