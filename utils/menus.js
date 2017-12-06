import consts from '~/utils/consts.js';
import Cookie from 'js-cookie';
import _ from 'lodash';
// 客户端设置菜单状态
export const setMenusCollapse = ({sidebarCollapse, secSidebarCollapse}) => {
  if (process.server) return;
  window.localStorage.setItem(consts.SIDEBAR_COLLAPSE_KEY, sidebarCollapse);
  window.localStorage.setItem(consts.SEC_SIDEBAR_COLLAPSE_KEY, secSidebarCollapse);

  Cookie.set(consts.SIDEBAR_COLLAPSE_KEY, sidebarCollapse);
  Cookie.set(consts.SEC_SIDEBAR_COLLAPSE_KEY, secSidebarCollapse);
};

// 客户端删除菜单状态
export const unsetMenusCollapse = ()=>{
  if (process.server) return;
  window.localStorage.removeItem(consts.SIDEBAR_COLLAPSE_KEY);
  window.localStorage.removeItem(consts.SEC_SIDEBAR_COLLAPSE_KEY);

  Cookie.remove(consts.SIDEBAR_COLLAPSE_KEY);
  Cookie.remove(consts.SEC_SIDEBAR_COLLAPSE_KEY);
};

export const getMenusCollapseFromCookie = (req)=>{
  if (!req.headers.cookie) return {sidebarCollapse: true, secSidebarCollapse: false};
  let sidebarCollapse = req.headers.cookie.split(';').find(c => c.trim().startsWith(consts.SIDEBAR_COLLAPSE_KEY + '='));
  let secSidebarCollapse = req.headers.cookie.split(';').find(c => c.trim().startsWith(consts.SEC_SIDEBAR_COLLAPSE_KEY + '='));
  sidebarCollapse = sidebarCollapse ? sidebarCollapse.split('=')[1] === 'true' : true;
  secSidebarCollapse = secSidebarCollapse ? secSidebarCollapse.split('=')[1] === 'true' : false;
  return {sidebarCollapse, secSidebarCollapse};
};

export const getMenusCollapseFromLocalStorage = () =>{
  let sidebarCollapse = window.localStorage.getItem(consts.SIDEBAR_COLLAPSE_KEY);
  let secSidebarCollapse = window.localStorage.getItem(consts.SEC_SIDEBAR_COLLAPSE_KEY);
  sidebarCollapse = sidebarCollapse ? sidebarCollapse === 'true' : false;
  secSidebarCollapse = secSidebarCollapse ? secSidebarCollapse === 'true' : false;
  return {sidebarCollapse, secSidebarCollapse};
};

export const createMapOfRoutes = (menus) => {
  var mapMenus = {};
  for (let i in menus) {
    if (menus[i].hasOwnProperty('children') && menus[i].children.length > 0) {
      mapMenus = _.assignIn(mapMenus, createMapOfRoutes(menus[i].children));
    } else {
      // TODO sub格式相对固定
      // console.error(menus[i].sub);
      if (menus[i].hasOwnProperty('link') && menus[i].hasOwnProperty('sub')) {
        mapMenus[menus[i].link] = menus[i];
        // if (menus[i].sub.length > 0) {
        for (let ii in menus[i].sub) {
          if (menus[i].sub[ii].hasOwnProperty('children') && menus[i].sub[ii].children.length > 0) {
            // mapMenus = _.assignIn(mapMenus, createMapOfRoutes(menus[i].sub[ii].children));
            for (let iii in menus[i].sub[ii].children) {
              mapMenus[menus[i].sub[ii].children[iii].link] = menus[i];
            }
          }
        }
        // }
      }
    }
  }
  return mapMenus;
};
