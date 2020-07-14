import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stock from '../model/Stock';
import { v4 as uuidv4 } from 'uuid';
import { AllIndustrySectors, IndustrySector } from '../model/IndustrySector'
import Alert from 'react-bootstrap/Alert'

export const StockForm = (props) => {

  const [tiker, setTiker] = useState('');
  const [buyPrice, setBuyPrice] = useState(0);
  const [numShares, setNumShares] = useState(0);
  const [sector, setSector] = useState("Unknown" as IndustrySector);

  const [tikerValid, setTikerValid] = useState(false);
  const [buyPriceValid, setBuyPriceValid] = useState(false);
  const [numSharesValid, setNumSharesValid] = useState(false);

  const [errorMessages, setErrorMessages] = useState({});

  const validateTiker = (newTicker: string) => {
    let isValidTiker = true;
    let errorMsgs = {...errorMessages};

    if (newTicker.trim().length < 1) {
      isValidTiker = false;
      errorMsgs['tiker'] = 'Must be at least 1 character'
    }

    setTikerValid(isValidTiker);
    setErrorMessages(errorMsgs);
  }

  const tikerHandler = (event) => { 
    const newTicker = event.target.value;
    
    validateTiker(newTicker);
    setTiker(newTicker);
  }

  const validateBuyPrice = (newBuyPrice: number) => {
    let isValidBuyPrice = true;
    let errorMsgs = {...errorMessages};

    if (newBuyPrice <= 0) {
      isValidBuyPrice = false;
      errorMsgs['buyPrice'] = 'Cannot be less than or equal to 0';
    } else if (isNaN(newBuyPrice)) {
      isValidBuyPrice = false;
      errorMsgs['buyPrice'] = 'Must be a number';
    }

    setBuyPriceValid(isValidBuyPrice);
    setErrorMessages(errorMsgs);
  }

  const buyPriceHandler = (event) => {
    const newBuyPrice = event.target.value;

    validateBuyPrice(newBuyPrice);
    setBuyPrice(newBuyPrice);
  }

  const validateNumShares = (newNumShares: number) => {
    let isValidNumShares = true;
    let errorMsgs = {...errorMessages};

    if (newNumShares < 1) {
      isValidNumShares = false;
      errorMsgs['numShares'] = 'Cannot be less than 1';
    }

    setNumSharesValid(isValidNumShares);
    setErrorMessages(errorMsgs);
  }

  const numSharesHandler = (event) => {
    const newNumShares = event.target.value;

    validateNumShares(newNumShares);
    setNumShares(newNumShares);
  }

  const sectorHandler = (event) => {
    setSector(event.target.value)
  }

  const isFormValid = () => {
    
    console.log('tikerValid = ', tikerValid);
    console.log('buyPriceValid = ', buyPriceValid);
    console.log('numSharesValid = ', numSharesValid);

    return (tikerValid && buyPriceValid && numSharesValid);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      const newStock: Stock = {
        tradeId: uuidv4(),
        ticker: tiker,
        price: buyPrice,
        count: numShares,
        sector: sector
      }
  
      props.onAdd(newStock);
    }
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
          <ValidationMessage valid={tikerValid} message={errorMessages['tiker']} />
        </Form.Group>

        <Form.Group controlId="formBuyPrice">
          <Form.Label>Buy Price</Form.Label>
          <Form.Control
            required
            min={1}
            step="0.01"
            onChange={buyPriceHandler}
            type="number"
            placeholder="Buy Price"
          />
          <ValidationMessage valid={buyPriceValid} message={errorMessages['buyPrice']} />
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
          <ValidationMessage valid={numSharesValid} message={errorMessages['numShares']} />
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

export const ValidationMessage = (props) => {
  if (!props.valid) {
    return (
      <div className="error-msg">
        {props.message}
      </div>
    )
  }

  return null;
}
