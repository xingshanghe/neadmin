import consts from '~/utils/consts.js';
import Cookie from 'js-cookie';

// 客户端设置菜单状态
export const setMenusCollapse = ({sidebarCollapse, secSidebarCollapse}) => {
  if (process.SERVER_BUILD) return;
  window.localStorage.setItem(consts.SIDEBAR_COLLAPSE_KEY, sidebarCollapse);
  window.localStorage.setItem(consts.SEC_SIDEBAR_COLLAPSE_KEY, secSidebarCollapse);

  Cookie.set(consts.SIDEBAR_COLLAPSE_KEY, sidebarCollapse);
  Cookie.set(consts.SEC_SIDEBAR_COLLAPSE_KEY, secSidebarCollapse);
};

// 客户端删除菜单状态
export const unsetMenusCollapse = ()=>{
  if (process.SERVER_BUILD) return;
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
  let collapse = window.localStorage.getItem(consts.SIDEBAR_COLLAPSE_KEY);
  let secCollapse = window.localStorage.getItem(consts.SEC_SIDEBAR_COLLAPSE_KEY);
  collapse = collapse === 'true';
  secCollapse = secCollapse === 'true';
  return {collapse, secCollapse};
};
