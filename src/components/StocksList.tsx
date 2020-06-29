import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

export const StocksList = ({ stocksList }) => {
  if (stocksList.length === 0) {
    return <p className="mt2">No stocks added</p>
  }
  return (
    <ListGroup className="mt2">
      {stocksList.map(stockItem => {
        return (
          <ListGroup.Item>{stockItem.tiker} </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}