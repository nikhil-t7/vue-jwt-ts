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
    <div class="form-group" style="margin:10px 0">
        <label for="text">Enter Phone Number</label>
        <input type="text" class="form-control" v-model="phNumber" placeholder="Phone Number">
    </div>
    <button style="margin:10px 0" class="btn btn-primary btn-block" @click="otpHandler()">Send OTP</button>
    <div class="form-group">
        <input type="text" class="form-control" v-model="otpCode" placeholder="Received OTP">
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
            invalidLogin : false,
            phNumber : '',
            otpCode :''
        }
    },
    computed:{
    ...mapGetters('auth',{
        getterLoginStatus:'getLoginStatus',
        getOtpVerificationStatus: 'isOtpVerified'
    })
    },
    methods:{
        ...mapActions('auth',{
            actionLogin:'login',
            actionGetOtp : 'getOTP',
            actionVerifyOtp : 'verifyOTP'
        }),
        
        async loginHandler(){

            if(this.username && this.password && this.phNumber){
                this.invalidLogin = false
                await this.actionVerifyOtp({phNumber:this.phNumber,code:this.otpCode})
            }
            //console.log(this.getOtpVerificationStatus+"From LoginCom")
            if(this.getOtpVerificationStatus === 'approved'){
                await this.actionLogin({username:this.username, password:this.password});
                if(this.getterLoginStatus === 'success'){
                    //alert('login success');
                    this.$router.push('/dashboard');
                }else{
                this.invalidLogin = true
                //alert('failed to login')
                }
            }
            else{
                this.invalidLogin = true
                //alert('failed to login')
            }
        },
        async otpHandler(){
            if(this.username && this.password && this.phNumber){
                await this.actionGetOtp({phNumber:this.phNumber})
            }else{
                this.invalidLogin = true
            }
            
        }
    }
});
</script>

    
<style>

    </style>
