<template>
    
    <div class="header">
        <span class="text-white text-xl font-bold">
            {{ store.state.user?.name }}
        </span>
        
        <button
            @click="store.dispatch('logout')" 
            class="logout"
        >
            Logout
        </button>
    </div>
    
    <div class="flex justify-between mt-7 ">
        <div class="tab-container">
            <router-link 
                class="tab" 
                @click="store.commit('updateSearchInput', '')" 
                to="/users"
            >
                Users
            </router-link>
            <router-link 
                class="tab" 
                @click="store.commit('updateSearchInput', '')" 
                to="/chats"    
            >
                My chats
            </router-link>
        </div>
        <div id="search" ></div>
    </div>
   
    <RouterView></RouterView>
  
</template>
    
<script setup>

import { onMounted } from 'vue'
import { useStore } from "vuex"

let store = useStore()   
    
onMounted(
   store.dispatch('fetchUser')
)
</script>