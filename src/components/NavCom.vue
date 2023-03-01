<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
        <div class="container">
            <router-link to="/" class="navbar-brand">Home</router-link>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link">Sign Up</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "NavCom",
    
    
});
</script>

<style scoped></style>
