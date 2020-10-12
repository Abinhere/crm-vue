import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuActive:'2'
  },
  mutations: {
    SET_MENU_ACTIVE (state,id){
      state.menuActive = id;
    }
  },
  actions: {
  },
  modules: {
  }
})
