<template>

<div 
    :class="props.mess.user_id == store.state.secondUser.id ? 'mess-user mb-3' : 'mess-me mb-3'"
>
    <div 
        v-if="answer" 
        class="bg-emerald-600 px-2 py-1 text-white"
    >
        <img 
            v-if="answer?.img"    
            :src="'http://127.0.0.1:8000/storage'+answer.img"
            class="w-64 mb-3 cursor-pointer"
            @click="store.commit('imgModal', answer.img)" 
        >
        <p>{{ answer?.text }}</p>
    </div>

    <div 
        class="mess "
        :class="props.mess.user_id == store.state.secondUser.id ? 'mess-user' : 'mess-me'"
    >
        <img 
            v-if="props.mess.img" 
            :src="'http://127.0.0.1:8000/storage'+props.mess.img" 
            alt="there is no image" 
            class="w-64 mb-3 cursor-pointer"
            @click="store.commit('imgModal', props.mess.img)"
        >
        <p v-if="props.mess.text">{{ props.mess?.text }}</p>
        <div class="mt-3">
            <div>
                <span 
                    class="mess-btn hover:text-zinc-400"
                    @click="store.commit('updateAnswer', mess)"
                >
                    answer
                </span>
                
                <span 
                    v-if="props.mess.user_id == store.state.user.id"
                    @click="store.commit('updateChange', mess)"
                    class="mess-btn mx-3 hover:text-emerald-400"
                >
                    change
                </span>
                                    
                <span 
                    v-if="props.mess.user_id == store.state.user.id"
                    class="mess-btn hover:text-rose-400"
                    @click=" store.dispatch('deleteMessage', props.mess.id) "
                >
                    delete
                </span>

            </div>
        </div>
    </div> 
</div>

</template>

<script setup>
import { computed } from "vue";
import { useStore} from "vuex"

let props = defineProps({
    mess: Object,
})

let answer = computed(() => store.state.messages.find(item => item.id == props.mess?.answer))
let store = useStore()

</script>