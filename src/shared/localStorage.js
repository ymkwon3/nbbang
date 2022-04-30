const getToken = () => {
  return localStorage.getItem('nbbang_token');
}

const setToken = (token) => {
  localStorage.setItem('nbbang_token', token);
}

const removeToken = () => {
  localStorage.removeItem('nbbang_token');
}

export {getToken, setToken, removeToken};