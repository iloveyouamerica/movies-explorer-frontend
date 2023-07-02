import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__text">
        <h3 className="about-project__text-title about-project__text-item-one">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-project__text-description about-project__text-item-two">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и 
          финальные доработки.
        </p>
        <h3 className="about-project__text-title about-project__text-item-three">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__text-description about-project__text-item-four">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, 
          чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__progress">
        <div className="about-project__progress-backend about-project__progress-backend_color">
          1 неделя
        </div>
        <div className="about-project__progress-frontend about-project__progress-frontend_color">
          4 недели
        </div>
        <div className="about-project__progress-backend">Back-end</div>
        <div className="about-project__progress-frontend">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;
