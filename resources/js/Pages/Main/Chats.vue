<template>
    <div>
        <ChatListItem
            v-for="(chat, id) in searchChats"
            :chat="chat"
            :key="id"
        />

        <SearchComponent :options="options" />
    </div>
</template>

<script setup>
import SearchComponent from '../../Components/SearchComponent.vue'
import ChatListItem from '../../Components/ChatListItem.vue'

import { onMounted, computed } from 'vue'
import { useStore } from "vuex"

let store = useStore()
let searchChats = computed(() =>  store.getters.searchChats )

let options = [
    { title: 'Name', value: 'name' },
    { title: 'Message', value: 'message'}
]

onMounted(
    store.dispatch('fetchChats')
)
</script>