import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRememberStore = defineStore('rememberInfo', () => {
    let isRemember = ref(false);
    let userName = ref("")

    function changeRemember(flag, uname) {
        isRemember.value = flag
        if (flag)
            userName.value = uname;
        else
            userName.value = "";
    }

    return {
        isRemember,
        userName,
        changeRemember
    }
}, {
    persist: {
        enabled: true, // 这个配置代表存储生效，而且是整个store都存储
        strategies: [
            {
                key: 'rememberInfo',
                storage: localStorage,
            },
        ],
    }
})