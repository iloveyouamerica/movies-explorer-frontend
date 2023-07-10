import React, {useEffect, useState} from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ loggedIn }) {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    // Проверяем наличие данных в localStorage
    const localMoviesList = JSON.parse(localStorage.getItem('moviesList'));

    if (localMoviesList && localMoviesList.length > 0) {
      // Если данные есть, устанавливаем их в состояние moviesList
      setMoviesList(localMoviesList);
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
        <SearchForm searchType="globalMovies" onSearch={handleMoviesSearch} />
        {moviesList.length > 0 && (<MoviesCardList setMoviesCardList={setMoviesList} moviesCardList={moviesList} cardType="like" />)}
      </main>
      <Footer />
    </>
  );
}

export default Movies;