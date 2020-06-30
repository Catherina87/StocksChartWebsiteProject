import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Stock from '../model/Stock';
import { Link } from 'react-router-dom';

export const StocksList = ({ stocksList, onRemove }) => {
  if (stocksList.length === 0) {
    return <p className="mt2">No stocks added</p>
  }
  return (
    <ListGroup className="mt2">
      {stocksList.map(stockItem => {
        return (
          <ListGroup.Item> <Link to={`/list/${stockItem['id']}`}>{stockItem.tiker} </Link>
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