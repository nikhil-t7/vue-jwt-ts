<template>
<form @submit.prevent="" novalidate>
    <h3>Login</h3>
    <div v-if="invalidLogin" class="alert alert-danger" role="alert">
        Login Failed. Try Again.
    </div>
    <div class="form-group">
        <label for="userName">User Name</label>
        <input type="text" class="form-control" v-model="username" placeholder="User Name">
    </div>
    <br />
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="password">
    </div>
    <br />
    <button class="btn btn-primary btn-block" @click="loginHandler()">Login</button>
</form>
</template>

    
<script lang="ts">
import { defineComponent } from 'vue';
import {mapActions, mapGetters} from 'vuex';
export default defineComponent ({
    name: 'LoginCom',
    data() {
        return {
            username: '',
            password: '',
            invalidLogin : false
        }
    },
    computed:{
    ...mapGetters('auth',{
        getterLoginStatus:'getLoginStatus'
    })
    },
    methods:{
        ...mapActions('auth',{
            actionLogin:'login'
        }),
        async loginHandler(){
            await this.actionLogin({username:this.username, password:this.password});
            if(this.getterLoginStatus === 'success'){
                //alert('login success');
                this.$router.push('/dashboard');
            }else{
                this.invalidLogin = true
                //alert('failed to login')
            }
        }
    }
});
</script>

    
<style>

    </style>
