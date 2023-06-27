import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesCardList from '../../utils/moviesList'; // карточки фильмов (имитация БД)

function Movies() {
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />
        <MoviesCardList moviesCardList={moviesCardList} cardType={"like"} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;