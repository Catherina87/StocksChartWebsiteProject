import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Stock from './model/Stock';

import { v4 as uuidv4 } from 'uuid';

import { Home } from './components/Home';
import { CustomNavbar } from './components/CustomNavbar';
import { StockForm } from './components/StockForm';
import { StocksList } from './components/StocksList';
import { FilteredStocks } from './components/FilteredStocks';

const BASE_URL = "https://ou4tttbv6a.execute-api.us-west-2.amazonaws.com/prod/"

const App = () => {

  const [stocksList, setStocksList] = useState<Stock[]>([]);

  const [addFlashMessage, setAddFlashMessage] = useState('none');
  const [removeFlashMessage, setRemoveFlashMessage] = useState('none');

  useEffect(() => {
    const retrievedStocks: Stock[] = fetchStocks();

    setStocksList(retrievedStocks);
  }, []);

  const addStock = (stock: Stock) => {
    // TODO: Add API call to add stock to DB - DONE!
    axios.post(`${BASE_URL}stock/create`, {
      userId: "678",
      stock: stock
    })
      .then((response) => {
        console.log(response);
        setStocksList(prev => [stock, ...prev]);
        setAddFlashMessage('success');
      })
      .catch((error) => {
        console.log("Error occured:", error);
        setAddFlashMessage('error');
      })
  }

  const updateAddFlashMessageStatus = (statusPassed) => {
    setAddFlashMessage(statusPassed)
  }

  const removeStock = (id: string) => {
    // TODO: Add API call to remove stock from DB
    setStocksList(prev => prev.filter(stockItem => stockItem.tradeId !== id));

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
        tradeId: uuidv4(),
        tiker: "AAPL",
        price: 250,
        count: 5,
        sector: "Tech"
      },
      {
        tradeId: uuidv4(),
        tiker: "AAPL",
        price: 235,
        count: 3,
        sector: "Tech"
      },
      {
        tradeId: uuidv4(),
        tiker: "GOOGL",
        price: 400,
        count: 2,
        sector: "Tech"
      },
      {
        tradeId: uuidv4(),
        tiker: "NZL",
        price: 100.99,
        count: 5,
        sector: "Real Estate"
      },
      {
        tradeId: uuidv4(),
        tiker: "XOM",
        price: 102,
        count: 5,
        sector: "Energy"
      },
      {
        tradeId: uuidv4(),
        tiker: "JPM",
        price: 93,
        count: 10,
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
