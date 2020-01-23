import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from "./routes";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/style.css'
Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
