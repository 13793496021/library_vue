// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


axios.defaults.baseURL = 'http://localhost:8443/api'
axios.defaults.withCredentials = true //允许跨域携带cookie

Vue.prototype.$http=axios;//修改内部的$http为axios
Vue.config.productionTip = false
Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    if(localStorage.getItem("userId")) {
      if(to.meta.requireJudge){
        axios.post('/router').then(res => {
          if(res.data.code === 0) {
            next()
          } else {
            next({
              path: '/error403',
              query: {redirect: to.fullPath}
            })
          }
        })
      } else {
        next()
      }
      //next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
