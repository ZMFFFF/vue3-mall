import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { useUserStore } from './stores/user'

import App from './App.vue'
import router from './router'

import elemenPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


const app = createApp(App)

let pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia)
app.use(router)
app.use(elemenPlus, {
    locale: zhCn,
})
let userStore = useUserStore();
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next();
    if (userStore.user) return next();

    next("/login")
})


app.mount('#app')
