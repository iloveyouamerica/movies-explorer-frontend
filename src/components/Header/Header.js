import React from "react";
import './Header.css';
import Logo from "../Logo/Logo";
import NavigationAuth from "../NavigationAuth/NavigationAuth";

function Header() {
  return (
    <header className="header">
      <Logo />
      <nav className="header__navigation">
        <NavigationAuth />
      </nav>
    </header>
  );
}

export default Header;