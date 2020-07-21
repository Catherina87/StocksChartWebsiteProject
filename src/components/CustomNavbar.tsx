import React from 'react'
import { useOktaAuth } from "@okta/okta-react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

export const CustomNavbar = ( { updateUserInfo } ) => {
  const { authState, authService } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  if (authState.accessToken) {
    authService.getUser()
    .then((info) => {
      updateUserInfo(info.sub);
      console.log("USER INFO = ", info);
    })
  }

  const button = authState.isAuthenticated ?
    <Button variant="secondary" onClick={() => { authService.logout(); }}>Log out</Button> :
    <Button variant="secondary" onClick={() => { authService.login(); }}>Log in</Button>;


  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">Stocks Portfolio</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/list">My Stocks</Nav.Link>
      </Nav>
      <Form inline>
        {button}
      </Form>
    </Navbar>
  )
};



