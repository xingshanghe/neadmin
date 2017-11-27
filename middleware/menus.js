import {getMenusCollapseFromCookie, getMenusCollapseFromLocalStorage, createMapOfRoutes} from '~/utils/menus.js';
const allmenudata = require('~/static/menu.json');

export default function({ isServer, store, req }) {
  if (isServer && !req) {
    return ;
  }
  // TODO 存储路由 对 菜单状态的选择
  console.log(createMapOfRoutes(allmenudata));

  const menusCollapse = isServer ? getMenusCollapseFromCookie(req) : getMenusCollapseFromLocalStorage();
  store.commit('SET_MENUS_COLLAPSE', menusCollapse);
};
