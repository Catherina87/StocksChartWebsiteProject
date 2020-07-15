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

  const [flashMessage, setFlashMessage] = useState('none');

  useEffect(() => {
    fetchStocks();
    console.log("Im called");
  }, []);

  const addStock = (stock: Stock) => {
    // TODO: Change hardcoded userId once authentication is done
    // axios.post(`${BASE_URL}stock/create`, {
    //   userId: "678",
    //   stock: stock
    // })
    //   .then((response) => {
    //     console.log(response);
    //     setStocksList(prev => [stock, ...prev]);
    //     setFlashMessage('success');
    //   })
    //   .catch((error) => {
    //     console.log("Error occured:", error);
    //     setFlashMessage('error');
    //   })

      setStocksList(prev => [stock, ...prev]);
      setFlashMessage('success');
  }

  const updateFlashMessageStatus = (statusPassed) => {
    setFlashMessage(statusPassed)
  }

  const removeStock = (id: string) => {
    // TODO: Add API call to remove stock from DB
    // axios.post(`${BASE_URL}stock/delete`, {
    //   userId: "678",
    //   tradeId: id 
    // })
    //   .then(response => {
    //     console.log(response);
    //     setStocksList(prev => prev.filter(stockItem => stockItem.tradeId !== id));
    //     setFlashMessage('success');
    //   })
    //   .catch(error => {
    //     console.log("Error occured:", error);
    //     setFlashMessage('error');
    //   })

        setStocksList(prev => prev.filter(stockItem => stockItem.tradeId !== id));
        setFlashMessage('success');
  }

  const fetchStocks = () => {
      // TODO: Change hardcoded userId once authentication is done
    // axios.post(`${BASE_URL}stock/list`, {
    //   userId: "678"
    // })
    //   .then(response => {
    //     console.log(response);
    //     const listOfStocks = response.data.items;
    //     setStocksList(listOfStocks);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

    setStocksList(
      [
        {
          tradeId: uuidv4(),
          ticker: "AAPL",
          price: 250,
          count: 5,
          sector: "Tech"
        },
        {
          tradeId: uuidv4(),
          ticker: "AAPL",
          price: 235,
          count: 3,
          sector: "Tech"
        },
        {
          tradeId: uuidv4(),
          ticker: "GOOGL",
          price: 400,
          count: 2,
          sector: "Tech"
        },
        {
          tradeId: uuidv4(),
          ticker: "NZL",
          price: 100.99,
          count: 5,
          sector: "Real Estate"
        },
        {
          tradeId: uuidv4(),
          ticker: "XOM",
          price: 102,
          count: 5,
          sector: "Energy"
        },
        {
          tradeId: uuidv4(),
          ticker: "JPM",
          price: 93,
          count: 10,
          sector: "Finance"
        }
      ]
    );
  };

  return <>
    <Router>
      <CustomNavbar />
      <Switch>
        <div className="container">
          <Route path="/" exact render={() => <Home stocksList={stocksList} />} />
          <Route path="/add" render={() => <StockForm onAdd={addStock} flashMessage={flashMessage} updateFlashMessage={updateFlashMessageStatus}/>} /> 
          <Route path="/list" exact render={() => <StocksList stocksList={stocksList} onRemove={removeStock} flashMessage={flashMessage} updateFlashMessage={updateFlashMessageStatus}/>} />
          <Route path="/category/:name" render={(props) => <FilteredStocks match={props.match} stocksList={stocksList} onRemove={removeStock} flashMessage={flashMessage} updateFlashMessage={updateFlashMessageStatus}/>} />
        </div>
      </Switch>
    </Router>
  </>
}

export default App;
