import React, { useState, useEffect } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import FormAuth from '../FormAuth/FormAuth';
import * as userApi from '../../utils/MainApi';
import { INVALID_LOGIN_OR_PASSWORD } from '../../utils/constants';

function Login(props) {

  const [loginError, setLoginError] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const { handleSetLoggedIn, handleSetCurrentUser } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (props.loggedIn) {
      navigate('/');
    }
  }, [props.loggedIn, navigate]);

  // функция установит текст ошибки сервера (используется для поднятия состояния)
  function setServerError(error) {
    setLoginError(error);
  }

  function handleLoginSubmit(formData) {
    // заблокируем поля формы во время запроса
    setIsAuth(true);

    userApi.userLogin(formData)
      .then(data => {
        if(data.message) {
          if(data.message === 'Validation failed') {
            setLoginError(INVALID_LOGIN_OR_PASSWORD);
          } else {
            setLoginError(data.message);
          }
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
      .catch(() => {})
      .finally(() => {
        // разблокируем поля формы во время запроса
        setIsAuth(false);
      });
  }

  if(props.loading) {
    return null;
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
            isAuth={isAuth}
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