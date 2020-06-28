import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const CustomNavbar = () => (

  <Navbar bg="light" variant="light">
    <Navbar.Brand href="#/">Finance</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/">Log In</Nav.Link>
      <Nav.Link href="/">Dashboard</Nav.Link>
    </Nav>
  </Navbar>
)

