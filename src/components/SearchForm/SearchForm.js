import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import getFilm from '../../utils/MoviesApi';

function SearchForm({ onSearch }) {
  // значение поля инпута поиска
  const [searchInputValue, setSearchInputValue] = useState(''); 
  // перключатель короткометражек
  const [shortFilmChecked, setShortFilmChecked] = useState(true);

  useEffect(() => {
    const storageSearchMoviesQuery = localStorage.getItem('searchMoviesQuery');
    const storageShortFilmChecked = localStorage.getItem('shortFilmCheckedBtn');
  
    if (storageSearchMoviesQuery) {
      // установить состояние инпута поиска
      setSearchInputValue(storageSearchMoviesQuery);
    }
  
    if (storageShortFilmChecked !== null) {
      // установить состояние кнопки короткометражек
      setShortFilmChecked(storageShortFilmChecked === 'true');
    }
  }, []);

  // переключение тумблера короткометражек
  function handleTumblerClick(event) {
    const tumbler = event.target;

    if (shortFilmChecked) {
      tumbler.classList.remove('search-film__filter-tumbler_off');
      setShortFilmChecked(false);
    } else {
      tumbler.classList.add('search-film__filter-tumbler_off');
      setShortFilmChecked(true);
    }
  }

  // сабмит формы
  function handleFormSubmit(event) {
    event.preventDefault();

    const searchInput = document.querySelector('.search-film__input');
    const searchErrorSpan = document.querySelector('.search-film__form-error');

    if(searchInput.value === '') {
      searchErrorSpan.textContent = 'Нужно ввести ключевое слово';
      return;
    }

    // запрос на сервер к БД с фильмами
    getFilm()
      .then((movies) => {

        // фильтрация результата поиска
        let filteredMovies = movies.filter(movie =>
          movie.nameRU.toLowerCase().includes(searchInput.value.toLowerCase())
        );

        if(shortFilmChecked) {
          filteredMovies = filteredMovies.filter(movie => movie.duration < 40)
        }

        onSearch(filteredMovies); // возвращаем фильмы в родительский компонент
        
        // сохранение данных в локальное хранилище
        localStorage.setItem('searchMoviesQuery', searchInputValue);
        localStorage.setItem('moviesList', JSON.stringify(filteredMovies));
        localStorage.setItem('shortFilmCheckedBtn', shortFilmChecked);
      })
      .catch((err) => {
        searchErrorSpan.textContent = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
        console.log(err);
      });
  }

  // управляемый инпут поиска
  function handleSearchInputChange(event) {
    const formInput = event.target;
    setSearchInputValue(formInput.value);
    if(formInput.validity.valid) {
      // очистка поля с инфомацией об ошибке
      document.querySelector('.search-film__form-error').textContent = '';
    }
  }

  return (
    <section className="search-film">
      <form action="#" method="POST" className="search-film__form" onSubmit={handleFormSubmit} noValidate>
        <input
          type="text"
          name="film-name"
          className="search-film__input"
          placeholder="Фильм"
          onChange={handleSearchInputChange}
          value={searchInputValue}
          minLength={2}
          required />
        <button type="submit" className="search-film__button">Найти</button>
      </form>
      <span className="search-film__form-error"></span>
      <div className="search-film__filter-wrapper">
      <button
        type="button"
        className={`search-film__filter-tumbler ${shortFilmChecked ? '' : 'search-film__filter-tumbler_off'}`}
        onClick={handleTumblerClick}></button>
        <span className="search-film__filter-title">Короткометражки</span>
      </div>
    </section>
  );
}

export default SearchForm;