import React from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useOktaAuth } from "@okta/okta-react";
import { Container } from "react-bootstrap";

const Login = ( { baseUrl, issuer, setUser } ) => {
  const { authState } = useOktaAuth();

  if ( authState.isPending ) {
    return <div>Loading...</div>;
  }

  if (authState.isAuthenticated) {
    const userData = JSON.parse(localStorage.getItem("okta-token-storage") || "{}");
    const userIdFetched = userData?.idToken?.claims?.idp || "";
    setUser(userIdFetched);

    console.log("Current user id fetched is ", userIdFetched);
  }



  return authState.isAuthenticated ?
    <Redirect to={{ pathname: "/" }} /> :

    <Container className="cont">
      <br></br>
      <h4>Please Login with your Okta Account</h4>
      <LoginForm baseUrl={baseUrl} issuer={issuer} />
      <br></br>
    </Container>;
};

export default Login;