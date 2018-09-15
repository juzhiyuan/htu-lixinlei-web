import Vue from 'vue'
import MuseUI from 'muse-ui'

import App from './App.vue'
import router from './router'
import store from './store'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
