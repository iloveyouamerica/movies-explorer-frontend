import React, { useContext, useState } from 'react';
import { UserContext } from '../../utils/userContext';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';


function Profile() {

  // это временный контекст (хардкод)
  const userData = useContext(UserContext);

  const navigate = useNavigate();

  // находится ли форма в режиме редактирования
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  // управляемые инпуты
  const [userName, setUserName] = useState(userData.userName);
  const [userEmail, setUserEmail] = useState(userData.userEmail);

  const [formValidity, setFormValidity] = useState(false);

  function handleChangeUserName(event) {
    setUserName(event.target.value);
    checkValidity();
  }

  function handleChangeUserEmail(event) {
    setUserEmail(event.target.value);
    checkValidity();
  }

  // проверка вадидации формы
  function checkValidity() {
    const profileForm = document.querySelector('.profile__form');
    const formInputs = profileForm.querySelectorAll('.profile__form-input');
    const isInvalidInput = Array.from(formInputs).some((input) => input.validity.valid === false);
    
    setFormValidity(!isInvalidInput);

    const submitButton = document.querySelector('.profile__form-submit');
    const formValidityError = document.querySelector('.profile__form-submit-error');

    if(!isInvalidInput) {
      formValidityError.textContent = '';
      submitButton.removeAttribute('disabled');
    } else {
      formValidityError.textContent = 'Вы ввели неправильный логин или пароль';
      submitButton.setAttribute('disabled', 'disabled');
    }
    //console.log(!isInvalidInput);
  }

  // переключиться на редактирование формы
  function handleChangeProfile() {
    setIsProfileEdit(true);
  }

  // отправка формы
  function handleProfileFormSubmit(event) {
    event.preventDefault();

    alert('Форма отправлена');
  }

  // выход из профайла
  function handleLogOut() {
    // при логауте нужно очистить localStorage и перенаправить на главную
    navigate('/');
  }

  return (
    <>
      <Header />
      <main className="main">
        <section className="profile">
          <h1 className="profile__name">Привет, {userData.userName}!</h1>
          <form
            className="profile__form"
            action=""
            method="POST"
            name="profile-form"
            onSubmit={handleProfileFormSubmit} noValidate>
            <div className="profile__form-input-wrapper">
              <label className="profile__form-label">Имя</label>
              <input
                className={`profile__form-input ${!isProfileEdit ? 'profile__form-input_no-edit' : ''}`}
                type="text"
                name="profile-name"
                minLength="2"
                maxLength="30"
                value={userName}
                onChange={handleChangeUserName}
                required />
            </div>
            <span className="profile__form-input-error"></span>
            <div className="profile__form-input-wrapper">
              <label className="profile__form-label">E-mail</label>
              <input
                className={`profile__form-input ${!isProfileEdit ? 'profile__form-input_no-edit' : ''}`}
                type="email"
                name="profile-email"
                minLength="2"
                maxLength="100"
                value={userEmail}
                onChange={handleChangeUserEmail}
                required />
            </div>
            <span className="profile__form-input-error"></span>
            {isProfileEdit ?
              (<div className="profile__form-submit-wrapper">
                <span className="profile__form-submit-error"></span>
                <button
                  type="submit"
                  className={`profile__form-submit ${
                  formValidity ? '' : 'profile__form-submit_no-active'}`}
                  disabled>Сохранить</button>
              </div>) :
              (<div className="profile__form-change-wrapper">
              <button
                type="button"
                className="profile__form-change"
                onClick={handleChangeProfile}>Редактировать</button>
              <button
                type="button"
                className="profile__logout"
                onClick={handleLogOut}>Выйти из аккаунта</button>
            </div>)
            }
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;