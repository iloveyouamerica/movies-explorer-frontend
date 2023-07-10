import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import * as myApi from '../../utils/MainApi';

function SavedMovies({ loggedIn }) {
  // нужно сформировать moviesCardList - это сохранённые фильмы, скорее всего нужно обратиться к серверу
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  useEffect(() => {
    myApi.getSavedMovies()
      .then(data => {
        // поменять состояние savedMoviesList
        setSavedMoviesList(data);
        // сохранить в localStorage
        localStorage.setItem('savedMovies', JSON.stringify(data));
      })
      .catch(err => err);
  }, []);

  // функция поиска фильмов
  function handleMoviesSearch(movies) {
    setSavedMoviesList(movies);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <SearchForm onSearch={handleMoviesSearch}/>
        <MoviesCardList setMoviesCardList={setSavedMoviesList} moviesCardList={savedMoviesList} cardType={"delete"} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;