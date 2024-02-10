<script setup>
    let props = defineProps({
        user: Object,
    })
</script>
<template>
    <div class="user-item">
        <h2 class="text-2xl font-medium">{{  user.name }}</h2>
        <p class="mb-2"> {{ user.email }}</p>
        <RouterLink 
            class="user-link" 
            :to="`/chat/id:${user.id}`"
        >
            mess
        </RouterLink>
    </div>
</template>