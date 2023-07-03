import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import moviesCardList from '../../utils/moviesList'; // карточки фильмов (имитация БД)

function SavedMovies() {
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />
        <MoviesCardList moviesCardList={moviesCardList} cardType={"delete"} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;