import axios from 'axios';
import consts from '~/utils/consts.js';
import {setToken, setUser, jwtHeader, setAll} from '~/utils/auth.js';
import {setMenusCollapse} from '~/utils/menus.js';

export const state = () => {
  return {
    user: null,
    access_token: null,
    sidebarCollapse: false,
    secSidebarCollapse: false,
    mapOfRoutes: null
  };
};

export const mutations = {
  SET_USER: function(state, user) {
    state.user = user || null;
  },
  SET_ACCESS_TOKEN: function(state, access_token) {
    state.access_token = access_token || null;
  },
  SET_MENUS_COLLAPSE: function(state, {sidebarCollapse, secSidebarCollapse}) {
    state.sidebarCollapse = sidebarCollapse;
    state.secSidebarCollapse = secSidebarCollapse;
  },
  SET_MAP_OF_ROUTES: function(state, mapOfRoutes) {
    state.mapOfRoutes = mapOfRoutes;
  }
};

export const getters = {
  isAuthenticated: function(state) {
    return !!state.user;
  },
  sidebarCollapse: function(state) {
    return state.sidebarCollapse;
  },
  secSidebarCollapse: function(state) {
    return state.secSidebarCollapse;
  },
  user: function(state) {
    return state.user;
  },
  mapOfRoutes: function(state) {
    return state.mapOfRoutes;
  }
};

export const actions = {
  nuxtServerInit() {},
  menusCollapse({commit}, {sidebarCollapse, secSidebarCollapse}) {
    commit('SET_MENUS_COLLAPSE', {sidebarCollapse, secSidebarCollapse});
    setMenusCollapse({sidebarCollapse, secSidebarCollapse});
  },
  mapOfRoutes({commit}, mapOfRoutes) {
    commit('SET_MAP_OF_ROUTES', mapOfRoutes);
  },
  async login({commit}, {username, password, captcha}) {
    try {
      const {data: {code: code, data: {token: token, account: account}, msg: msg}} = await axios.post(consts.API_URL + '/accounts/login', {username, password, captcha});
      if (code === 0) {
        setToken(token);
        setUser(JSON.stringify(account));
        jwtHeader(token);
        commit('SET_USER', account);
      } else {
        throw new Error(msg);
      }
    } catch (error) {
      let message = error.message;
      // if (error.response.data) {
      //   message = error.response.data.message || message;
      // }
      throw new Error(message);
    }
  },
  async loginOauth({commit}, {access_token}) {
    commit('SET_USER', {
      username: 'zxc'
    });
    setUser(JSON.stringify({
      username: 'zxc'
    }));
    setAll('access_token', access_token);
    commit('SET_ACCESS_TOKEN', access_token);
  }
};

