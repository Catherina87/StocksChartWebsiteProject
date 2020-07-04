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

  useEffect(() => {
    const retrievedStocks: Stock[] = fetchStocks();

    setStocksList(retrievedStocks);
  }, []);

  const addStock = (stock: Stock) => {
    // TODO: Add API call to add stock to DB
    setStocksList(prev => [stock, ...prev])
  }

  const removeStock = (id: string) => {
    // TODO: Add API call to remove stock from DB
    setStocksList(prev => prev.filter(stockItem => stockItem.id !== id));
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
          <Route path="/add" render={() => <StockForm onAdd={addStock} />} />
          <Route path="/list" exact render={() => <StocksList stocksList={stocksList}  onRemove={removeStock} />} />
          <Route path="/category/:name" render={(props) => <FilteredStocks match={props.match} stocksList={stocksList}  onRemove={removeStock} />} />
        </div>
      </Switch>
    </Router>
  </>
}

export default App;
