<template>
    <div 
        @click="store.commit('imgModal', null)"
        v-if="store.state.imgModal"
        class="fixed text-3xl bg-gray-950 bg-opacity-85 flex justify-center items-center inset-0"
    >
        <div class="relative">
            <img 
                @click.stop 
                v-if="store.state.imgModal"
                class="max-w-6xl" 
                :src="'http://127.0.0.1:8000/storage'+store.state.imgModal"  
            >
            <span 
                @click="store.commit('imgModal', null)"
                class="text-rose-800 text-6xl cursor-pointer transition-colors hover:text-rose-600 absolute font-mono top-3 right-3"
            >   
                &#10006;
            </span>
        </div>
    </div>
</template>

<script setup>
import { useStore} from "vuex"

let store = useStore()
</script>
