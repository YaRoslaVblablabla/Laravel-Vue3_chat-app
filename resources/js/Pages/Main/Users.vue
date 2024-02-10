<template>
    <div>
        <UserListItem
            v-for="user in usersList" 
            :key="user.id"
            :user = "user"
        />

        <SearchComponent :options="options" />
    </div>
</template>

<script setup>
import UserListItem from '../../Components/UserListItem.vue'
import SearchComponent from '../../Components/SearchComponent.vue'

import { onMounted, computed } from 'vue'
import { useStore } from "vuex"

let options = [
    { title: 'Name', value: 'name' },
    { title: 'Mail', value: 'email'}
]

let store = useStore()
let usersList = computed(() => store.getters.searchUsers )

onMounted(
    store.dispatch('fetchUsers'), 
)
</script>