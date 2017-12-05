import Vue from 'vue';
import * as filters from '~/filters/index.js';

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
