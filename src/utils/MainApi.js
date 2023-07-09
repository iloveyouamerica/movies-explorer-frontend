// запросы к собственному API

// api.moviess.nomoredomains.rocks
const baseUrl = 'http://localhost:3001';

// регистрация
function userRegister(userData) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(res => res.json())
}

// авторизация
function userLogin(userData) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(res => res.json())
}

// получить данные пользователя по токену
function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
}

// обновить данные пользователя
function changeUserData(name, email) {
  const token = localStorage.getItem('token');
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email
    }),
  })
    .then(res => res.json())
}


export { userRegister, userLogin, getUserData, changeUserData };