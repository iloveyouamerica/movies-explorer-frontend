import React from 'react';
import './Techs.css'

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__content-title">7 технологий</h3>
      <p className="techs__content-description">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className="techs__wrap">
        <li className="techs__wrap-item">HTML</li>
        <li className="techs__wrap-item">CSS</li>
        <li className="techs__wrap-item">JS</li>
        <li className="techs__wrap-item">React</li>
        <li className="techs__wrap-item">Git</li>
        <li className="techs__wrap-item">Express.js</li>
        <li className="techs__wrap-item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;