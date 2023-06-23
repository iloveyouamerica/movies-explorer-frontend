import React from 'react';
import './PageNotFound.css'
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <main className="main">
      <section className="not-page">
        <h1 className="not-page__title">404</h1>
        <span className="not-page__message">Страница не найдена</span>
        <Link to="" className="not-page__link-back">Назад</Link>
      </section>
    </main>
  );
}

export default PageNotFound;