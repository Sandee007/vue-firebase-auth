// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// create global filter
Vue.filter('snippet', val => {
  // post == val
  if(!val  || typeof(val) != 'string' ) return '';
  val = val.slice(0,50);
  return val + '...see more';
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
