import {getMenusCollapseFromCookie, getMenusCollapseFromLocalStorage} from '~/utils/menus.js';

export default function({ isServer, store, req }) {
  if (isServer && !req) {
    return ;
  }
  const {sidebarCollapse: sidebarCollapse, secSidebarCollapse: secSidebarCollapse} = isServer ? getMenusCollapseFromCookie(req) : getMenusCollapseFromLocalStorage();
  store.commit('SET_MENUS_COLLAPSE', {sidebarCollapse, secSidebarCollapse});
};
