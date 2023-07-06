// запросы к собственному API

const baseUrl = 'http://localhost:3001';

// функция запроса на регистрацию
function userRegister(userData) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(res => res.json())
    //.then(data => console.log(data))
    .catch();
}

export { userRegister };