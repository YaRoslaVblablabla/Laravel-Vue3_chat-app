<template>
    <teleport  to="#search">
        <div class="search-block">
            <img 
                src="http://127.0.0.1:8000/search.png" 
                width="30" 
                class="mr-3" 
                alt=""
            >
            <input 
                type="text"
                placeholder="Search"
                class="mr-3"
                @input="store.commit('updateSearchInput', searchInput)"
                v-model="searchInput"
            >
            <select 
                v-if="options"
                @change="store.commit('updateSearchSelect', select)" 
                v-model="select"
            >
                <option 
                    v-for="option in props.options" 
                    :value="option.value"
                    :key="option.value"
                >
                    {{  option.title }}
                </option>
            </select>
        </div>
    </teleport>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useStore } from "vuex"

const props = defineProps({
  options: Array
})

let store = useStore()

let searchInput = ref('')
let select = ref('name')

onMounted(
    store.commit('updateSearchSelect', 'name')
)

</script>

<style scoped>
</style>