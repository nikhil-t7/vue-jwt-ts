<template>
    <div>
        <h3>Welcome</h3>
        <div>
            <h3 id="userName">User Name : {{gettersAuthData.userName}}</h3>
        </div>
        <div>
            <h3 id="userId">User Id : {{gettersAuthData.userId}}</h3>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'
export default defineComponent({
    name:'DashboardCom',
    computed:{
        ...mapGetters('auth',{
            gettersAuthData:'getAuthData'
        })
    }
});
</script>

<style >
</style>
