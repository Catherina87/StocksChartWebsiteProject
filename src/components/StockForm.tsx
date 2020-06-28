import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const StockForm = () => {

  return (
    <Form>
      <Form.Group controlId="formStockTiker">
        <Form.Label>Stock Ticker</Form.Label>
        <Form.Control type="tiker" placeholder="Stock Ticker" />
      </Form.Group>

      <Form.Group controlId="formBuyPrice">
        <Form.Label>Password</Form.Label>
        <Form.Control type="price" placeholder="Buy Price" />
      </Form.Group>

      <Form.Group controlId="formNumShare">
        <Form.Label>Number of Shares</Form.Label>
        <Form.Control type="numShares" placeholder="Number of Shares" />
      </Form.Group>

      <Form.Group controlId="formSelectIndustrySector">
        <Form.Label>Select Industry Sector</Form.Label>
        <Form.Control as="select" multiple>
          <option>Real Estate</option>
          <option>Bonds</option>
          <option>Finance</option>
          <option>Tech</option>
          <option>Energy</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Stock
      </Button>
    </Form>
  )
}
