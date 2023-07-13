import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import Preloader from '../Preloader/Preloader';
import getFilm from '../../utils/MoviesApi';
import { SEARCH_FILM_ERROR, EMPTY_SEARCH_FORM } from '../../utils/constants';

function SearchForm(props) {
  // значение поля инпута поиска
  const [searchInputValue, setSearchInputValue] = useState(''); 
  // состояние перключателя короткометражек
  const [shortFilmChecked, setShortFilmChecked] = useState(false);
  // состояние прелоадера
  const [isLoading, setIsLoading] = useState(false);
  // состояние результатов поиска
  const [isNoResults, setIsNoResults] = useState(false);
  // состояние ошибки инпута
  const [searchInputError, setSearchInputError] = useState('');
  // состояние поиска (для блокировки полей формы)
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setSearchInputError('');
  }, [searchInputValue]);

  // если есть сохранённые данные для формы поиска в localStorage
  useEffect(() => {
    const storageSearchMoviesQuery = localStorage.getItem('searchMoviesQuery');
    const storageShortFilmChecked = localStorage.getItem('shortFilmCheckedBtn');
  
    if (storageSearchMoviesQuery && props.searchType === 'globalMovies') {
      // установить состояние инпута поиска
      setSearchInputValue(storageSearchMoviesQuery);
    }
  
    if (storageShortFilmChecked !== null && props.searchType === 'globalMovies') {
      // установить состояние кнопки короткометражек
      setShortFilmChecked(storageShortFilmChecked === 'true');
    }
  }, []);

  useEffect(() => {
    // если ранее мы искали фильмы, значит инфо о них есть и при этом в форму введён поисковый запрос
    // тогда мы переключателем короткометражек мы должны обновлять результаты поиска
    if(props.moviesList.length > 0 && searchInputValue !== '') {
      findFilm();
    }
  }, [shortFilmChecked]);

  // переключение тумблера короткометражек
  function handleTumblerClick() {
    if (shortFilmChecked) {
      setShortFilmChecked(false);
    } else {
      setShortFilmChecked(true);
    }
  }

  // функция фильтрации результатов поиска
  function filterSearchResult(movies) {
    // фильтрация результата поиска
    let filteredMovies = movies.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())
    );

    // в localStorage следует сохранять глобальный результат поиска
    // включая любую длительность фильма
    localStorage.setItem('moviesList', JSON.stringify(filteredMovies));

    // фильтр короткометражек
    if(shortFilmChecked) {
      filteredMovies = filteredMovies.filter(movie => movie.duration < 40)
    }

    // если фильмов по запросу нет
    if (filteredMovies.length === 0) {
      setIsNoResults(true);
    }

    // сохранение данных в локальное хранилище
    localStorage.setItem('searchMoviesQuery', searchInputValue);
    localStorage.setItem('shortFilmCheckedBtn', shortFilmChecked);

    return filteredMovies;
  }

  // функция поиска фильнмов
  function findFilm() {
    if(searchInputValue === '') {
      setSearchInputError(EMPTY_SEARCH_FORM); // Нужно ввести ключевое слово
      // если нет поискового запроса, то и искать нечего, выходим
      return;
    }

    // скрыть "ничего не найдено"
    setIsNoResults(false);
    
    if(props.searchType === 'globalMovies') { // если это глобальный поиск фильмов

      // полный список фильмов из API сохранённый локально
      const allLocalMovies = localStorage.getItem('allLocalMovies');

      if(allLocalMovies === null) { // если нет копии всех фильмов сохранённых локально (по заданию)
        // активировать прелоадер
        setIsLoading(true);
        // заблокируем поля формы
        setIsSearching(true);
        
        // запрос на сервер к БД с фильмами
        getFilm()
          .then((movies) => {
            // установим локаьную копию всех фильмов из API
            localStorage.setItem('allLocalMovies', JSON.stringify(movies));

            // функция фильтрации результата поиска
            const filteredMovies = filterSearchResult(movies);

            // возвращаем фильмы в родительский компонент (Movies/SavedMovies)
            props.onSearch(filteredMovies);
          })
          .catch((err) => {
            setSearchInputError(SEARCH_FILM_ERROR); // ошибка поиска фильмов
          })
          .finally(() => {
            setIsLoading(false);
            setIsSearching(false);
          });
      } else { // если есть сохранённая локальная копия всех фильмов
        // функция фильтрации результата поиска
        const filteredMovies = filterSearchResult(JSON.parse(allLocalMovies));

        // возвращаем фильмы в родительский компонент (Movies/SavedMovies)
        props.onSearch(filteredMovies);
      }

    } else {// если это локальный поиск по сохранённым ранее фильмам
      const movies = JSON.parse(localStorage.getItem('savedMovies'));
      const filteredMovies = filterSearchResult(movies);

      // возвращаем фильмы в родительский компонент (Movies/SavedMovies)
      props.onSearch(filteredMovies);
    }
  }

  // сабмит формы на поиск фильмов
  function handleFormSubmit(event) {
    event.preventDefault();

    // вызываем функцию поиска фильмов
    findFilm();
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
          required 
          disabled={isSearching} />
        <button type="submit" className="search-film__button" disabled={isSearching}>Найти</button>
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