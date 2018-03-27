import { setAll, removeAll, getFromCookie, getFromLocalStorage, getFromSessionStorage } from '~/utils/index.js';
import axios from 'axios';
import consts from '~/utils/consts.js';
import jwtDecode from 'jwt-decode';

export const setAllByJwt = (jwt) =>{
  setJwt(jwt);
  jwtHeader(jwt);
  let jwtData = jwtDecode(jwt);
  setUser(JSON.stringify(jwtData.account));
  setRole(JSON.stringify(jwtData.roles));
  setExp(jwtData.exp + '');
  return jwtData;
};

export const removeSoOn = () =>{
  removeAll(consts.JWT_KEY);
  removeAll(consts.USER_KEY);
  removeAll(consts.EXP_KEY);
  removeAll(consts.ROLE_KEY);
};

export const setJwt = (token) => {
  setAll(consts.JWT_KEY, token);
};

export const setUser = (user) => {
  setAll(consts.USER_KEY, user);
};

export const setRole = (role) => {
  setAll(consts.ROLE_KEY, role);
};

export const setMenus = (menus) => {
  setAll(consts.MENUS_KEY, menus);
};

export const setExp = (exp) => {
  setAll(consts.EXP_KEY, exp);
};

export const unsetJwt = ()=>{
  removeAll(consts.JWT_KEY);
};

export const unsetUser = ()=>{
  removeAll(consts.USER_KEY);
};

export const unsetRole = ()=>{
  removeAll(consts.ROLE_KEY);
};

export const unsetMenus = ()=>{
  removeAll(consts.MENUS_KEY);
};

export const unsetExp = ()=>{
  removeAll(consts.EXP_KEY);
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

export const getRoleFromCookie = (req)=>{
  let role = getFromCookie(req, consts.ROLE_KEY);
  return role ? JSON.parse(role) : null;
};

export const getRoleFromLocalStorage = () =>{
  let role = getFromLocalStorage(consts.ROLE_KEY);
  return role ? JSON.parse(role) : null;
};

export const getRoleFromSessionStorage = () =>{
  let role = getFromSessionStorage(consts.ROLE_KEY);
  return role ? JSON.parse(role) : null;
};

export const getMenusFromCookie = (req)=>{
  let menus = getFromCookie(req, consts.MENUS_KEY);
  return menus ? JSON.parse(menus) : null;
};

export const getMenusFromLocalStorage = () =>{
  let menus = getFromLocalStorage(consts.MENUS_KEY);
  return menus ? JSON.parse(menus) : null;
};

export const getMenusFromSessionStorage = () =>{
  let menus = getFromSessionStorage(consts.MENUS_KEY);
  return menus ? JSON.parse(menus) : null;
};

export const getJwtFromCookie = (req)=>{
  let jwt = getFromCookie(req, consts.JWT_KEY);
  return jwt ? jwtDecode(jwt) : null;
};

export const getJwtFromLocalStorage = () =>{
  let jwt = getFromLocalStorage(consts.JWT_KEY);
  return jwt ? jwtDecode(jwt) : null;
};

export const getJwtFromSessionStorage = () =>{
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
