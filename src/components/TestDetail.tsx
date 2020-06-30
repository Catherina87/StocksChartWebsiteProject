import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface ITestDetailProps extends RouteComponentProps<{ id: string }>{
  id: string
}

export const TestDetail: React.FC<ITestDetailProps> = (props) => {

  useEffect(() => {
    fetchItem();
    console.log(props.match);
  },[]);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    const fetchItem = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${props.match.params.id}`
    );
    const retrievedItem = await fetchItem.json();
    setItem(retrievedItem);
    console.log(retrievedItem);
  }


  return (
    <div>
      <h1>Title: {item['title']}</h1>
      <p>Completed: {item['completed'] ? 'TRUE' : 'FALSE'}</p>
      <p>id: {item['id']}</p>
    </div>
  )
}

