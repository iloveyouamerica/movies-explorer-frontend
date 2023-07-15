import React, { useState, useEffect, useContext, useRef } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../utils/CurrentUserContext';
import * as userApi from '../../utils/MainApi';
import { SUCCESSFUL_DATA_UPDATED, INVALID_LOGIN_OR_PASSWORD } from '../../utils/constants';

function Profile({ loggedIn, handleSetLoggedIn, handleSetCurrentUser }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const formRef = useRef(null);

  // значения управляемых инпутов
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);

  // состояние валидности формы
  const [formValidity, setFormValidity] = useState(false);

  // включение возможности редактировать форму
  const [isProfileEdit, setIsProfileEdit] = useState();

  // состояние ошибки редактирования профиля
  const [profileEditError, setProfileEditError] = useState('');

  // состояние изменений в полях ввода
  const [isFormChanged, setIsFormChanged] = useState(false);

  // состояние формы для блокировки полей при обработке запроса
  const [isUpdate, setIsUpdate] = useState(false);

  // дать возможность редактировать форму
  function handleGetProfileEdit() {
    setIsProfileEdit(true);
  }

  // проверить валидность формы
  function checkFormValidity() {
    const form = formRef.current;
    if(form.checkValidity()) {
      setFormValidity(true);
      setProfileEditError('');
    } else {
      setFormValidity(false);
      setProfileEditError(INVALID_LOGIN_OR_PASSWORD); // Вы ввели неправильный логин или пароль
    }

    checkFormChanges();
  }

  // проверить изменения в полях ввода
  function checkFormChanges() {
    const isNameChanged = userName !== currentUser.name;
    const isEmailChanged = userEmail !== currentUser.email;
    setIsFormChanged(isNameChanged || isEmailChanged);
  }

  // изменение имени
  function handleChangeUserName(event) {
    setUserName(event.target.value);
    checkFormValidity();
  }

  // изменение email
  function handleChangeUserEmail(event) {
    setUserEmail(event.target.value);
    checkFormValidity();
  }

  useEffect(() => {
    const isNameChanged = userName !== currentUser.name;
    const isEmailChanged = userEmail !== currentUser.email;
    setIsFormChanged(isNameChanged || isEmailChanged);
  }, [userName, userEmail, currentUser]);

  // отправка формы
  function handleProfileFormSubmit(event) {
    event.preventDefault();

    // блокировка полей формы
    setIsUpdate(true);

    userApi.changeUserData(userName, userEmail)
      .then(data => {
        //console.log(data);
        if(!data.message) {
          handleSetCurrentUser({ ...currentUser, name: data.name, email: data.email });
          setProfileEditError(SUCCESSFUL_DATA_UPDATED); // Данные успешно обновлены!
        } else {
          setProfileEditError(data.message);
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsUpdate(false);
      });
  }
  
  // выйти из аккаунта
  function handleLogOut() {
    localStorage.clear(); // очистим все данные
    handleSetLoggedIn(false);
    handleSetCurrentUser({});
    navigate('/');
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <section className="profile">
          <h1 className="profile__name">Привет, {currentUser.name}!</h1>
          <form
            className="profile__form"
            action="#"
            method="POST"
            name="profile-form"
            onSubmit={handleProfileFormSubmit}
            ref={formRef}
            noValidate>
            <div className="profile__form-container">
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
                  required
                  disabled={isUpdate} />
              </div>
              <span className="profile__form-input-error"></span>
              <div className="profile__form-input-wrapper">
                <label className="profile__form-label">E-mail</label>
                <input
                  className={`profile__form-input ${!isProfileEdit ? 'profile__form-input_no-edit' : ''}`}
                  type="email"
                  name="profile-email"
                  pattern=".+@.+\..+"
                  minLength="2"
                  maxLength="100"
                  value={userEmail}
                  onChange={handleChangeUserEmail}
                  required
                  disabled={isUpdate} />
              </div>
              <span className="profile__form-input-error"></span>
            </div>
            {isProfileEdit ?
              (<div className="profile__form-submit-wrapper">
                <span className="profile__form-submit-error">{profileEditError}</span>
                <button
                  type="submit"
                  className={`profile__form-submit ${
                  formValidity && isFormChanged ? 'profile__form-submit_active' : ''}`}
                  disabled={!formValidity && !isFormChanged && !isUpdate}>Сохранить</button>
              </div>) :
              (<div className="profile__form-change-wrapper">
              <button
                type="button"
                className="profile__form-change"
                onClick={handleGetProfileEdit}>Редактировать</button>
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
