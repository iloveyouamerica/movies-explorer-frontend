import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import durationFormat from '../../utils/durationFormat';

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

  // отображаемые карточки фильмов
  const displayedCards = props.moviesCardList.slice(0, moviesCardCount);

  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        {displayedCards.map((card) => (
          <MoviesCard
            key={card.id} // Добавляем ключ для каждого компонента в массиве
            trailerLink={card.trailerLink}
            img={`https://api.nomoreparties.co/${card.image.url}`}
            title={card.nameRU}
            duration={durationFormat(card.duration)}
            typeButton={props.cardType}
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