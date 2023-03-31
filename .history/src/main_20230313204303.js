import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

import App from './App.vue'
import './index.css'
import router from './router/router.js'
import VueCookies from 'vue-cookies'
import Vuex from 'vuex';

// import store from './store/index.js'


const app=createApp(App)
app.config.globalProperties.$cookies = VueCookies
app.config.globalProperties.$basedir = "VueCookies"
// app.config.globalProperties.$cookies = VueCookies



// app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(Vuex)
// app.use(VueCookies)

// 添加到vue对象上，可以在全局通过 this.$axios来调用
// app.config.globalProperties.$cookies = VueCookies




// export default new Vuex.Store({
//   state: {
//     // 应用程序的状态
//     videoPath:""
//   },
//   mutations: {
//     // 修改状态的方法
//     changePath: (state,path) => {
//       state.videoPath = path;
//     }
//   },
//   actions: {
//     // 异步操作的方法
//   },
//   getters: {
//     // 计算属性
//        //get方法
//     getVideoPath: state => state.videoPath
//   }
// });


app.mount('#app') 



 
 