import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

export const StocksList = ({ stocksList, onRemove }) => {
  if (stocksList.length === 0) {
    return <p className="mt2">No stocks added</p>
  }
  return (
    <ListGroup className="mt2">
      {stocksList.map(stockItem => {
        return (
          <ListGroup.Item>{stockItem.tiker} 
            <button 
              type="submit" 
              className="btn btn-outline-primary ml2"
              onClick={() => onRemove(stockItem.id)}
            >
              Remove Stock
            </button>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}