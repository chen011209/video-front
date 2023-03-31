import { createRouter,createWebHistory} from "vue-router";

// 路由信息
const routes = [
    {
        path: "/",
        name: "Index",
        component:  () => import('../components/Login.vue'),
    },
    {
        path: "/login",
        name: "Login",
        component:  () => import('../components/Login.vue'),
    },
    {
        path: "/register",
        name: "Register",
        component:  () => import('../components/Register.vue'),
    },
    {
        path: "/home",
        name: "Home",
        meta: { noCache: true },
        component:  () => import('../components/Home.vue'),
    },
    {
        path: "/upload",
        name: "Upload",
        component:  () => import('../components/Upload.vue'),
    },
    {
        path: "/checklist",
        name: "CheckList",
        component:  () => import('../components/CheckList.vue'),
    },
    {
        path: "/checkVideo",
        name: "CheckVideo",
        component:  () => import('../components/CheckVideo.vue'),
    },
    {
        path: "/popularList",
        name: "PopularList",
        component:  () => import('../components/PopularList.vue'),
    },
    {
        path: "/video",
        name: "Video",
        component:  () => import('../components/Video.vue'),
    },
    {
        path: "/user",
        name: "User",
        component:  () => import('../components/User.vue'),
    },
    {
        path: "/empty",
        name: "empty",
        component:  () => import('../components/empty.vue'),
    },
    {
        path: "/collect",
        name: "Collect",
        meta: { noCache: true },
        component:  () => import('../components/Collect.vue'),
    },
    {
        path: "/history",
        name: "History",
        component:  () => import('../components/History.vue'),
    },
    {
        path: "/search",
        name: "Search",
        component:  () => import('../components/Search.vue'),
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

import { ElMessage } from "element-plus";
router.beforeEach((to, from, next) => {
  // 获取用户登录状态
  const isLoggedIn = localStorage.getItem('token')
  // 如果用户已登录，则允许访问所有页面


  if (isLoggedIn || to.path === '/login' || to.path === '/register' ||to.path ==='/') {
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

export default router;