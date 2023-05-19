import axios from 'axios';

// vue/cli脚手架创建的项目，vue环境变量
// process当前程序运行的进程， env环境
console.log(process.env.NODE_ENV); //development开发模式|production生产模式

// vite项目，vue环境变量
console.log(import.meta.env);

let instance = axios.create({
    baseURL: import.meta.env.MODE == 'development' ? "http://127.0.0.1:8888/api/private/v1/" : "http://192.168.211.128:8888/api/private/v1/"
})


export default instance;