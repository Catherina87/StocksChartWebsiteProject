import React from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useOktaAuth } from "@okta/okta-react";
import { Container } from "react-bootstrap";

const Login = ( { baseUrl, issuer } ) => {
  const { authState } = useOktaAuth();

  if ( authState.isPending ) {
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: "/" }} /> :

    <Container className="jumbotron mt2">
      <br></br>
      <h4 className="mb2">Please Login with your Okta Account</h4>
      <LoginForm baseUrl={baseUrl} issuer={issuer} />
      <br></br>
    </Container>;
};

export default Login;