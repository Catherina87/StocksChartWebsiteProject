import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import isEmpty from "lodash/isEmpty";

import axios from 'axios';

import Stock from './model/Stock';

import { v4 as uuidv4 } from 'uuid';

import LandingPape from './components/LandingPage';
import Login from './components/Login';
import { Home } from './components/Home';
import { CustomNavbar } from './components/CustomNavbar';
import { StockForm } from './components/StockForm';
import { StocksList } from './components/StocksList';
import { FilteredStocks } from './components/FilteredStocks';
import StockOverview from './components/StockOverview';

const BASE_URL = "https://ou4tttbv6a.execute-api.us-west-2.amazonaws.com/prod/"

const AppWithRouterAccess = () => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState<string>("");

  const updateUserInfo = (uniqId: string) => {
    setUserInfo(uniqId);
    console.log("Passed USER ID IS: ", uniqId);
  }

  const baseDomain = 'https://dev-783003.okta.com'
  const issuer = baseDomain + "/oauth2/default";
  // const clientId = '0oalkvobaecoqFZ5n4x6'
  // const redirect = "http://localhost:3000/implicit/callback"

  const clientId = '0oal9hy0g0Vy4FDpB4x6'
  const redirect = "http://stocks-portfolio-project-project.s3-website-us-west-2.amazonaws.com/implicit/callback";

  // const [userId, setUserId] = useState<string>("");
  const [stocksList, setStocksList] = useState<Stock[]>([]);

  const [flashMessage, setFlashMessage] = useState('none');

  useEffect(() => {
    // let userIdFetched = "";
    // const userData = JSON.parse(localStorage.getItem("okta-token-storage") || "{}");
    // userIdFetched = userData?.idToken?.claims?.idp || "";
    // console.log("Current user id fetched is ", userIdFetched);

    // if (!isEmpty(userIdFetched)) {
    //   setUserId(userIdFetched);
    //   // fetchStocks(userIdFetched);
    //   // fetchStocks("678");
    // }


    if (!isEmpty(userInfo)) {
      console.log("USER INFO IN useEffect = ", userInfo);
      fetchStocks(userInfo!);
    } else {
      console.log("USER INFO in useEffect is empty")
    }
  }, [userInfo]);

  const addStock = (stock: Stock) => {
    if (isEmpty(userInfo)) {
      console.error("No user id found for addStock.");
      return;
    }

    // TODO: Change hardcoded userId once authentication is done
    axios.post(`${BASE_URL}stock/create`, {
      userId: userInfo,
      stock: stock
    })
      .then((response) => {
        console.log(response);
        setStocksList(prev => [stock, ...prev]);
        setFlashMessage('success');
      })
      .catch((error) => {
        console.log("Error occured:", error);
        setFlashMessage('error');
      })

    // setStocksList(prev => [stock, ...prev]);
    // setFlashMessage('success');
  }

  const updateFlashMessageStatus = (statusPassed) => {
    setFlashMessage(statusPassed)
  }

  const removeStock = (id: string) => {
    if (isEmpty(userInfo)) {
      console.error("No user id found for removeStock.");
      return;
    }

    // TODO: Add API call to remove stock from DB
    axios.post(`${BASE_URL}stock/delete`, {
      userId: userInfo,
      tradeId: id
    })
      .then(response => {
        console.log(response);
        setStocksList(prev => prev.filter(stockItem => stockItem.tradeId !== id));
        setFlashMessage('success');
      })
      .catch(error => {
        console.log("Error occured:", error);
        setFlashMessage('error');
      })

    // setStocksList(prev => prev.filter(stockItem => stockItem.tradeId !== id));
    // setFlashMessage('success');
  }

  const fetchStocks = (fetchedUserId: string) => {
    if (isEmpty(fetchedUserId)) {
      console.error("No user id found for fetchStocks.");
      return;
    }

    // TODO: Change hardcoded userId once authentication is done
    axios.post(`${BASE_URL}stock/list`, {
      userId: fetchedUserId
    })
      .then(response => {
        console.log(response);
        const listOfStocks = response.data.items;
        setStocksList(listOfStocks);
      })
      .catch(error => {
        console.log(error);
        setFlashMessage('error');
      })

    // setStocksList(
    //   [
    //     {
    //       tradeId: uuidv4(),
    //       ticker: "AAPL",
    //       price: 250,
    //       count: 5,
    //       sector: "Tech"
    //     },
    //     {
    //       tradeId: uuidv4(),
    //       ticker: "AAPL",
    //       price: 235,
    //       count: 3,
    //       sector: "Tech"
    //     },
    //     {
    //       tradeId: uuidv4(),
    //       ticker: "GOOGL",
    //       price: 400,
    //       count: 2,
    //       sector: "Tech"
    //     },
    //     {
    //       tradeId: uuidv4(),
    //       ticker: "NZL",
    //       price: 100.99,
    //       count: 5,
    //       sector: "Real Estate"
    //     },
    //     {
    //       tradeId: uuidv4(),
    //       ticker: "XOM",
    //       price: 102,
    //       count: 5,
    //       sector: "Energy"
    //     },
    //     {
    //       tradeId: uuidv4(),
    //       ticker: "JPM",
    //       price: 93,
    //       count: 10,
    //       sector: "Finance"
    //     }
    //   ]
    // );
  };

  const HomePage = () => (
    <Home
      stocksList={stocksList}
      flashMessage={flashMessage}
      updateFlashMessage={updateFlashMessageStatus}
    />
  );

  const StockFormPage = () => (
    <StockForm
      onAdd={addStock}
      flashMessage={flashMessage}
      updateFlashMessage={updateFlashMessageStatus}
    />
  )

  const StocksListPage = () => (
    <StocksList
      stocksList={stocksList}
      onRemove={removeStock}
      flashMessage={flashMessage}
      updateFlashMessage={updateFlashMessageStatus}
    />
  )

  const FilteredStocksPage = (props) => (
    <FilteredStocks
      match={props.match}
      stocksList={stocksList}
      onRemove={removeStock}
      flashMessage={flashMessage}
      updateFlashMessage={updateFlashMessageStatus}
    />
  )

  const StockOverviewPage = (props) => (
    <StockOverview
      match={props.match}
    />
  )


  return (
    <Security
      issuer={issuer}
      clientId={clientId}
      redirectUri={redirect}
      onAuthRequired={() => history.push("/login")}
      pkce={false}
    >
      <div className="container">
        <CustomNavbar updateUserInfo={updateUserInfo} />
        <SecureRoute path="/home" exact component={HomePage} />
        <SecureRoute path="/add" exact component={StockFormPage} />
        <SecureRoute path="/list" exact component={StocksListPage} />
        <SecureRoute path="/category/:name" exact component={FilteredStocksPage} />

        <Route path="/" exact={true} component={LandingPape} />
        <Route path='/login' render={() => (<Login baseUrl={baseDomain} issuer={issuer} />)} />
        <Route path='/implicit/callback' component={LoginCallback} />
        <Route path="/overview/:symbol" exact={true} component={StockOverviewPage} />
      </div>
    </Security>
  )
};

export default AppWithRouterAccess;
