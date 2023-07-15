import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../utils/CurrentUserContext';
import * as userApi from '../../utils/MainApi';
import ProtectedRouteElement from '../ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // состояние загрузки компонента App

  // хук, при первоначальном монтировании компонента
  useEffect(() => {
    // проверить токен, если он есть установить loggedIn и currentUser
    handleCheckToken();
  }, []);

  // установка значения loggeIn
  function handleSetLoggedIn(value) {
    setLoggedIn(value);
  }

  // установка переменной currentUser
  function handleSetCurrentUser(userData) {
    setCurrentUser(userData);
  }

  // проверка токена и получение данных пользователя
  function handleCheckToken() {
    const jwt = localStorage.getItem('token');

    if(jwt) {
      // отправить запрос на сервер
      userApi.getUserData(jwt)
        .then((userData) => { // data - объект с данными пользователя {id, name, email}
          setLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false); // Завершение загрузки App.js
        });
    } else {
      setLoading(false); // Завершение загрузки App.js
    }
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="/signup" element={loggedIn ? (<Navigate to="/" replace />) : (<Register loading={loading} loggedIn={loggedIn} handleSetLoggedIn={handleSetLoggedIn} handleSetCurrentUser={handleSetCurrentUser} />)} />
          <Route path="/signin" element={loggedIn ? (<Navigate to="/" replace />) : (<Login loading={loading} loggedIn={loggedIn} handleSetLoggedIn={handleSetLoggedIn} handleSetCurrentUser={handleSetCurrentUser} />)} />
          <Route path="/movies" element={<ProtectedRouteElement element={Movies} loading={loading} loggedIn={loggedIn} />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} loading={loading}loggedIn={loggedIn} />} />
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} loading={loading} loggedIn={loggedIn} handleSetLoggedIn={handleSetLoggedIn} handleSetCurrentUser={handleSetCurrentUser} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
