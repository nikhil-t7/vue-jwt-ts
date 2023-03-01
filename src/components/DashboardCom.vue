<template>
    <div>
        <h3>Welcome</h3>
        <div>
            <h3 id="userName">User Name : {{gettersAuthData.userName}}</h3>
        </div>
        <div>
            <h3 id="userId">User Id : {{gettersAuthData.userId}}</h3>
        </div>
        <div >
            <button class="btn btn-primary btn-block" @click="logout()">Logout</button>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters ,mapActions} from 'vuex'
export default defineComponent({
    name:'DashboardCom',
    computed:{
        ...mapGetters('auth',{
            getterLoginStatus:'getLoginStatus',
            gettersAuthData:'getAuthData'
        })
    },
    methods:{
        ...mapActions('auth', {
                actionLogout: 'logout'
        }),
        logout(){
            if(this.getterLoginStatus === 'success'){
                this.actionLogout()
                console.log('logout called')
                this.$router.push('/login');
            }

        }
    }
});
</script>

<style >
</style>
