import axios from 'axios';
import consts from '~/utils/consts.js';
import { setAll} from '~/utils/index.js';
import { setAllByJwt, removeSoOn, setMenus, unsetMenus } from '~/utils/auth.js';
import { setMenusCollapse } from '~/utils/menus.js';

export const state = () =>{
  return {
    user: null,
    roles: null,
    exp: 0,
    sidebarCollapse: false,
    secSidebarCollapse: false,
    menuMapOfRoutes: null,
    menus: null
  };
};

export const mutations = {
  SET_JWT_DATA: function(state, jwtData) {
    let now = Math.round(new Date() / 1000);
    if (jwtData.exp < now) {
      state.user = null;
    } else {
      state.user = jwtData.account;
      state.roles = jwtData.roles;
      state.exp = jwtData.exp;
    }
  },
  DEL_JWT_DATA: function(state) {
    state.user = null;
    state.roles = null;
    state.exp = 0;
  },
  SET_MENUS: function(state, menus) {
    state.menus = menus;
  },
  SET_MENUS_COLLAPSE: function(state, {sidebarCollapse, secSidebarCollapse}) {
    state.sidebarCollapse = sidebarCollapse === 'true';
    state.secSidebarCollapse = secSidebarCollapse === 'true';
  },
  SET_MENU_MAP_OF_ROUTES: function(state, menuMapOfRoutes) {
    state.menuMapOfRoutes = menuMapOfRoutes;
  }
};

export const getters = {
  isAuthenticated: function(state) {
    return !!state.user;
  }
};

export const actions = {
  nuxtServerInit() {},
  menusCollapse({commit}, {sidebarCollapse, secSidebarCollapse}) {
    commit('SET_MENUS_COLLAPSE', {sidebarCollapse, secSidebarCollapse});
    setMenusCollapse({sidebarCollapse, secSidebarCollapse});
  },
  async login({}, {username, password, captcha, keepLogin}) {
    if (keepLogin) {
      setAll(consts.KEEP_LOGIN_KEY, keepLogin);
    }
    try {
      const {data: {code: code, data: {token: token, menus: menus}, msg: msg}} = await axios.post(consts.API_URL + '/accounts/login', {username, password, captcha});
      if (code === 0) {
        setAllByJwt(token);
        // commit('SET_JWT_DATA', setAllByJwt(token));
        setMenus(JSON.stringify(menus));
      } else {
        throw new Error(msg);
      }
    } catch (error) {
      let message = error.message;
      throw new Error(message);
    }
  },
  async logout({commit}) {
    removeSoOn();
    unsetMenus();
    commit('DEL_JWT_DATA');
  }
};
