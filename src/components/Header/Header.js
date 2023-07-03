import React from "react";
import './Header.css';
import { useLocation } from 'react-router-dom';
import Logo from "../Logo/Logo";
import NavigationAuth from "../NavigationAuth/NavigationAuth";
import Navigation from "../Navigation/Navigation";

function Header() {
  // получаем текущий путь с помощью хука
  const location = useLocation();

  // проверяем является ли текущий путь главной страницей
  const isHomePage = location.pathname === '/';

  return (
    <header className={`header ${isHomePage ? 'header_background-main' : ''}`}>
      <Logo />
      <nav className="header__navigation">
        {isHomePage ? <NavigationAuth /> : <Navigation />}
      </nav>
    </header>
  );
}

export default Header;
