import React from "react";
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

function Navigation() {

  function handleToggleBurgerMenu() {
    document.querySelector('.navigation-main__overlay').classList.toggle('navigation-main__overlay_closed');
  }

  return (
    <div className="navigation-main">
      <div className="navigation-main__desktop">
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
      <div className="navigation-main__mobile">
        <button
          type="button"
          className="navigation-main__burger-button"
          onClick={handleToggleBurgerMenu}></button>
        <div className="navigation-main__overlay">
          <div className="navigation-main__overlay-item">
            <button
              className="navigation-main__close-overlay-button"
              onClick={handleToggleBurgerMenu}></button>
            <ul className="navigation-main__burger-menu">
              <li className="navigation-main__burger-menu-item">
                <NavLink
                  to="/"
                  className={({isActive}) => `${
                    isActive ?
                    'navigation-main__burger-navlink navigation-main__burger-navlink_active' : 
                    'navigation-main__burger-navlink'}`}>
                  Главная
                </NavLink>
              </li>
              <li className="navigation-main__burger-menu-item">
                <NavLink
                  to="/movies"
                  className={({isActive}) => `${
                    isActive ?
                    'navigation-main__burger-navlink navigation-main__burger-navlink_active' : 
                    'navigation-main__burger-navlink'}`}>
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation-main__burger-menu-item">
                <NavLink
                  to="/saved-movies"
                  className={({isActive}) => `${
                    isActive ?
                    'navigation-main__burger-navlink navigation-main__burger-navlink_active' : 
                    'navigation-main__burger-navlink'}`}>
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
            <Link to="/profile" className="navigation-main__account">
              Аккаунт
              <div className="navigation-main__account-image"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;