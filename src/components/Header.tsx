import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        RandomUsers
      </Link>
      <menu className="header-menu">
        <NavLink className="menu-link" to="/">
          Home
        </NavLink>
        <NavLink className="menu-link" to="/about">
          About
        </NavLink>
      </menu>
    </header>
  );
}

export default Header;
