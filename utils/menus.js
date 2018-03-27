import { setAll, getFromCookie, getFromLocalStorage, getFromSessionStorage } from '~/utils/index.js';
import consts from '~/utils/consts.js';
import _ from 'lodash';

export const setMenusCollapse = ({sidebarCollapse, secSidebarCollapse}) => {
  if (process.server) return;
  setAll(consts.SIDEBAR_COLLAPSE_KEY, sidebarCollapse);
  setAll(consts.SEC_SIDEBAR_COLLAPSE_KEY, secSidebarCollapse);
};

export const getMenusCollapseFromCookie = (req)=>{
  if (!req.headers.cookie) return {sidebarCollapse: true, secSidebarCollapse: false};
  let sidebarCollapse = getFromCookie(req, consts.SIDEBAR_COLLAPSE_KEY);
  let secSidebarCollapse = getFromCookie(req, consts.SEC_SIDEBAR_COLLAPSE_KEY);
  return {sidebarCollapse, secSidebarCollapse};
};

export const getMenusCollapseFromLocalStorage = () =>{
  let sidebarCollapse = getFromLocalStorage(consts.SIDEBAR_COLLAPSE_KEY);
  let secSidebarCollapse = getFromLocalStorage(consts.SEC_SIDEBAR_COLLAPSE_KEY);
  return {sidebarCollapse, secSidebarCollapse};
};

export const getMenusCollapseFromSessionStorage = () =>{
  let sidebarCollapse = getFromSessionStorage(consts.SIDEBAR_COLLAPSE_KEY);
  let secSidebarCollapse = getFromSessionStorage(consts.SEC_SIDEBAR_COLLAPSE_KEY);
  return {sidebarCollapse, secSidebarCollapse};
};

export const createMapOfRoutes = (menus) => {
  var mapMenus = {};
  for (let i in menus) {
    if (menus[i].children) {
      mapMenus = _.assignIn(mapMenus, createMapOfRoutes(menus[i].children));
    } else {
      // TODO sub格式必须相对固定
      if (menus[i].link) {
        if (menus[i].sub) {
          mapMenus[menus[i].link] = menus[i];
          // if (menus[i].sub.length > 0) {
          for (let ii in menus[i].sub) {
            if (menus[i].sub[ii].children) {
              // mapMenus = _.assignIn(mapMenus, createMapOfRoutes(menus[i].sub[ii].children));
              for (let iii in menus[i].sub[ii].children) {
                mapMenus[menus[i].sub[ii].children[iii].link] = menus[i];
              }
            }
          }
        } else {
          mapMenus[menus[i].link] = menus[i];
        }
        // }
      }
    }
  }
  return mapMenus;
};

export const getMapOfRoutes = (mapMenus) => {
  // TODO 手动增加不在菜单中显示的 可访问的地址
  // 手动增加map
  // let accountsMap = {};
  // // 处理/accounts/profile
  // if (mapMenus.hasOwnProperty('/accounts')) {
  //   accountsMap = _.assignIn(accountsMap, mapMenus['/accounts']);
  //   // delete (accountsMap.sub);
  //   mapMenus['/accounts/profile'] = accountsMap;
  // }
  // mapMenus['/'] = {};
  return mapMenus;
};

export const getLinkFromRoute = ({path, params}) => {
  let length = path.length;
  if (path.match(/\/$/) && (length > 1)) {
    path = path.substring(0, length - 1);
  }

  // 处理包含变量的path
  for (var key in params) {
    path = path.replace(new RegExp(params[key]), ':' + key);
  }
  return path;
};

export const setParamsToLink = ({link, params}) => {
  // 处理包含变量的path
  for (var key in params) {
    link = link.replace(new RegExp(':' + key), params[key]);
  }
  return link;
};
