// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './share/store'
import ElementUI from 'element-ui' //引用element-ui
import 'element-ui/lib/theme-chalk/index.css' //引用element-ui css
import {initMenu} from './share/utils'
import {isNotNullORBlank} from './share/utils'
import './share/filter'
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.isNotNullORBlank = isNotNullORBlank;

router.beforeEach((to, from, next)=> {
    //用来解决动态路由下，页面刷新显示空白的问题。
    if (to.name == 'Redirect') {
      const nextRouterPath = to.params.targetRouter;
      if(undefined == nextRouterPath){
        next('/home');
      }else{
        next(nextRouterPath);
      }
      return;
    }
    if (to.name == 'Login') {
      next();
      return;
    }
    var name = store.state.user.name;
    if (name == 'not-login'){
      next({name: 'Login'});
    } else{
      initMenu(router, store, to);
      next();
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
