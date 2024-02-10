<script setup>

let props = defineProps({
    loading: Boolean,
})

</script>

<template>
    <div v-if="loading" class="loading">LOADING...</div> 
</template>