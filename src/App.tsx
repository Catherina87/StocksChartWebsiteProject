import React, { useState } from 'react';
import { CustomNavbar } from './components/CustomNavbar';
import { StockForm } from './components/StockForm';
import { StocksList } from './components/StocksList';
import { Test } from './components/Test'; // Remove later
import { TestDetail } from './components/TestDetail'; // Remove later
import Stock from './model/Stock';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StockDetail } from './components/StockDetail';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from './image1.jpg';

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

    console.log("In addStock");

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
        </div>
      </Switch>
    </Router>
    
  </>
}


const Home = () => {

  const categories = ['Tech', 'Finance', 'Bonds', 'Real Etate', 'Energy']

  return (
    <div>
    <h1>Home Page</h1>
    <div className="d-flex flex-row">
      <div className="col-md-6 text-center">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, in!</p>
        <img src={Image} className="img-fluid" alt="Responsive image"></img>
      </div>

      <div className="col-md-6 text-center">
        <h3>Industry Sectors</h3>
        <ListGroup className="mt2">
        {categories.map(category => {
          return (
            <ListGroup.Item> 
              <div className="category-item">
                <div>
                  {category} 
                </div>
                <div>
                %
                </div>
              </div>
              
             
              
              
            </ListGroup.Item>
          )
      })}
        </ListGroup>
      </div>
     
    </div>
  </div>
  );
}



export default App;
