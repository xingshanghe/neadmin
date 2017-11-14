import axios from 'axios';
import consts from '~/utils/consts.js';
import {setToken, jwtHeader} from '~/utils/auth.js';

export const state = () => {
  user: null;
};

export const mutations = {
  SET_USER: function(state, user) {
    state.user = user || null;
  }
};

export const getters = {
  isAuthenticated: function(state) {
    return !!state.user;
  },
  user: function(state) {
    return state.user;
  }
};

export const actions = {
  nuxtServerInit() {},
  async login({commit}, {username, password, captcha}) {
    try {
      const {code: code, data: {token: token, user: user}, msg: msg} = await axios.post(consts.API_URL + '/login', {username, password, captcha});
      if (code === 0) {
        setToken(token);
        jwtHeader(token);
        commit('SET_USER', user);
      } else {
        throw new Error(msg);
      }
    } catch (error) {
      let message = error.message;
      if (error.response.data) {
        message = error.response.data.message || message;
      }
      throw new Error(message);
    }
  }
};
