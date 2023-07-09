import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import FormAuth from '../FormAuth/FormAuth';
import * as userApi from '../../utils/MainApi';

function Login(props) {
  const [loginError, setLoginError] = useState('');
  const { handleSetLoggedIn, handleSetCurrentUser } = props;

  const navigate = useNavigate();

  // функция установит текст ошибки сервера (используется для поднятия состояния)
  function setServerError(error) {
    setLoginError(error);
  }

  function handleLoginSubmit(formData) {
    // console.log(`компонент Login принял объект данных пользователя из формы: ${formData}`);
    userApi.userLogin(formData)
      .then(data => {
        if(data.message) {
          setLoginError(data.message);
        } else {
          handleSetLoggedIn(true); // isLoggedIn: true
          localStorage.setItem('token', data.token);

          // получим и сохраним данные пользователя в currentUser
          userApi.getUserData(data.token)
            .then(userData => {
              // усnановим данные в currentUser
              handleSetCurrentUser(userData);
            })
            .catch(err => console.log(err));

          navigate('/movies');
        }
      })
  }

  return (
    <main className="main">
      <section className="login">
        <div className="login__wrapper">
          <div className="login__wrapper-logo">
            <Logo />
          </div>
          <h1 className="login__title">Рады видеть!</h1>
          <FormAuth
            submitError={loginError}
            setError={setServerError}
            onSubmit={handleLoginSubmit}
            submitTitle="Войти" />
          <div className="login__under-form-link-wrapper">
            <span className="login__login-text">Ещё не зарегистрированы?</span>
            <Link to="/signup" className="login__login-link">Регистрация</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;