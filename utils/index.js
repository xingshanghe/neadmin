import Cookie from 'js-cookie';

export const setAll = (key, value) => {
  if (process.server) return;
  window.localStorage.setItem(key, value);
  window.sessionStorage.setItem(key, value);

  Cookie.set(key, value);
};

export const removeAll = (key) => {
  if (process.server) return;
  window.localStorage.removeItem(key);
  window.sessionStorage.removeItem(key);

  Cookie.remove(key);
};

export const getFromCookie = (req, key) => {
  if (!req.headers.cookie) return null;
  const dataCookieStr = req.headers.cookie.split(';').find(c => c.trim().startsWith(key + '='));
  return dataCookieStr ? dataCookieStr.split('=')[1] : null;
};

export const getFromLocalStorage = (key) =>{
  const data = window.localStorage.getItem(key);
  return data ? data : null;
};

export const getFromSessionStorage = (key) =>{
  const data = window.sessionStorage.getItem(key);
  return data ? data : null;
};
