import React from 'react'

export const FilteredStocks = ({ stocksList, onRemove, match }) => {

  // TODO: Pass props instead of hard-coded data (should not be 'Enegry' but props)
  const filteredStocks = stocksList.filter((stock) => stock.sector === match.params.name) 

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
          {filteredStocks.map((item) => {
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