import React from "react";
import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <li className="movie-card">
      <img
        src={props.img}
        className="movie-card__image"
        alt={props.title} />
      <div className="movie-card__wrapper">
        <h2 className="movie-card__title">{props.title}</h2>
        <button type="button" className="movie-card__like-btn"></button>
      </div>
      <span className="movie-card__duration">{props.duration}</span>
    </li>
  );
}

export default MoviesCard;