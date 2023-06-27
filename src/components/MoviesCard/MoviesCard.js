import React from "react";
import './MoviesCard.css';

function MoviesCard(props) {

  // обработчик клика по кнопке карточки (лайк / удалить)
  function handleCardButtonClick (event) {
    const cardButton = event.target;

    if(props.typeButton === 'like') {
      cardButton.classList.toggle('movie-card__button-like_active');
    } else {
      alert('DELETE');
    }
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
              onClick={handleCardButtonClick}></button>)
             : (<button
              type="button"
              className="movie-card__button movie-card__button-like"
              onClick={handleCardButtonClick}></button>)
          )
          : (props.owner === props.userData.userId ? 
            (<button
              type="button"
              className="movie-card__button movie-card__button-delete"
              onClick={handleCardButtonClick}></button>)
              : ''
          )
        }
      </div>
      <span className="movie-card__duration">{props.duration}</span>
    </li>
  );
}

export default MoviesCard;