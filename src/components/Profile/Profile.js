import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <main className="main">
      <section className="profile">
        <h1 className="profile__name">Привет, Александр!</h1>
        <form className="profile__form" action="" method="POST">
          <div className="profile__form-input-wrapper">
            <label htmlFor="profile-name" className="profile__form-label">Имя</label>
            <input
              className="profile__form-input"
              id="profile-name"
              type="text"
              name="profile-name"
              minLength="2"
              maxLength="30"
              required />
          </div>
          <span className="profile__form-input-error"></span>
          <div className="profile__form-input-wrapper">
            <label htmlFor="profile-email" className="profile__form-label">E-mail</label>
            <input
              className="profile__form-input"
              id="profile-email"
              type="email"
              name="profile-email"
              minLength="2"
              maxLength="100"
              required />
          </div>
          <span className="profile__form-input-error"></span>
          <button className="profile__form-submit" type="submit">Редактировать</button>
        </form>
        <Link to="/" className="profile__logout">Выйти из аккаунта</Link>
      </section>
    </main>
  );
}

export default Profile;