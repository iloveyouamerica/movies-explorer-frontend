import React, {useState, useEffect} from "react";
import './MoviesCard.css';
import { Link } from 'react-router-dom';

function MoviesCard(props) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Проверяем, сохранена ли карточка в localStorage при первой отрисовке для кнопки с лайком
    if(props.typeButton === 'like') {
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      if (savedMovies) {
        const isAlreadySaved = savedMovies.some(movie => movie.movieId === props.cardId);
        setIsSaved(!!isAlreadySaved);
      }
    }
  }, []);

  // кнопка лайка/дизлайка для компонента Movies
  function handleSaveMovie(cardId, event) {
    event.preventDefault();

    if(isSaved) {
      // Получаем текущие сохраненные фильмы из localStorage
      const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      // Находим объект с заданным movieId и получаем его _id
      const savedMovie = localSavedMovies.find(movie => movie.movieId === cardId);

      // Карточка уже сохранена, выполняем удаление
      props.deleteMovieCard(savedMovie._id);
      setIsSaved(false);
    } else {
      // Карточка не сохранена, выполняем сохранение
      props.addMovieCard(cardId);
      setIsSaved(true);
    }
  }

  // удалить фильм из сохранённых
  function handleClickDeleteCard(cardId, event) {
    event.preventDefault();
    // поднимаем результат в компонент выше - MoviesCardList
    props.deleteMovieCard(cardId);
  }

  return (
    <li className="movie-card">
      <Link to={props.trailerLink} className="movie-card__link" target="_blank">
        <img src={props.img} className="movie-card__image" alt={props.title} />
        <div className="movie-card__wrapper">
          <h2 className="movie-card__title">{props.title}</h2>
          {props.typeButton === 'like' ? 
            (<button
            type="button"
            className={`movie-card__button movie-card__button-like ${isSaved ? 
              'movie-card__button-like_active' : ''}`}
            onClick={(event) => handleSaveMovie(props.cardId, event)} ></button>) :
            (<button
              type="button"
              className="movie-card__button movie-card__button-delete"
              onClick={(event) => handleClickDeleteCard(props.cardId, event)}></button>)
          }
        </div>
        <span className="movie-card__duration">{props.duration}</span>
      </Link>
    </li>
  );
}

export default MoviesCard;