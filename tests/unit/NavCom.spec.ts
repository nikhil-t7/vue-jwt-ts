import { shallowMount } from '@vue/test-utils';
import NavCom from '@/components/NavCom.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeCom from '@/components/HomeCom.vue'
import LoginCom from '@/components/LoginCom.vue'
import RegisterCom from '@/components/RegisterCom.vue'
import DashboardCom from '@/components/DashboardCom.vue'

describe('NavCom.vue', () => {
    it('renders the correct navbar links', () => {
    const router = createRouter({
        history: createWebHistory(),
        routes: [
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
        ],
    });

    const wrapper = shallowMount(NavCom, {
        global: {
        plugins: [router],
        },
    });

    //console.log(wrapper.html())
    const homeLink = wrapper.find('[to="/"]');
    expect(homeLink.exists()).toBe(true);

    const loginLink = wrapper.find('[to="/login"]');
    expect(loginLink.exists()).toBe(true);

    const signUpLink = wrapper.find('[to="/register"]');
    expect(signUpLink.exists()).toBe(true);

    const dashboardLink = wrapper.find('[to="/dashboard"]');
    expect(dashboardLink.exists()).toBe(true);

    });
});