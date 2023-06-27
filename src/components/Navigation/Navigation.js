import React from "react";
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation-main">
      <ul className="navigation-main__menu">
        <li className="navigation-main__menu-item">
          <Link to="/movies" className="navigation-main__menu-link">Фильмы</Link>
        </li>
        <li className="navigation-main__menu-item">
          <Link to="/saved-movies" className="navigation-main__menu-link">Сохранённые фильмы</Link>
        </li>
      </ul>
      <Link to="/profile" className="navigation-main__account">
        Аккаунт
        <div className="navigation-main__account-image"></div>
      </Link>
    </div>
  );
}

export default Navigation;