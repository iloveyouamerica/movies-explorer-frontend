import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import Preloader from '../Preloader/Preloader';
import getFilm from '../../utils/MoviesApi';

function SearchForm({ searchType, onSearch }) {
  // значение поля инпута поиска
  const [searchInputValue, setSearchInputValue] = useState(''); 
  // состояние перключателя короткометражек
  const [shortFilmChecked, setShortFilmChecked] = useState(true);
  // состояние прелоадера
  const [isLoading, setIsLoading] = useState(false);
  // состояние результатов поиска
  const [isNoResults, setIsNoResults] = useState(false);
  // состояние ошибки инпута
  const [searchInputError, setSearchInputError] = useState('');

  useEffect(() => {
    setSearchInputError('');
  }, [searchInputValue]);

  // если есть сохранённые данные для формы поиска в localStorage
  useEffect(() => {
    const storageSearchMoviesQuery = localStorage.getItem('searchMoviesQuery');
    const storageShortFilmChecked = localStorage.getItem('shortFilmCheckedBtn');
  
    if (storageSearchMoviesQuery && searchType === 'globalMovies') {
      // установить состояние инпута поиска
      setSearchInputValue(storageSearchMoviesQuery);
    }
  
    if (storageShortFilmChecked !== null && searchType === 'globalMovies') {
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

  // фильтр результатов поиска
  function filterSearchResult(movies) {
    // фильтрация результата поиска
    let filteredMovies = movies.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())
    );

    // фильтр короткометражек
    if(shortFilmChecked) {
      filteredMovies = filteredMovies.filter(movie => movie.duration < 40)
    }

    // если фильмов по запросу нет
    if (filteredMovies.length === 0) {
      setIsNoResults(true);
    }

    return filteredMovies;
  }

  // сабмит формы
  function handleFormSubmit(event) {
    event.preventDefault();

    if(searchInputValue === '') {
      setSearchInputError('Нужно ввести ключевое слово');
    }

    // скрыть "ничего не найдено"
    setIsNoResults(false);

    if(searchType === 'globalMovies') { // если это глбальный поиск фильмов
      // активировать прелоадер
      setIsLoading(true);

      // запрос на сервер к БД с фильмами
      getFilm()
        .then((movies) => {
          const filteredMovies = filterSearchResult(movies);

          // возвращаем фильмы в родительский компонент Movies
          onSearch(filteredMovies);
          
          // сохранение данных в локальное хранилище
          localStorage.setItem('searchMoviesQuery', searchInputValue);
          localStorage.setItem('moviesList', JSON.stringify(filteredMovies));
          localStorage.setItem('shortFilmCheckedBtn', shortFilmChecked);
        })
        .catch((err) => {
          setSearchInputError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else { // если это локальный поиск по сохранённым ранее фильмам
      const movies = JSON.parse(localStorage.getItem('savedMovies'));
      const filteredMovies = filterSearchResult(movies);

      // возвращаем фильмы в родительский компонент Movies
      onSearch(filteredMovies);
    }
  }

  // управляемый инпут поиска
  function handleSearchInputChange(event) {
    const formInput = event.target;
    setSearchInputValue(formInput.value);
    if(formInput.validity.valid) {
      // очистка поля с инфомацией об ошибке
      setSearchInputError('');
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
      <span className="search-film__form-error">{searchInputError}</span>
      <div className="search-film__filter-wrapper">
        <button
          type="button"
          className={`search-film__filter-tumbler ${shortFilmChecked ? '' : 'search-film__filter-tumbler_off'}`}
          onClick={handleTumblerClick}></button>
        <span className="search-film__filter-title">Короткометражки</span>
      </div>
      {isLoading && (<Preloader />)}
      {isNoResults && (<p className="search-film__noresult">Ничего не найдено</p>)}
    </section>
  );
}

export default SearchForm;