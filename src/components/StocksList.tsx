import React from 'react'
import Alert from 'react-bootstrap/Alert'

export const StocksList = ({ stocksList, onRemove, removeFlashMessage, updateRemoveFlashMessageStatus }) => {
  if (stocksList.length === 0) {
    return <p className="font-weight-light mt2">No stocks added</p>
  }

  const renderFlashMessage = (variant, text) => {
    return (
      <Alert
        variant={variant}
        onClose={() => updateRemoveFlashMessageStatus('none')}
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
      {displayFlashMessageStatus(removeFlashMessage)}

      <table className="table mt2">
        <thead className="thead-light">
          <tr>
            <th>Tiker</th>
            <th>Buy Price</th>
            <th>Num Shares</th>
            <th>Total</th>
            <th>Sector</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {stocksList.map((item) => {
            return (
              <tr>
                <td>{item.tiker}</td>
                <td>{item.price}</td>
                <td>{item.count}</td>
                <td>{item.count * item.price}</td>
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
    </>
  );
}

// TODO: need to show a flash message if the stock was successfully deleted
// removeFlashMessage will be passed through props
// create two methods renderFlashMesage and displayFlashMessageStatus
// displayFlashMessageStatus takes removeFlashMessage prop and based on the status
// calls renderFlashMesage to which it passes the variant and text that needs to display
// also when you dismiss the flash message change the state to 'none'