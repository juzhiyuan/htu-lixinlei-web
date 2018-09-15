import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appbarTitle: ''
  },
  mutations: {
    updateAppbarTitle (state, value) {
      state.appbarTitle = value
    }
  },
  actions: {

  }
})
