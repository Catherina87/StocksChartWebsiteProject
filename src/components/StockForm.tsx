import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stock from '../model/Stock';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { AllIndustrySectors, IndustrySector } from '../model/IndustrySector'
import Alert from 'react-bootstrap/Alert'

export const StockForm = (props) => {

  const [tiker, setTiker] = useState('');
  const [buyPrice, setBuyPrice] = useState(0);
  const [numShares, setNumShares] = useState(0);
  const [sector, setSector] = useState("Unknown" as IndustrySector);

  const tikerHandler = (event) => {
    setTiker(event.target.value)
  }

  const buyPriceHandler = (event) => {
    setBuyPrice(event.target.value)
  }

  const numSharesHandler = (event) => {
    setNumShares(event.target.value)
  }

  const sectorHandler = (event) => {
    setSector(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newStock: Stock = {
      id: uuidv4(),
      tiker: tiker,
      buyPrice: buyPrice,
      numShares: numShares,
      sector: sector
    }

    props.onAdd(newStock);
  }

  const renderFlashMessage = (variant, text) => {
    return (
      <Alert
        variant={variant}
        onClose={() => props.updateAddFlashMessageStatus('none')}
        dismissible
        className="mt2"
      >
        {text}
      </Alert>
    )
  }

  const displayFlashMessageStatus = (flashMessageStatusFromProps) => {
    if (flashMessageStatusFromProps === 'success') {
      return renderFlashMessage("success", "The stock has been successfully added")
    } else if (flashMessageStatusFromProps === 'error') {
      return renderFlashMessage("danger", "Error happened! The stock was not added")
    }
  }

  return (
    <>
      {displayFlashMessageStatus(props.addFlashMessage)}

      <Form className="mt2" onSubmit={handleSubmit}>
        <Form.Group controlId="formStockTiker">
          <Form.Label>Stock Ticker</Form.Label>
          <Form.Control
            required
            onChange={tikerHandler}
            value={tiker}
            type="string"
            placeholder="Stock Ticker"
          />
        </Form.Group>

        <Form.Group controlId="formBuyPrice">
          <Form.Label>Buy Price</Form.Label>
          <Form.Control
            required
            min={1}
            onChange={buyPriceHandler}
            type="number"
            placeholder="Buy Price"
          />
        </Form.Group>

        <Form.Group controlId="formNumShare">
          <Form.Label>Number of Shares</Form.Label>
          <Form.Control
            required
            min={1}
            onChange={numSharesHandler}
            type="number"
            placeholder="Number of Shares"
          />
        </Form.Group>

        <Form.Group controlId="formSelectIndustrySector">
          <Form.Label>Select Industry Sector</Form.Label>
          <Form.Control
            required
            onChange={sectorHandler}
            as="select"
            multiple
          >
            {AllIndustrySectors.map(sector => <option>{sector}</option>)}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Stock
      </Button>
      </Form>
    </>
  )
}

// TODO: need to show a flash message if stock was successfully added.
// to do that use the addFlashMessage passed through props.
// can create a method displayFlashMessageStatus that will take props as a parameter
// const displayFlashMessageStatus = (flashMessageStatusFromProps) => {
//  if flashMessageStatusFromProps === 'success' {
//      return (
//        <Alert variant="success" onClose={() => setShow(false)} dismissible>
//            The stock has been successfully added
//        </Alert>
//      )
//    } else if flashMessageStatusFromProps === 'error' {
//        return (
//          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
//             Error happened! The stock was not added
//          </Alert>
//        )
//    }
// }
//
// Then in component return, call this function above and it will render the 
// appropriate flash message.
// {displayFlashMessageStatus(props.addFlashMessage)}
// 
// The last thing we need to do is to call a function (which is also passed through props),
// that would change the state of the addFlashMessage to 'none'. This function should be passed
// to the onClose event as well, and the function should be smth like that:
// const changeFlashMessageStatus
// updateAddFlashMessageStatus('none')
