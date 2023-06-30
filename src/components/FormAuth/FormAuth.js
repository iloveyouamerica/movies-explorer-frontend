import { React, useState} from 'react';
import './FormAuth.css';
import { useLocation } from 'react-router-dom';

function FormAuth({ submitTitle }) {
  const location = useLocation();

  const [formValidity, setFormValidity] = useState();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if(formValidity) { // если форма валидная, то отправляем на сервер
      alert("wooohooo");
    }
  };

  // при любом изменении формы определим на каком элементе было вызвано событие
  // проверим валидацию этого элемента
  const handleFormChange = (event) => {
    const formElement = event.target;
    const spanError = document.querySelector(`.${formElement.id}`);
    const form = document.querySelector(".form-auth");
    const submitBtn = document.querySelector('.form-auth__submit');

    if (form.checkValidity()) {
      setFormValidity(true);
      submitBtn.removeAttribute('disabled');
      submitBtn.classList.add('form-auth__submit_active');
    } else {
      setFormValidity(false);
      submitBtn.setAttribute('disabled', '');
      submitBtn.classList.remove('form-auth__submit_active');
    }

    if (!formElement.validity.valid) {
      spanError.textContent = formElement.validationMessage.split('.')[0];
    } else {
      spanError.textContent = '';
    }
  };

  return (
    <form action="" method="POST" className="form-auth" onChange={handleFormChange} onSubmit={handleFormSubmit} noValidate>
      <div className="form-auth__area-wrapper">
        {location.pathname !== '/signin' && (
          <>
            <label htmlFor="input-name" className="form-auth__input-label">Имя</label>
            <input
              type="text"
              name="input-name"
              id="input-name"
              className="form-auth__input"
              minLength="2"
              maxLength="30"
              required />
            <span className="form-auth__span-error input-name"></span>
          </>
        )}
        <label htmlFor="input-email" className="form-auth__input-label">E-mail</label>
        <input
          type="email"
          name="input-email"
          id="input-email"
          className="form-auth__input"
          minLength="2"
          maxLength="100"
          required />
        <span className="form-auth__span-error input-email"></span>
        <label htmlFor="input-password" className="form-auth__input-label">Пароль</label>
        <input
          type="password"
          name="input-password"
          id="input-password"
          className="form-auth__input"
          minLength="2"
          maxLength="30"
          required />
        <span className="form-auth__span-error input-password"></span>
      </div>
      <button type="submit" className="form-auth__submit" disabled>{submitTitle}</button>
    </form>
  );
}

export default FormAuth;