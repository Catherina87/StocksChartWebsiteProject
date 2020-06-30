import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom'

interface IStockDetailProps extends RouteComponentProps<{ id: string }>{
  id: string
}

export const StockDetail: React.FC<IStockDetailProps> = (props) => {

  useEffect(() => {
    fetchItem();
    console.log(props.match);
  },[]);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    console.log('HELLO')
    const fetchItem = await fetch(
      `http://localhost:3000/list/${props.match.params.id}`
    );
    const retrievedItem = await fetchItem.json();
    setItem(retrievedItem);
    console.log(retrievedItem);
    console.log(item['tiker'])
    console.log('BYYEEE')
  }



  return (
    <div>
      <ul>
        <li>Tiker: {props.match.params.id}</li>
        <li>Buy Price: </li>
        <li>Number of Shares: </li>
        <li>Sector: </li>
      </ul>
    </div>
  )
}