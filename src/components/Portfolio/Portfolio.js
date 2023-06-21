import React from 'react';
import './Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <Link to="" target="_blank" className="portfolio__link">Статичный сайт</Link>
      <Link to="" target="_blank" className="portfolio__link">Адаптивный сайт</Link>
      <Link to="" target="_blank" className="portfolio__link">Одностраничное приложение</Link>
    </section>
  );
}

export default Portfolio;