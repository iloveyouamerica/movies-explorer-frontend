import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import FormAuth from '../FormAuth/FormAuth';

function Register() {
  return (
    <main className="main">
      <section className="register">
        <div className="register__wrapper">
          <Logo />
          <h1 className="register__title">Добро пожаловать!</h1>
          <FormAuth submitTitle="Зарегистрироваться" />
          <div className="register__under-form-link-wrapper">
            <span className="register__login-text">Уже зарегистрированы?</span>
            <Link to="/signin" className="register__login-link">Войти</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;