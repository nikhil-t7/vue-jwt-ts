import { createRouter, createWebHistory } from 'vue-router'
import HomeCom from './components/HomeCom.vue'
import LoginCom from './components/LoginCom.vue'
import RegisterCom from './components/RegisterCom.vue'
import DashboardCom from './components/DashboardCom.vue'
import store from "./store/index";

const routes = [
        {
            path:'/',
            name:'home',
            component:HomeCom,
            meta:{authRequired:false}
        },
        {
            path:'/login',
            name:'login',
            component:LoginCom,
            meta:{authRequired:false}
        },
        {
            path:'/register',
            name:'register',
            component:RegisterCom,
            meta:{authRequired:false}
        },
        {
            path:'/dashboard',
            name:'dashboard',
            component:DashboardCom,
            meta:{authRequired:true}
        }
    ];

export const routeConfig = createRouter({
    history: createWebHistory(),
    routes: routes
});

routeConfig.beforeEach((to,from, next) => {
    //console.log('to path '+to.fullPath)
    //To Check authentication when user trying to access dashboard
    //after closing the browser but check for access token stored 
    //in local browse and save 
    const authData = store.getters["auth/getAuthData"];
    console.log("Check token When browser closed "+authData.token)
    if(!authData.token){
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        if(access_token){
            const data = {
                access_token:access_token,
                refresh_token:refresh_token
            };
            store.commit('auth/saveTokenData',data);
        }
    }

    const isAuthenticated = store.getters["auth/isTokenActive"];
    console.log("Authenticated "+isAuthenticated)
    if(to.fullPath === '/'){
        return next()
    }//if user is authenticated and trying to access the login page 
    //then let them access the dashboard
    else if(isAuthenticated && !to.meta.authRequired){ 
        console.log("You are authenticated You'll be redirected to dashboard page.")
        return next({path:"/dashboard"})
    }
    //if not authenticated and trying to access the dashboard page
    //redirect to login page
    else if(!isAuthenticated && to.meta.authRequired){
        return next({path:"/login"})
    }
    return next();
    
});