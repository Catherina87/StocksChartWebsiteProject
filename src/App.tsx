import React, { useState } from 'react';
import { CustomNavbar } from './components/CustomNavbar';
import { StockForm } from './components/StockForm';
import { StocksList } from './components/StocksList';
import Stock from './model/Stock';

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
    <CustomNavbar />
    <div className="container">
      <StockForm onAdd={addStock}/>

      <StocksList stocksList={stocksList} onRemove={removeStock}/>

    </div>
  </>
}

export default App;
