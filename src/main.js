import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// reset css to remove all browser
import './assets/reset.css';

new Vue({
  render: h => h(App)
}).$mount('#app');
