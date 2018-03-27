import { getMenusCollapseFromCookie, getMenusCollapseFromLocalStorage, createMapOfRoutes, getMapOfRoutes } from '~/utils/menus.js';
import { getMenusFromCookie, getMenusFromLocalStorage} from '~/utils/auth.js';
import { getLinkFromRoute } from '~/utils/menus.js';

export default function({isDev, store, req, route, params, error}) {

  let path = route.path;
  path = getLinkFromRoute({path, params});
  // //////////处理当前路径//////////

  if (path.indexOf('/:') > -1) {
    [path] = path.split('/:');
  }

  if (process.server && !req) {
    return ;
  }
  const menus = process.server ? getMenusFromCookie(req) : getMenusFromLocalStorage();
  store.commit('SET_MENUS', menus);

  let mapMenus = getMapOfRoutes(createMapOfRoutes(menus));
  store.commit('SET_MENU_MAP_OF_ROUTES', mapMenus);

  // //////////判断路由是否合法//////////
  if (menus && (store.state.menuMapOfRoutes[path] === undefined)) {
    console.error(path);
    if (isDev) {
      error({statusCode: 403, message: 'Access Denied'});
    } else {
      error({statusCode: 404, message: 'This page could not be found'});
    }
  }

  const menusCollapse = process.server ? getMenusCollapseFromCookie(req) : getMenusCollapseFromLocalStorage();
  store.commit('SET_MENUS_COLLAPSE', menusCollapse);
};
