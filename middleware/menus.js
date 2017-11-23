import {getMenusCollapseFromCookie, getMenusCollapseFromLocalStorage} from '~/utils/menus.js';

export default function({ isServer, store, req }) {
  if (isServer && !req) {
    return ;
  }
  const menusCollapse = isServer ? getMenusCollapseFromCookie(req) : getMenusCollapseFromLocalStorage();
  store.commit('SET_MENUS_COLLAPSE', menusCollapse);
};
