<template>
    <div>
        <ChatTopBar />

        <div class="bg-zinc-100 mx-5 px-2 py-4 w-1/2">
            <div class="chat-container" style="max-height: 650px;" id="block">
                
                <MessageListItem  
                    v-for="mess in searchedMessages"
                    :key="mess.id"
                    :mess ="mess"
                />

            </div>

            <AnswerBlock />

            <ChangeBlock />
            
            <FormComponent />
        </div>

        <SearchComponent />
        
        <Loading :loading="store.state.loading" />

    </div>

    <ImgModal />
</template>

<script setup>
import AnswerBlock from '../../Components/AnswerBlock.vue'
import ChangeBlock from '../../Components/ChangeBlock.vue'
import ImgModal from '../../Components/ImgModal.vue'
import MessageListItem from '../../Components/MessageListItem.vue'
import ChatTopBar from '../../Components/ChatTopBar.vue'
import FormComponent from '../../Components/FormComponent.vue'
import Loading from '../../Components/Loading.vue'
import SearchComponent from '../../Components/SearchComponent.vue'

import { onMounted, computed, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from "vuex"

let store = useStore()
const route = useRoute()

let userId = computed(() => route.path.split('/').pop().slice(3))
let searchedMessages = computed(() => store.getters.searchMessages )

onMounted(
    
    store.commit('resetChatData'),
    store.dispatch('fetchUserRoomMessages', userId.value),
    
    window.Echo.channel('store-message')
    .listen('.store-message', res => {
        let item = store.state.messages.find(item => item.id == res.message.id) 

        if(store.state.messages.includes(item))
            store.commit('updateMessage', res.message)
        else
            store.commit('addMessage', res.message)
    }),

    window.Echo.channel('delete-message')
    .listen('.delete-message', res => store.commit('deleteMessage', res.id) )
)

onBeforeUnmount(() => {
    window.Echo.channel('store-message')
    .stopListening('.store-message')
    .stopListening('.delete-message')
})

</script>

