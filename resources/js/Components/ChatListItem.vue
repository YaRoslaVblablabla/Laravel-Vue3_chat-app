<script setup>

let props = defineProps({
    chat: Object,
})

</script>
<template>
    <div 
        class="chat-link "
    >
        <RouterLink 
            :to="`/chat/id:${chat[1].id}`"
        >
            <h3 class="text-2xl font-medium mb-2">{{  chat[1].name }}</h3>
            <img 
                v-if="chat[0]?.img" 
                :src="`http://127.0.0.1:8000/storage/${chat[0].img}`" 
                class="w-64 mb-3"
            >       
        <p v-if="chat[0].text">
            <span v-if="chat[0].user_id !== chat[1].id">You: </span>
            {{ chat[0].text.length > 20 ? chat[0].text.slice(0, 40)+'...' : chat[0].text }}
        </p>
            
        </RouterLink>    
    </div>
</template>