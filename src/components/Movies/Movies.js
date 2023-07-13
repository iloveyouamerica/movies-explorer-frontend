import React, {useEffect, useState} from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import * as myApi from '../../utils/MainApi';

function Movies({ loggedIn }) {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const localMoviesList = JSON.parse(localStorage.getItem('moviesList'));
    const localSavedMoviesList = JSON.parse(localStorage.getItem('savedMovies'));

    // проверяем наличие всех фильмов в localStorage
    // сохранять из API будем только при первом запросе (так по заданию)
    if(localMoviesList !== null) {
      setMoviesList(localMoviesList);
    }

    // проверяем наличие сохранённых фильмов в локальном хранилище
    if(localSavedMoviesList === null) {
      // если в локальном хранилище фильмов нет, сделаем запрос на сервер
      myApi.getSavedMovies()
      .then(data => {
        localStorage.setItem('savedMovies', JSON.stringify(data));
      })
      .catch(err => err);
    } 
  }, []);

  // функция поиска фильмов
  function handleMoviesSearch(movies) {
    setMoviesList(movies);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <SearchForm searchType="globalMovies" onSearch={handleMoviesSearch} moviesList={moviesList} />
        {moviesList.length > 0 && (<MoviesCardList setMoviesCardList={setMoviesList} moviesCardList={moviesList} cardType="like" />)}
      </main>
      <Footer />
    </>
  );
}

export default Movies;