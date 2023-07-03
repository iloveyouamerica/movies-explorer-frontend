import React from "react";
import { Link } from 'react-router-dom';
import './AboutMe.css';
import myPhoto from '../../images/my-photo.png';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__wrapper">
        <div className="about-me__column-wrapper">
          <h3 className="about-me__name">Александер</h3>
          <p className="about-me__career">Фронтенд-разработчик, 11 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            to="https://github.com/iloveyouamerica"
            target="_blank"
            className="about-me__github">Github</Link>
        </div>
        <div className="about-me__photo-wrapper">
          <img
            src={myPhoto}
            alt="личная фотография веб-разработчика и выпускника Яндекс.Практикум"
            className="about-me__photo" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
