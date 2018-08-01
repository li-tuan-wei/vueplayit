import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: window.sessionStorage.getItem('user' || '[]') == null ? 'not-login' : JSON.parse(window.sessionStorage.getItem('user' || '[]')).name
    },
    routes: [],
    menuItems: window.sessionStorage.getItem('menuItems' || '[]') == null ? [] : JSON.parse(window.sessionStorage.getItem('menuItems' || '[]'))
  },
  mutations: {
    initMenu(state, menus){
      state.routes = menus;
    },
    login(state, data){
      state.user = data.user;
      state.menuItems = data.menuItems;

      window.sessionStorage.setItem('user', JSON.stringify(data.user));
      window.sessionStorage.setItem('menuItems', JSON.stringify(data.menuItems));
    }
  },
  actions: {
    connect(context){
    }
  }
});
