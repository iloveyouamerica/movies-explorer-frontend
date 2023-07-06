import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import FormAuth from '../FormAuth/FormAuth';
import { userRegister } from '../../utils/MainApi';

function Register() {
  const [registerError, setRegisterError] = useState('');

  // функция установит текст ошибки сервера (используется для поднятия состояния)
  function setServerError(error) {
    setRegisterError(error);
  }
  
  function handleRegisterSubmit(formData) {
    console.log(formData);

    // отправить данные регистрации на сервер
    userRegister()
      .then(data => console.log(data))
      .catch(err => {
        setServerError(err.message); // установим тект ошибки сервера
        //console.log(`Error ihihi: ${err}`)
      });
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
