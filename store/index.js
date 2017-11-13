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
