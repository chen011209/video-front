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


app.mount('#app') 



 
 