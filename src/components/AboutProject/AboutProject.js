import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__text-wrapper">
        <div className="about-project__column-wrapper">
          <h3 className="about-project__column-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__column-description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и 
            финальные доработки.</p>
        </div>
        <div className="about-project__column-wrapper">
          <h3 className="about-project__column-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__column-description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, 
            чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__progress-wrapper">
        <span className="about-project__progress-frontend about-project__progress-frontend_color">1 неделя</span>
        <span className="about-project__progress-backend about-project__progress-backend_color">4 недели</span>
      </div>
      <div className="about-project__progress-wrapper">
        <span className="about-project__progress-frontend">Back-end</span>
        <span className="about-project__progress-backend">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;