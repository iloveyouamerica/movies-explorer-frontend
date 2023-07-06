import { React, useState} from 'react';
import './FormAuth.css';

function FormAuth({ submitError, setError, onSubmit, hasNameInput, submitTitle }) {
  const [formValidity, setFormValidity] = useState(); // состояние валидации формы
  const [formData, setFormData] = useState({}); // значения полей формы

  // отправка формы
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if(formValidity) { // если форма валидная
      onSubmit(formData);
    }
  };

  // активация кнопки сабмита
  const activateSubmitButton = () => {
    const form = document.querySelector(".form-auth");
    const submitBtn = document.querySelector('.form-auth__submit');

    if(form.checkValidity()) {
      setFormValidity(true);
      submitBtn.removeAttribute('disabled');
      submitBtn.classList.add('form-auth__submit_active');
    } else {
      setFormValidity(false);
      submitBtn.setAttribute('disabled', '');
      submitBtn.classList.remove('form-auth__submit_active');
    }
  }

  // любое изменение полей формы
  const handleFormChange = (event) => {
    const formElement = event.target;
    const spanError = document.querySelector(`.${formElement.id}`);

    // проверка валидации инпутов
    if (!formElement.validity.valid) {
      spanError.textContent = formElement.validationMessage.split('.')[0];

      if(formElement.type === "email") {
        spanError.textContent = "Введите email в формате xxx@xxx.xx";
      }
    } else {
      spanError.textContent = '';
    }

    // решение об активации сабмита
    activateSubmitButton();

    // установка значений инпутов формы
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formElement.name]: formElement.value,
    }));

    // при редактировании формы обнулим текст ошибки ответа сервера
    setError('');
  }

  return (
    <form action="#" method="POST" className="form-auth" onChange={handleFormChange} onSubmit={handleFormSubmit} noValidate>
      <div className="form-auth__area-wrapper">
        {hasNameInput && (
          <>
            <label htmlFor="input-name" className="form-auth__input-label">Имя</label>
            <input
              type="text"
              name="name"
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
          name="email"
          id="input-email"
          className="form-auth__input"
          pattern=".+@.+\..+"
          minLength="2"
          required />
        <span className="form-auth__span-error input-email"></span>
        <label htmlFor="input-password" className="form-auth__input-label">Пароль</label>
        <input
          type="password"
          name="password"
          id="input-password"
          className="form-auth__input"
          minLength="2"
          required />
        <span className="form-auth__span-error input-password"></span>
      </div>
      <div className="form-auth__submit-wrapper">
        {/* <span className="form-auth__error">{submitError}</span> */}
        {submitError && <span className="form-auth__error">{submitError}</span>}
        <button type="submit" className="form-auth__submit" disabled>{submitTitle}</button>
      </div>
    </form>
  );
}

export default FormAuth;
