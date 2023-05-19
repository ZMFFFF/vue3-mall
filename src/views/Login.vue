<template>
    <div class="box">
        <img src="../assets/logo.svg" alt="" class="logo">
        <el-form ref="loginFormRef" :model="loginForm" :status-icon="false" :rules="rules">
            <el-form-item prop="acc">
                <el-input :prefix-icon="User" size="large" v-model="loginForm.acc" type="text" autocomplete="on"
                    placeholder="账号" @keyup.enter="submitForm(loginFormRef)" />
            </el-form-item>
            <el-form-item prop="pass">
                <el-input size="large" v-model="loginForm.pass" :type="passType" autocomplete="off" placeholder="密码"
                    @keyup.enter="submitForm(loginFormRef)">
                    <template #prefix>
                        <el-icon v-if="passType == 'password'">
                            <Lock />
                        </el-icon>
                        <el-icon v-else>
                            <Unlock />
                        </el-icon>
                    </template>

                    <template #suffix>
                        <el-icon @click="seePass()" class="eye">
                            <View />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="loginForm.rememberMe" label="记住我？" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
                <el-button @click="resetForm(loginFormRef)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, Unlock, View } from '@element-plus/icons'
import instance from '../modules/request';
import { useUserStore } from '../stores/user'
import { useRememberStore } from '../stores/remember'

import { ElMessage } from 'element-plus'

let router = useRouter();
let userStore = useUserStore();
let rememberStore = useRememberStore();

let loginFormRef = ref();

let passType = ref("password")

let loginForm = reactive({
    acc: rememberStore.isRemember ? rememberStore.userName : "admin",
    pass: "123456",
    rememberMe: rememberStore.isRemember
})

function checkAccount(rule, value, callback) {
    // 字母开头，允许5-12字符，允许字母数字下划线
    let reg = /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error("字母开头，允许5-12字符，允许字母数字下划线"))
    }
}
function checkPassword(rule, value, callback) {
    // 以字母或数字开头，长度在6~18之间，只能包含字母、数字和下划线
    let reg = /^[0-9a-zA-Z]\w{5,17}$/
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error("字母或数字开头，长度在6~18之间，只能包含字母、数字和下划线"))
    }
}

let rules = reactive({
    acc: [{ validator: checkAccount, trigger: 'change' }],
    pass: [{ validator: checkPassword, trigger: 'blur' }]
})

function submitForm(form) {
    if (!form) return
    form.validate((valid) => {
        if (valid) {
            console.log('验证成功!');

            instance.post("/login", {
                username: loginForm.acc,
                password: loginForm.pass
            }).then(res => {
                if (res.data.meta.status != "200") return ElMessage.error(res.data.meta.msg)

                rememberStore.changeRemember(loginForm.rememberMe, loginForm.acc);

                userStore.setUser(res.data.data);
                router.push("/");
            })

        } else {
            console.log('验证失败!')
            return false
        }
    })
}

function resetForm(form) {
    if (!form) return;
    form.resetFields();
}

function seePass() {
    if (passType.value == "password") {
        passType.value = "text"
    } else {
        passType.value = "password"
    }
}
</script>

<style scoped>
.box {
    margin: 60px auto 0 auto;
    width: 400px;
    box-shadow: var(--el-box-shadow-dark);
    padding: 50px;
    border-radius: 4px;
    text-align: center;
}

.logo {
    width: 200px;
    margin-bottom: 20px;
}

.eye {
    cursor: pointer;
}
</style>