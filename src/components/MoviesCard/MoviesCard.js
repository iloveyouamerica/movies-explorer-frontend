import React from "react";
import './MoviesCard.css';

function MoviesCard(props) {

  function handleClickLikeCard(event) {
    const cardButton = event.target;
    cardButton.classList.toggle('movie-card__button-like_active');
  }

  function handleClickDeleteCard(event) {
    const cardButton = event.target;
    cardButton.closest('.movie-card').remove();
  }

  return (
    <li className="movie-card">
      <img src={props.img} className="movie-card__image" alt={props.title} />
      <div className="movie-card__wrapper">
        <h2 className="movie-card__title">{props.title}</h2>
        {props.typeButton === 'like' ? 
          (props.likes.find((user) => user === props.userData.userId) ? 
            (<button
              type="button"
              className="movie-card__button movie-card__button-like movie-card__button-like_active"
              onClick={handleClickLikeCard}></button>)
             : (<button
              type="button"
              className="movie-card__button movie-card__button-like"
              onClick={handleClickLikeCard}></button>)
          )
          : (props.owner === props.userData.userId ? 
            (<button
              type="button"
              className="movie-card__button movie-card__button-delete"
              onClick={handleClickDeleteCard}></button>)
              : ''
          )
        }
      </div>
      <span className="movie-card__duration">{props.duration}</span>
    </li>
  );
}

export default MoviesCard;