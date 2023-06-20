import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import NavigationAuth from "../NavigationAuth/NavigationAuth";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      <nav className="header__navigation">
        <NavigationAuth />
      </nav>
    </header>
  );
}

export default Header;