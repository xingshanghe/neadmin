import axios from 'axios';
import consts from '~/utils/consts.js';
import {setToken, jwtHeader} from '~/utils/auth.js';
import {setMenusCollapse} from '~/utils/menus.js';

export const state = () => {
  return {
    user: null,
    sidebarCollapse: true,
    secSidebarCollapse: false
  };
};

export const mutations = {
  SET_USER: function(state, user) {
    state.user = user || null;
  },
  SET_MENUS_COLLAPSE: function(state, {sidebarCollapse, secSidebarCollapse}) {
    state.sidebarCollapse = sidebarCollapse;
    state.secSidebarCollapse = secSidebarCollapse;
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
  }
};

export const actions = {
  nuxtServerInit() {},
  menusCollapse({commit}, {sidebarCollapse, secSidebarCollapse}) {
    commit('SET_MENUS_COLLAPSE', {sidebarCollapse, secSidebarCollapse});
    setMenusCollapse({sidebarCollapse, secSidebarCollapse});
  },
  async login({commit}, {username, password, captcha}) {
    try {
      const {data: {code: code, data: {token: token, user: user}, msg: msg}} = await axios.post(consts.API_URL + '/accounts/login', {username, password, captcha});
      if (code === 0) {
        setToken(token);
        jwtHeader(token);
        commit('SET_USER', user);
      } else {
        throw new Error(msg);
      }
    } catch (error) {
      console.error(error);
      let message = error.message;
      // if (error.response.data) {
      //   message = error.response.data.message || message;
      // }
      throw new Error(message);
    }
  }
};

