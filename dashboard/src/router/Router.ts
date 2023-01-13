import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import { useAuthStore } from '../stores/authStore'
const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'CatchAll',
        redirect: '/'
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            doesNotRequireAuth: true
        },
        component: Login
    },
]

export const router = createRouter({
    history: createWebHistory('/'),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (!to.matched.some(record => record.meta.doesNotRequireAuth)) {
        if (!authStore.user) {
            next({ name: 'Login' })
        } else {
            next()
        }
    } else {
        next()
    }
})