import { createRouter, createWebHistory } from 'vue-router'
import Login from './Pages/Auth/Login.vue'
import Register from './Pages/Auth/Register.vue'
import Main from './Pages/Main/Main.vue'
import Users from './Pages/Main/Users.vue'
import Chats from './Pages/Main/Chats.vue'
import SingleChat from './Pages/Main/SingleChat.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login' , name: 'login', component: Login },
        { path: '/registration', name: 'register', component: Register },
        { 
            path: '/', 
            name: 'main', 
            component: Main,
            children: [
                { path: '/users', name: 'users', component: Users },
                { path: '/chats', name: 'chats', component: Chats },
                { path: '/chat/:id', name: 'chat', component: SingleChat },
            ]
        },
        
    ]
})

export default(router)