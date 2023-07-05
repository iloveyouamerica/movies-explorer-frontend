import React, {useEffect, useState} from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  // const localMoviesList = JSON.parse(localStorage.getItem('moviesList'));
  /* console.log(`lc: ${mv}`);
  console.log(`search: ${moviesList}`); */

  useEffect(() => {
    // Проверяем наличие данных в localStorage
    const localMoviesList = JSON.parse(localStorage.getItem('moviesList'));

    if (localMoviesList && localMoviesList.length > 0) {
      // Если данные есть, устанавливаем их в состояние moviesList
      setMoviesList(localMoviesList);
    }
  }, []);

  function handleMoviesSearch(movies) {
    setMoviesList(movies);
  }

  return (
    <>
      <Header />
      <main className="main">
        <SearchForm onSearch={handleMoviesSearch} />
        {/* {moviesList.length > 0 && (<MoviesCardList moviesCardList={moviesList} cardType={"like"} />)} */}
        {moviesList.length > 0 && (<MoviesCardList moviesCardList={moviesList} cardType="like" />)}
      </main>
      <Footer />
    </>
  );
}

export default Movies;