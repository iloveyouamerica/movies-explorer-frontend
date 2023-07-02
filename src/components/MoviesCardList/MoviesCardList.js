import React, { useContext } from 'react';
import { UserContext } from '../../utils/userContext';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  // это временный контекст (хардкод)
  const userData = useContext(UserContext);

  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        {props.moviesCardList.map((card, i) => (
          <MoviesCard
            key={i} // Добавляем ключ для каждого компонента в массиве
            img={card.image}
            title={card.title}
            likes={card.likes} // передаём массив тех, кто лайкнул
            duration={card.duration}
            owner={card.owner}
            typeButton={props.cardType}
            userData={userData}
          />
        ))}
      </ul>
      <div className="movies-card__more-wrapper">
        { props.moviesCardList.length > 0 ?
          <button
            type="button"
            className="movies-card__more-btn"
            aria-label="Показать больше результатов поиска">Ещё</button>
          : '' }
      </div>
    </section>
  ); 
}

export default MoviesCardList;