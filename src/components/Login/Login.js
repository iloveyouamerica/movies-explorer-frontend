import React from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import FormAuth from '../FormAuth/FormAuth';

function Login() {
  function handleLoginSubmit(formData) {
    // console.log(`компонент Login принял объект данных пользователя из формы: ${formData}`);
    console.log(formData);
  }

  return (
    <main className="main">
      <section className="login">
        <div className="login__wrapper">
          <div className="login__wrapper-logo">
            <Logo />
          </div>
          <h1 className="login__title">Рады видеть!</h1>
          <FormAuth onSubmit={handleLoginSubmit} submitTitle="Войти" />
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