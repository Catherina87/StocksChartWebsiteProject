import React from 'react'
import Alert from 'react-bootstrap/Alert'

export const StocksList = ({ stocksList, onRemove, flashMessage, updateFlashMessage }) => {
  console.log("stockslist is ", stocksList)
  if (stocksList.length === 0) {
    return <p className="font-weight-light mt2">No stocks added</p>
  }

  const renderFlashMessage = (variant, text) => {
    return (
      <Alert
        variant={variant}
        onClose={() => updateFlashMessage('none')}
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
      {displayFlashMessageStatus(flashMessage)}

      <table className="table mt2">
        <thead className="thead-light">
          <tr>
            <th>Ticker</th>
            <th>Buy Price</th>
            <th>Num Shares</th>
            <th>Total</th>
            <th>Sector</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {stocksList.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.ticker}</td>
                <td>{item.price}</td>
                <td>{item.count}</td>
                <td>{Math.round((item.count * item.price) * 100) / 100}</td>
                
                <td>{item.sector}</td>
                <td>
                <button 
                  type="submit" 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onRemove(item.tradeId)}
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
    </>
  );
}
