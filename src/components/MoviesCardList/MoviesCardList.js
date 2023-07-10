import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import durationFormat from '../../utils/durationFormat';
import * as myApi from '../../utils/MainApi';

function MoviesCardList(props) {
  // начальное количество карточек на странице
  const [moviesCardCount, setMoviesCardCount] = useState(getCountCardForWidthScren().cardStart);

  // функция определени количества карточек в зависимости от ширины экрана
  function getCountCardForWidthScren() {
    const screenWidth = window.innerWidth;

    if(screenWidth >= 1280) {
      return {cardStart: 12, moreBtn: 4};
    } else if(screenWidth >= 768) {
      return {cardStart: 8, moreBtn: 2};
    } else {
      return {cardStart: 5, moreBtn: 1};
    }
  }

  // useEffect для отслеживания изменения размера экрана
  useEffect(() => {
    // функция для переоценки количества карточек
    function handleResizeScreen () {
      const newMoviesCardCount = getCountCardForWidthScren();
      setMoviesCardCount(newMoviesCardCount.cardStart);
    }

    // вешаем слушателя событий для отслеживания изменений размера экрана
    window.addEventListener('resize', handleResizeScreen);

    return () => {
      window.removeEventListener('resize', handleResizeScreen);
    };
  }, []);

  // функция "Ещё"
  function handleShowMoreMovies() {
    setMoviesCardCount((count) => count + getCountCardForWidthScren().moreBtn);
  }

  // !!! movieCardList - это полный список, найденных фильмов, он формируется либо из запроса,
  // либо из localStorage

  // найти карточку по id (после лайка)
  function findCardById(cardsList, cardId) {
    return cardsList.find((card) => card.id === cardId);
  }

  // добавление карточки с фильмом
  function addMovieCard(cardId) {
    console.log(`Добавляем карточку: ${cardId}`);

    // находим информацию о карточке по id
    const card = findCardById(props.moviesCardList, cardId);

    // формируем объект сохраняемой карточки
    const saveCard = {
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `https://api.nomoreparties.co/${card.image.url}`,
      trailerLink: card.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${card.image.url}`,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
    };

    // отправляем запрос в базу данных на сохранение карточки
    myApi.saveMovie(saveCard)
      .then(data => {
        // получаем текущие сохраненные фильмы из localStorage
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));

        // добавляем новую карточку фильма в массив сохраненных фильмов
        const updatedSavedMovies = [...localSavedMovies, data];

        // сохраняем обновленный массив в localStorage
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
      })
      .catch(err => console.log(err));
  }

  // удаление карточки с фильмом
  function deleteMovieCard(cardId) {
    console.log(`Удаляем карточку: ${cardId}`)

    // запрос на удаление
    myApi.deleteMovie(cardId)
      .then(data => {
        console.log(data);

        // удаляем карточку из состояния moviesCardList
        props.setMoviesCardList(prevList => prevList.filter(card => card._id !== cardId));

        // обновить localStorage, удалить удалённую карточку
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const updatedSavedMovies = localSavedMovies.filter(card => card._id !== cardId);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
      })
      .catch(err => console.log(err));
  }

  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        {props.moviesCardList.slice(0, moviesCardCount).map((card) => (
          <MoviesCard
            key={card.id ? card.id : card._id} // Добавляем ключ для каждого компонента
            cardId={card.id ? card.id : card._id}
            trailerLink={card.trailerLink}
            img={card.image.url ? `https://api.nomoreparties.co/${card.image.url}` : `${card.image}` }
            title={card.nameRU}
            duration={durationFormat(card.duration)}
            typeButton={props.cardType}
            addMovieCard={addMovieCard}
            deleteMovieCard={deleteMovieCard}
          />
        ))}
      </ul>
      <div className="movies-card__more-wrapper">
        { moviesCardCount < props.moviesCardList.length && (
          <button
            type="button"
            className="movies-card__more-btn"
            aria-label="Показать больше результатов поиска"
            onClick={handleShowMoreMovies}>Ещё</button>)
        }
      </div>
    </section>
  ); 
}

export default MoviesCardList;