import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import FormAuth from '../FormAuth/FormAuth';

function Register() {
  function handleRegisterSubmit(formData) {
    // console.log(`Компонент регистер принял: ${formData}`);
    console.log(formData);
  }

  return (
    <main className="main">
      <section className="register">
        <div className="register__wrapper">
          <div className="register__wrapper-logo">
            <Logo  />
          </div>
          <h1 className="register__title">Добро пожаловать!</h1>
          <FormAuth onSubmit={handleRegisterSubmit} hasNameInput={true} submitTitle="Зарегистрироваться" />
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
