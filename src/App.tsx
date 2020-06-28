import React from 'react';
import { CustomNavbar } from './components/CustomNavbar';
import { StockForm } from './components/StockForm';

const App = () => {
  return <>
    <CustomNavbar />
    <div className="container">
      
      <StockForm />

    </div>
  </>
}

export default App;
