<template>
    <div class="mx-auto mt-24 w-2/3 ">
        <Tabs></Tabs>
        <form @submit.prevent="reg" class="auth-form">
            <h2 class="form-title">registration</h2>
            
            <input 
                v-model="name" 
                type="text" 
                class="inp" 
                placeholder="Name"
            >
            <br>
            
            <input 
                v-model="email" 
                type="email" 
                class="inp" 
                placeholder="Email"
            >
            <br>
            
            <input 
                v-model="password" 
                type="password" 
                class="inp" 
                placeholder="Password"
            >
            <br>
            
            <input 
                v-model="password_confirmation" 
                type="password" 
                class="inp" 
                placeholder="Password Confirmation"
            >
            
            <div class="flex justify-center mt-10">
                <button type="submit" class="btn-auth">Sign Up</button>
            </div>
            
        </form>   
    </div>
    <Loading :loading="store.state.loading" />
</template>
    
<script setup>
import Tabs from '../../Components/Tabs.vue'
import Loading from '../../Components/Loading.vue'
import { ref } from 'vue'
import { useStore } from "vuex"

let store = useStore()
let name = ref('')
let email = ref('')
let password = ref('')
let password_confirmation = ref('')

function reg(){
    let regData = {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value
    }

    store.dispatch('register', regData)   
}
    
</script>