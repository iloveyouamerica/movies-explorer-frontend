import React from "react";
import './Promo.css';
import { Link } from 'react-scroll';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__text-wrapper">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <Link
          to="about-project"
          smooth={true}
          duration={500}
          className="promo__button">Узнать больше</Link>
      </div>
      <div className="promo__image"></div>
    </section>
  );
}

export default Promo;
