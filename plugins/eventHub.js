import Vue from 'vue';

Vue.use({
  install: function(Vue) {
    Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
  }
});
