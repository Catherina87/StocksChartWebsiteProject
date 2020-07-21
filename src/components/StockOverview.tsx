import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { match } from 'react-router';
import { Link } from 'react-router-dom';

interface StockOverviewProps {
  match: match<any>
}

const StockOverview = (props: StockOverviewProps) => {

  console.log("from props ", props.match.params.symbol);
  const symbol = props.match.params.symbol

  const [data, setData] = useState({
    symbol: "",
    name: "",
    assetType: "",
    currency: "",
    country: "",
    sector: "",
    industry: "",
    address: "",
    dividendPerShare: "",
    weekHigh52: "",
    weekLow52: "",
    dayMovingAverage50: "",
    description: ""
  });


  useEffect(() => {
    getOverviewFor(symbol);
  },[])

  
  const getOverviewFor = (symbol: string) => {
    const ApiKey = 'KX528B0LJ31J9I0A'
    // axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ApiKey}`)
    // .then(response => {
    //   console.log("RESPONSE ", response);

    //   if (response.data !== undefined || response.data !== {}) {
    //     setData({
    //       symbol: response.data.Symbol,
    //       name: response.data.Name,
    //       assetType: response.data.AssetType,
    //       currency: response.data.Currency,
    //       country: response.data.Country,
    //       sector: response.data.Sector,
    //       industry: response.data.Industry,
    //       address: response.data.Address,
    //       dividendPerShare: response.data.DividendPerShare,
    //       weekHigh52: response.data["52WeekHigh"],
    //       weekLow52: response.data["52WeekLow"],
    //       dayMovingAverage50: response.data["50DayMovingAverage"],
    //       description: response.data.Description
    //     });
    //   }
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }

  return (

  <div className="container mt2">
    <h1 className="display-3 name">{data.name}</h1>
    <ul className="mt2">
      <li className="lead symbol"><strong>Symbol: {data.symbol} </strong></li>
      <li className="lead"><strong>Asset Type:  </strong>{data.assetType}</li>
      <li className="lead"><strong>Currency:  </strong>{data.currency}</li>
      <li className="lead"><strong>Country: </strong>{data.country}</li>
      <li className="lead"><strong>Sector:  </strong>{data.sector}</li>
      <li className="lead"><strong>Industry:  </strong>{data.industry}</li>
      <li className="lead"><strong>Address:  </strong>{data.address}</li>
      <li className="lead"><strong>Dividend per Share:  </strong>{data.dividendPerShare}</li>
      <li className="lead"><strong>52 Week High:  </strong>${data.weekHigh52}</li>
      <li className="lead"><strong>52 Week Low: </strong>${data.weekLow52}</li>
      <li className="lead"><strong>50 Day Moving Average: </strong>${data.dayMovingAverage50}</li>
    </ul>
    <hr className="my-2" />

    <p>{data.description}</p>
    
    <Link to="/list" className="btn btn-outline-info mb2">Back to Stocks List</Link>
  </div>

  )

};

export default StockOverview;
