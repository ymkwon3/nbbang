const getToken = () => {
  return localStorage.getItem('instagram_token');
}

const setToken = (token) => {
  localStorage.setItem('instagram_token', token);
}

const removeToken = () => {
  localStorage.removeItem('instagram_token');
}

export {getToken, setToken, removeToken};