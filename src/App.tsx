import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Stock from './model/Stock';

import { Home } from './components/Home';
import { CustomNavbar } from './components/CustomNavbar';
import { StockForm } from './components/StockForm';
import { StocksList } from './components/StocksList';
import { FilteredStocks } from './components/FilteredStocks';
import { StockDetail } from './components/StockDetail'; // might not need this one

import { Test } from './components/Test'; // Remove later
import { TestDetail } from './components/TestDetail'; // Remove later

const App = () => {

  const stocks = [
    {
      id: 1234567,
      tiker: "AAPL",
      buyPrice: 250,
      numShares: 10,
      sector: "Tech"
    },
    {
      id: 12345678,
      tiker: "GOOG",
      buyPrice: 400,
      numShares: 20,
      sector: "Tech"
    },
    {
      id: 123456789,
      tiker: "MSFT",
      buyPrice: 100.99,
      numShares: 5,
      sector: "Tech"
    },
    {
      id: 1234567891,
      tiker: "GENM",
      buyPrice: 102,
      numShares: 5,
      sector: "Energy"
    }
  ]

  const [stocksList, setStocksList] = useState<Stock[]>(stocks);

  const addStock = (stock: Stock) => {
    const newStock: Stock = {
      id: Date.now(),
      tiker: stock.tiker,
      buyPrice: stock.buyPrice,
      numShares: stock.numShares,
      sector: stock.sector
    }

    setStocksList(prev => [newStock, ...prev])
  }

  const removeStock = (id: number) => {
    setStocksList(prev => prev.filter(stockItem => stockItem.id !== id));
  }

  return <>
    <Router>
      <CustomNavbar />
      <Switch>
        <div className="container">
          <Route path="/" exact render={() => <Home />} />
          <Route path="/add" render={() => <StockForm onAdd={addStock} />} />
          <Route path="/list" exact render={() => <StocksList stocksList={stocksList}  onRemove={removeStock} />} />
          <Route path="/test" exact render={() => <Test />} />
          <Route path="/test/:id" component={TestDetail} />
          <Route path="/list/:id" component={StockDetail} />
          <Route path="/category/:name" render={(props) => <FilteredStocks match={props.match} stocksList={stocksList}  onRemove={removeStock} />} />
        </div>
      </Switch>
    </Router>
  </>
}

export default App;
