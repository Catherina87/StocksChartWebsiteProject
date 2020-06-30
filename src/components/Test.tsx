import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export const Test = () => {

  useEffect(() => {
    fetchItems();
  },[]);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {

    try {
      const data = await fetch(
        'https://jsonplaceholder.typicode.com/todos/'
      );
      const retrievedItems = await data.json();
      console.log(retrievedItems);
      setItems(retrievedItems)
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      {items.map(item => (
        <h3>
          <Link to={`/test/${item['id']}`}>{item['title']}</Link>
        </h3>
      ))}
    </div>
  )
}