import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="moives-card">
      <ul className="movies-card__list">
        <MoviesCard
          img="https://avatars.dzeninfra.ru/get-zen_doc/51081/pub_5e9984e8adf4e00dc2d7daa8_5e998afaf920f87d43b400cb/scale_1200"
          title="Титаник"
          duration="1ч 42м" />
        <MoviesCard
          img="https://static.life.ru/publications/2021/12/20/229849106405.39178.jpeg"
          title="Назад в будущее"
          duration="1ч 52м" />
        <MoviesCard
          img="https://flytothesky.ru/wp-content/uploads/2019/05/1-50.jpg"
          title="Титаник восстание"
          duration="1ч 22м" />
        <MoviesCard
          img="https://www.soyuz.ru/public/uploads/files/5/7153800/1005x558_20171103122904f765aa647d.png"
          title="Назад в будущее: Марти и Док тестируют Delorean"
          duration="1ч 42м" />
        <MoviesCard
          img="https://neg.by/upload/slam.image/iblock/c5a/36892-qr3fkzfksqt08x8i9w1m3u19gvdyua43-100.jpg"
          title="Анчоусы"
          duration="1ч 42м" />
      </ul>
      <div className="movies-card__more-wrapper">
        <button type="button" className="movies-card__more-btn">Ещё</button>
      </div>
    </section>
  ); 
}

export default MoviesCardList;