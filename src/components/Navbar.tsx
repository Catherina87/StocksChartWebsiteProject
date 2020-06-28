import React from 'react'

export const Navbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper blue-grey darken-2 px1">
      <a href="/" className="brand-logo">React + TypeScript</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="/">Log In</a></li>
        <li><a href="/">Dashboard</a></li>
      </ul>
    </div>
  </nav>
)

