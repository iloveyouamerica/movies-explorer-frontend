import React from 'react';
import './SearchForm.css';

function SearchForm() {

  // переключение тумблера короткометражек
  function handleTumblerClick(event) {
    const tumbler = event.target;
    tumbler.classList.toggle('search-film__filter-tumbler_off');
  }

  return (
    <section className="search-film">
      <form action="#" method="POST" className="search-film__form">
        <input type="text" name="film-name" className="search-film__input" placeholder="Фильм" required />
        <button type="submit" className="search-film__button">Найти</button>
      </form>
      <div className="search-film__filter-wrapper">
        <button
          type="button"
          className="search-film__filter-tumbler"
          onClick={handleTumblerClick}></button>
        <span className="search-film__filter-title">Короткометражки</span>
      </div>
    </section>
  );
}

export default SearchForm;