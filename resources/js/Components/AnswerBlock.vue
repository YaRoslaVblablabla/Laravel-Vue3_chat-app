<template>
    <div 
        v-if="store.state.answer !== null"
        class="answer-block"
    >
        <span class="font-semibold text-lg">answer</span>
        <img 
            v-if="store.state.answer.img != '' " 
            :src="'http://127.0.0.1:8000/storage'+store.state.answer.img" 
            alt="there is no image" 
            class="w-64 "
        >
        <p 
            v-if="store.state.answer.text" 
            class="text-base mt-2"
        > 
            {{  store.state.answer.text }}
        </p>
        <span 
            @click="store.commit('updateAnswer', null)"
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