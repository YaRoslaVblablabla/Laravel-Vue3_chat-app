<template>
    <div 
        v-if="store.state.change !== null"
        class="change-block"
    >
        <span class="font-semibold text-lg">change</span>
        <img 
            v-if="store.state.change.img != '' " 
            :src="'http://127.0.0.1:8000/storage'+store.state.change.img" 
            alt="there is no image" 
            class="w-64 "
        >
            <p 
                v-if="store.state.change.text" 
                class="text-base mt-2"
            > 
                {{  store.state.change.text }}
            </p>
            <span 
                @click="store.commit('updateChange', null)"
                class="ac-close"
            >   
                &#10006;
            </span>
        </div>
</template>

<script setup>
import { useStore } from "vuex"

let store = useStore()

</script>