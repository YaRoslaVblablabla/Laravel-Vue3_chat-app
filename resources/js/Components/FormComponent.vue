<template>
    <form 
        @submit.prevent="submitClick"
        class="mt-3 w-1/3 mx-auto"
    >
        <input 
            type="text" 
            class="rounded-lg w-full" 
            v-model="inpText"
        >
        <button 
            type="submit" 
            class="my-2 rounded-lg bg-emerald-900 hover:bg-emerald-700 transition-colors                                                                                           px-5 py-2 text-white "
        >
            send
        </button>
        <input  
            type="file" 
            @change="q" 
            class="inp-file"
        >
    </form>
    
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from "vuex"

let store = useStore()

let inpText = ref('')
let inpFile = ref(null)

function q(e){
  inpFile.value = e.target.files[0]
}

function submitClick(){
    
    let form = new FormData()
    store.state.loading = true
    form.append('img', inpFile.value)
    form.append('text', inpText.value)

    store.dispatch('submitClick', form)
    inpText.value = ''
    inpFile.value = null
}

</script>
