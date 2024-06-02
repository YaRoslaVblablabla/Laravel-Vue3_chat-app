<template>
<div>
    <div class="mx-auto mt-24 w-2/3 ">
    <Tabs></Tabs>
    <form @submit.prevent="auth" class="auth-form">
        
        <h2 class="form-title">Authorization</h2>
        <input 
            v-model="email" 
            type="email" 
            class="inp" 
            placeholder="Email"
        ><br>

        <input 
            v-model="password" 
            type="password" 
            class="inp" 
            placeholder="Password"
        ><br>
        
        <div class="flex justify-center mt-10">
            <button type="submit" class="btn-auth">Log in</button>
        </div>
    </form>   
</div>

<Loading :loading="store.state.loading" />

</div>
</template>

<script setup>
import Loading from '../../Components/Loading.vue'
import Tabs from '../../Components/Tabs.vue'
import { ref } from 'vue'
import { useStore } from "vuex"

let store = useStore()

let email = ref('')
let password = ref('')

function auth(){
    let person = {
        email: email.value,
        password: password.value,
    }

    store.dispatch('login', person)  
}

</script>