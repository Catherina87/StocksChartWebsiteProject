import React, { useState } from 'react';
import { CustomNavbar } from './components/CustomNavbar';
import { StockForm } from './components/StockForm';
import { StocksList } from './components/StocksList';
import Stock from './model/Stock';

const App = () => {

  const [stocksList, setStocksList] = useState<Stock[]>([]);

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
