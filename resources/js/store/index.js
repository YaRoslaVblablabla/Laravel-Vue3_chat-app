import { createStore } from 'vuex'
import router from '../router.js'

const store = createStore({
    state: {
        user: null,
        secondUser: null,

        users: [],
        chats: [],
        messages: [],
        room: null,

        searchInput: '',
        searchSelect: 'name',
        loading: false,

        change: null,
        answer: null,

        imgModal: null
    },

    getters: {
        getUsers(state){
            return state.users
        },

        getChats(state){
            return state.chats
        },

        searchUsers(state){
            if(state.searchSelect == 'name')
                return state.users.filter(u => u.name.trim().toLowerCase().includes(state.searchInput.trim().toLocaleLowerCase()) )
            else
                return state.users.filter(u => u.email.trim().toLowerCase().includes(state.searchInput.trim().toLocaleLowerCase()) )
        },

        searchChats(state){
            if( state.searchSelect == 'name') 
                return state.chats.filter( chat =>  chat[1].name.toLowerCase().includes(state.searchInput.trim().toLocaleLowerCase()) ) 
            else
                return state.chats.filter( chat => chat[0].text.toLowerCase().includes(state.searchInput.trim().toLocaleLowerCase()) ) 
        },

        searchMessages(state){
            return state.messages.filter(mess => { 
                if(state.searchInput.trim() == '')
                    return mess
                    
                if(mess.text)
                    return mess.text.toLowerCase().includes(state.searchInput.trim().toLocaleLowerCase())
            })
        }
    },
    
    actions: {
        // authorization 
        register({commit}, regData){
            commit('showLoading')
            fetch(`http://127.0.0.1:8000/api/auth/reg`,{
                method: "POST",
                headers: {  "Content-Type": "application/json" },
                body: JSON.stringify(regData)
            })
                
            .then( response => response.json())
            .then(data => {
                localStorage.setItem('access_token', data.access_token)
                commit('removeLoading')
                router.push('/users')
            })
        },

        login({commit}, person){
            commit('showLoading')
            fetch(`http://127.0.0.1:8000/api/auth/login`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(person)
            })
            
            .then( response => response.json())
            .then( data => {
                commit('removeLoading')

                if(data.error)
                    alert('incorrect login or password')
                else {
                    localStorage.setItem('access_token', data.access_token)
                    router.push('/users')
                }
            })
        
        },

        logout(){
            fetch('http://127.0.0.1:8000/api/auth/logout', { method: "POST"  })
            localStorage.removeItem('access_token')
            router.push('/login')
        },

        // fetch data
        fetchUser({commit}){
            fetch('http://127.0.0.1:8000/api/auth/me', {
                method: "POST",
                headers: {'authorization': `Bearer ${localStorage.getItem('access_token')}`}
            })
            .then( response  => response.json())
            .then( data => commit('setUser', data) )
        },
        
        fetchUsers({commit}){
            fetch("http://127.0.0.1:8000/api/auth/users", {
                headers: { "authorization": `Bearer ${localStorage.getItem('access_token')}` }
            })
            .then( response  => response.json())
            .then( data => commit('setUsers', data.data))
        },

        fetchChats({commit, state}){
            fetch('http://127.0.0.1:8000/api/auth/rooms-list',{
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({ user_id: state.user.id })
            })
            .then ( response => response.json())
            .then( data =>  commit('setChats', data) )   
        },

        fetchUserRoomMessages({commit, state}, id){

            const p = new Promise(function(resolve){
                fetch(`http://127.0.0.1:8000/api/auth/users/${id}`, {
                    header: { 'authorization': `Bearer ${localStorage.getItem('access_token')}`}
                })
                .then(response => response.json())
                .then(data => {
                    commit('setSecondUser', data.data) 
                    resolve()
                })      
            })
        
            p.then(()=> {    
                fetch('http://127.0.0.1:8000/api/auth/messages/list',{
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${localStorage.getItem('access_token')}` 
                    },
                    body: JSON.stringify({ 
                        user_1: parseInt(state.secondUser.id),
                        user_2: parseInt(state.user.id)
                    })
                })
                .then ( res => res.json() )
                .then(data => { 
                    commit('setRoom', data[0])
                    data[1] != null ? commit('setMessages', data[1]) : false
                })
                .then(()=> document.querySelector('#block').scrollTop = document.querySelector('#block').scrollHeight )
            })
        },

        //message actions
        submitClick({dispatch, commit, state}, form){

            commit('showLoading')

            if(!state.room.id)  
                dispatch('createRoom', form)
            
            if(state.change != null)  
                dispatch('updateMessage', form)
            else 
                dispatch('sendMessage', form)
        },

        createRoom({ commit, dispatch, state, }, form){
            fetch(`http://127.0.0.1:8000/api/auth/rooms`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${localStorage.getItem('access_token')}`
                },

                body: JSON.stringify({ 
                    user_1: state.user.id, 
                    user_2: state.secondUser.id
                })
            })
            
            .then(response => response.json())
            .then(data => commit('setRoom', data) )
            .then(() =>  dispatch('sendMessage', form) )
        },

        deleteMessage({ commit },id){
            commit('showLoading')
            fetch(`http://127.0.0.1:8000/api/auth/messages/${id}`, { 
                method: "DELETE",
                header: { 'authorization': `Bearer ${localStorage.getItem('access_token')}` }
            })
            .then(response => response.json())
            .then(data => {
                commit('deleteMessage', data)
                commit('removeLoading')
            })
        },

        sendMessage({commit, state}, form){
            form.append('room_id', state.room.id)
            form.append('user_id', state.user.id)
        
            if(state.answer != null)
                form.append('answer',  state.answer.id)

            fetch(`http://127.0.0.1:8000/api/auth/messages`, {
                method: "POST",
                headers: { 
                    "X-Socket-Id": Echo.socketId(), 
                    'authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: form
            })
        
            .then(response => response.json())
            .then(data =>  {
                commit('addMessage', data)
                commit('updateAnswer', null)
                commit('removeLoading')
            })
            .then(()=> document.querySelector('#block').scrollTop = document.querySelector('#block').scrollHeight )
        },

        updateMessage({commit, state}, form){
            fetch(`http://127.0.0.1:8000/api/auth/messages/${ state.change.id }`, {
                method: "POST",
                header: { 'authorization': `Bearer ${localStorage.getItem('access_token')}` },
                body: form
            })
            .then(response => response.json())
            .then(data =>  {
                commit('updateMessage', data) 
                commit('updateChange', null)
                commit('removeLoading')
            })
        },

    },
    
    mutations: {
        setUser(state, user){
            state.user = Object.assign({}, user)
        },

        setSecondUser(state, user){
            state.secondUser = Object.assign({}, user)
        },

        setUsers(state, users){
            state.users = users.filter(item => item.id != state.user.id)
        },

        setChats(state, chats){
            state.chats = [...chats]
        },

        setRoom(state, room){
            state.room = Object.assign({}, room)
        },

        resetChatData(state){
            state.room = state.secondUser = null
            state.messages = []
        },

        //message crud

        setMessages(state, data){
            state.messages = [...data]
        },

        deleteMessage(state, id){
            state.messages = state.messages.filter(mess => mess.id != id )
        },

        addMessage(state, data){
            state.messages.push(data)
        },

        updateMessage(state, data){
            let mess = state.messages.find(item => item.id == data.id)
            mess.text = data.text
            mess.img = data.img
        },

        //answer change 

        updateAnswer(state, data){
            state.answer = data
            state.change = null
        },

        updateChange(state, data){
            state.change = data
            state.answer = null
        },

        //search state update

        updateSearchInput(state, input){
            state.searchInput = input
        },

        updateSearchSelect(state, input){
            state.searchSelect = input
        },

        //loading

        showLoading(state){
            state.loading = true
            document.querySelector('body').classList.add('my-hidden')
        },

        removeLoading(state){
            state.loading = false
            document.querySelector('body').classList.remove('my-hidden')
        },

        // imgModal
        
        imgModal(state, data){
            state.imgModal = data
        }

    }
})

export default store