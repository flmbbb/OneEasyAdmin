import store, { TTokenInfo } from "@/store";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    children: [
    ]
}, {
    path: "/login",
    name: "Login",
    meta: {
        title: '登录'
    },
    component: () => import(
        /* webpackChunkName: "login" */
        "../views/Login.vue")
}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    //禁用前进后退
    scrollBehavior: () => {
        history.pushState(null, "", document.URL)
    }
});

//路由守卫,未验证的用户直接跳到登陆界面
router.beforeEach((to, from, next) => {
    // if (to.name !== 'Login' && !store.state.tokenInfo.isLogin) {
    //     //读取缓存
    //     store.state.tokenInfo = TTokenInfo.loadLocalStorage();
    //     //读缓存,有登陆的过的继续，没有的话跳转到登陆界面
    //     if (store.state.tokenInfo.isLogin) {
    //         next();
    //     }
    //     else {
    //         next({ name: 'Login' });
    //     }
    // }
    // else { next() }
    next() ;
});
export default router;