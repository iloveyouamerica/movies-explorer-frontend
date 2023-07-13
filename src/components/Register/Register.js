import React, { useState, useEffect } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import FormAuth from '../FormAuth/FormAuth';
import * as userApi from '../../utils/MainApi';

function Register(props) {
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState(''); // ошибки при регистрации
  const [isAuth, setIsAuth] = useState(false);
  const { handleSetLoggedIn, handleSetCurrentUser } = props;

  useEffect(() => {
    if (props.loggedIn) {
      navigate('/');
    }
  }, [props.loggedIn, navigate]);

  // функция установит текст ошибки сервера (используется для поднятия состояния)
  function setServerError(error) {
    setRegisterError(error);
  }
  
  function handleRegisterSubmit(formData) {
    // заблокируем поля формы во время запроса
    setIsAuth(true);

    // отправить данные регистрации на сервер
    userApi.userRegister(formData)
      .then(data => {
        if(data.message) { // если в ответе сервера есть сообщение
          setRegisterError(data.message);
        } else { // если пользователь успешно зарегистрирован
          // выполним авторизацию нового пользователя
          userApi.userLogin({'email': formData.email, 'password': formData.password})
            .then(data => {
              if(data.message) {
                console.log(data.message)
              } else {
                handleSetLoggedIn(true); // установим isLoggedIn: true
                localStorage.setItem('token', data.token);

                // получим и установим данные пользователя в currentUser
                userApi.getUserData(data.token)
                  .then(userData => {
                    handleSetCurrentUser(userData);
                  })
                  .catch(err => console.log(err));

                navigate('/movies');
              }
            });
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // разблокируем поля формы
        setIsAuth(false);
      });
  }

  if(props.loading) {
    return null;
  }

  return (
    <main className="main">
      <section className="register">
        <div className="register__wrapper">
          <div className="register__wrapper-logo">
            <Logo  />
          </div>
          <h1 className="register__title">Добро пожаловать!</h1>
          <FormAuth
            isAuth={isAuth}
            submitError={registerError}
            setError={setServerError}
            onSubmit={handleRegisterSubmit}
            hasNameInput={true}
            submitTitle="Зарегистрироваться" />
        </div>
        <div className="register__under-form-link-wrapper">
          <span className="register__login-text">Уже зарегистрированы?</span>
          <Link to="/signin" className="register__login-link">Войти</Link>
        </div>
      </section>
    </main>
  );
}

export default Register;
