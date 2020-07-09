import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Stock from './model/Stock';

import { v4 as uuidv4 } from 'uuid';

import { Home } from './components/Home';
import { CustomNavbar } from './components/CustomNavbar';
import { StockForm } from './components/StockForm';
import { StocksList } from './components/StocksList';
import { FilteredStocks } from './components/FilteredStocks';

const App = () => {

  const [stocksList, setStocksList] = useState<Stock[]>([]);

  const [addFlashMessage, setAddFlashMessage] = useState('none');
  const [removeFlashMessage, setRemoveFlashMessage] = useState('none');

  useEffect(() => {
    const retrievedStocks: Stock[] = fetchStocks();

    setStocksList(retrievedStocks);
  }, []);

  const addStock = (stock: Stock) => {
    // TODO: Add API call to add stock to DB
    setStocksList(prev => [stock, ...prev])

    // TODO: if stock was successfully added,
    // setAddFlashMessage('success'), if not, set it to 'error'
    // pass addFlashMessage as props to the StockForm component as well as
    // updateAddFlashMessageStatus

    // we can create updateAddFlashMessageStatus here:
    // const updateAddFlashMessageStatus(statusPassed)
    // setAddFlashMessage(statusPassed)
  }

  const updateAddFlashMessageStatus = (statusPassed) => {
    setAddFlashMessage(statusPassed)
  }

  const removeStock = (id: string) => {
    // TODO: Add API call to remove stock from DB
    setStocksList(prev => prev.filter(stockItem => stockItem.id !== id));

    // TODO: if stock was successfully deleted,
    // setRemoveFlashMessage('success'), if not, set it to 'error'
    // pass removeFlashMessage as props to StocksList and FilteredStocks components,
    // as well as updateRemoveFlashMessageStatus

    // we can create updateRemoveFlashMessageStatus here:
    // const updateRemoveFlashMessageStatus(statusPassed)
    // setRemoveFlashMessage(statusPassed)
  }

  const updateRemoveFlashMessageStatus = (statusPassed) => {
    setRemoveFlashMessage(statusPassed)
  }

  const fetchStocks: () => Stock[] = () => {
    // TODO: retrieve from API, currently hardcoded since backend is in progress
    return [
      {
        id: uuidv4(),
        tiker: "AAPL",
        buyPrice: 250,
        numShares: 5,
        sector: "Tech"
      },
      {
        id: uuidv4(),
        tiker: "AAPL",
        buyPrice: 235,
        numShares: 3,
        sector: "Tech"
      },
      {
        id: uuidv4(),
        tiker: "GOOGL",
        buyPrice: 400,
        numShares: 2,
        sector: "Tech"
      },
      {
        id: uuidv4(),
        tiker: "NZL",
        buyPrice: 100.99,
        numShares: 5,
        sector: "Real Estate"
      },
      {
        id: uuidv4(),
        tiker: "XOM",
        buyPrice: 102,
        numShares: 5,
        sector: "Energy"
      },
      {
        id: uuidv4(),
        tiker: "JPM",
        buyPrice: 93,
        numShares: 10,
        sector: "Finance"
      }
    ]
  };

  return <>
    <Router>
      <CustomNavbar />
      <Switch>
        <div className="container">
          <Route path="/" exact render={() => <Home stocksList={stocksList} />} />
          <Route path="/add" render={() => <StockForm onAdd={addStock} addFlashMessage={addFlashMessage} updateAddFlashMessageStatus={updateAddFlashMessageStatus}/>} /> 
          <Route path="/list" exact render={() => <StocksList stocksList={stocksList} onRemove={removeStock} removeFlashMessage={removeFlashMessage} updateRemoveFlashMessageStatus={updateRemoveFlashMessageStatus}/>} />
          <Route path="/category/:name" render={(props) => <FilteredStocks match={props.match} stocksList={stocksList} onRemove={removeStock} removeFlashMessage={removeFlashMessage} updateRemoveFlashMessageStatus={updateRemoveFlashMessageStatus}/>} />
        </div>
      </Switch>
    </Router>
  </>
}

export default App;
