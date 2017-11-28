import axios from 'axios';
import consts from '~/utils/consts.js';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

// 客户端设置token
export const setToken = (token) => {
  if (process.server) return;
  window.localStorage.setItem(consts.JWT_KEY, token);
  window.localStorage.setItem(consts.USER_KEY, JSON.stringify(jwtDecode(token)));

  Cookie.set(consts.JWT_KEY, token);
};

// 客户端删除token
export const unsetToken = ()=>{
  if (process.server) return;
  window.localStorage.removeItem(consts.JWT_KEY);
  window.localStorage.removeItem(consts.USER_KEY);

  Cookie.remove(consts.JWT_KEY);
};

export const getUserFromCookie = (req)=>{
  if (!req.headers.cookie) return;
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(consts.JWT_KEY + '='));
  if (!jwtCookie) return;
  const jwt = jwtCookie.split('=')[1];
  return jwtDecode(jwt);
};

export const getUserFromLocalStorage = () =>{
  const json = window.localStorage.getItem(consts.USER_KEY);
  return json ? JSON.parse(json) : undefined;
};

// jwt 请求header  操作方法
export const jwtHeader = jwt => {
  if (jwt) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
