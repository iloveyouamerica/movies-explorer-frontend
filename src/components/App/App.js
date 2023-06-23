import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  // Получение текущего пути с помощью useLocation
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== '/signup' && location.pathname !== '/signin' && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      {location.pathname !== '/signup' && location.pathname !== '/signin' && <Footer />}
    </div>
  );
}

export default App;