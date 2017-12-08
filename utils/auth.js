import axios from 'axios';
import consts from '~/utils/consts.js';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

export const setAllByJwt = (jwt) =>{
  setToken(jwt);
  let jwtData = jwtDecode(jwt);
  setUser(jwtData.account);
};

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

// 客户端设置token
export const setToken = (token) => {
  setAll(consts.JWT_KEY, token);
};

// 客户端设置token
export const setUser = (user) => {
  setAll(consts.USER_KEY, user);
};

// 客户端删除token
export const unsetToken = ()=>{
  removeAll(consts.JWT_KEY);
};

export const unsetUser = ()=>{
  removeAll(consts.USER_KEY);
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

export const getUserFromCookie = (req)=>{
  let user = getFromCookie(req, consts.USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const getUserFromLocalStorage = () =>{
  let user = getFromLocalStorage(consts.USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const getUserFromSessionStorage = () =>{
  let user = getFromSessionStorage(consts.USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const getTokenFromCookie = (req)=>{
  let jwt = getFromCookie(req, consts.JWT_KEY);
  return jwt ? jwtDecode(jwt) : null;
};

export const getTokenFromLocalStorage = () =>{
  let jwt = getFromLocalStorage(consts.JWT_KEY);
  return jwt ? jwtDecode(jwt) : null;
};

export const getTokenFromSessionStorage = () =>{
  let jwt = getFromSessionStorage(consts.JWT_KEY);
  return jwt ? jwtDecode(jwt) : null;
};

// jwt 请求header  操作方法
export const jwtHeader = jwt => {
  if (jwt) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
