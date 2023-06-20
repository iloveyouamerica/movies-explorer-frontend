import React from "react";
import { Link } from "react-router-dom";
import './NavigationAuth.css';

function NavigationAuth() {
  return (
    <ul className="navigation-auth">
      <li className="navigation-auth__item">
        <Link to="signup" className="navigation-auth__link">Регистрация</Link>
      </li>
      <li className="navigation-auth__item">
        <Link to="signin" className="navigation-auth__link navigation-auth__link_style-button">Войти</Link>
      </li>
    </ul>
  );
}

export default NavigationAuth;