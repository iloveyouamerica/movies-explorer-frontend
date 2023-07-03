import React from 'react';
import './PageNotFound.css'
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <main className="main">
      <section className="not-page">
        <div className="not-page__wrapper">
          <h1 className="not-page__title">404</h1>
          <span className="not-page__message">Страница не найдена</span>
        </div>
        <Link to="/" className="not-page__link-back">Назад</Link>
      </section>
    </main>
  );
}

export default PageNotFound;