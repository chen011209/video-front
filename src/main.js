import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

import App from './App.vue'
import './index.css'
import router from './router/router.js'
import VueCookies from 'vue-cookies'
const app=createApp(App)
app.config.globalProperties.$cookies = VueCookies
app.config.globalProperties.$basedir = "VueCookies"
// app.config.globalProperties.$cookies = VueCookies




app.use(router)
app.use(ElementPlus)
// app.use(VueCookies)

// 添加到vue对象上，可以在全局通过 this.$axios来调用
// app.config.globalProperties.$cookies = VueCookies


import { ElMessage } from "element-plus";
router.beforeEach((to, from, next) => {
  // 获取用户登录状态
  const isLoggedIn = localStorage.getItem('token')
  // 如果用户已登录，则允许访问所有页面


  if (isLoggedIn || to.path === '/login' || to.path === '/register') {
    next();
  } else {
    // 如果用户未登录，则跳转到登录页面

    ElMessage({
        showClose: true,
        message: "请先登录",
        type: "error",
      });

    next('/login')
  }
})


app.mount('#app') 



 
 