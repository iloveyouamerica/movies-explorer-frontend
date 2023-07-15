// запросы к Beatfilm Movies

function getFilm() {
  return fetch('https://api.nomoreparties.co/beatfilm-movies')
      .then((res) => res.json())
      .then((movies) => movies) // вернём фильмы
      .catch((err) => err);
}

export default getFilm;