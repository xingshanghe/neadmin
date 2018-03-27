import Vue from 'vue';
import api from '~/api/index.js';
import axios from '~/api/axios.js';

Vue.use({
  install: function(Vue) {
    Vue.prototype.$api = api;
    Vue.prototype.$axios = axios;
  }
});
