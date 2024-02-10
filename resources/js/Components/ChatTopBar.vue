<template>
    <div class="chat-topbar">
            <span 
                v-if="store.state.secondUser != null" 
                class="text-xl font-base"
            >
                {{ store.state.secondUser?.name }} 
            </span>

            <span v-else class="text-xl font-base text-zinc-100">q</span>
        </div>
</template>

<script setup>
import { useStore } from "vuex"

let store = useStore()
</script>