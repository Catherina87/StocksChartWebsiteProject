import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Stock from './model/Stock';

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
    fetchStocks();
    console.log("Im called");
  }, []);

  const addStock = (stock: Stock) => {
    // TODO: Change hardcoded userId once authentication is done
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
    axios.post(`${BASE_URL}stock/delete`, {
      userId: "678",
      tradeId: id 
    })
      .then(response => {
        console.log(response);
        setStocksList(prev => prev.filter(stockItem => stockItem.tradeId !== id));
        setRemoveFlashMessage('success');
      })
      .catch(error => {
        console.log("Error occured:", error);
        setRemoveFlashMessage('error');
      })

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

  const fetchStocks = () => {
      // TODO: Change hardcoded userId once authentication is done
    axios.post(`${BASE_URL}stock/list`, {
      userId: "678"
    })
      .then(response => {
        console.log(response);
        const listOfStocks = response.data.items;
        setStocksList(listOfStocks);
      })
      .catch(error => {
        console.log(error);
      })
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
