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
      buyPrice: "250",
      numShares: "10"
    },
    {
      id: 12345678,
      tiker: "GOOG",
      buyPrice: "400",
      numShares: "20"
    },
    {
      id: 123456789,
      tiker: "MSFT",
      buyPrice: "100",
      numShares: "5"
    }
  ]

  const [stocksList, setStocksList] = useState<Stock[]>(stocks);

  const addStock = (stock: Stock) => {
    const newStock: Stock = {
      id: Date.now(),
      tiker: stock.tiker,
      buyPrice: stock.buyPrice,
      numShares: stock.numShares
    }

    console.log("In addStock");

    setStocksList(prev => [newStock, ...prev])
  }

  return <>
    <CustomNavbar />
    <div className="container">
      <StockForm onAdd={addStock}/>

      <StocksList stocksList={stocksList} />

    </div>
  </>
}

export default App;
