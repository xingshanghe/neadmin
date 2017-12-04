
import Vue from 'vue';
import api from '~/api/index.js';

Vue.use({
  install: function(Vue) {
    Vue.prototype.api = api;
  }
});
