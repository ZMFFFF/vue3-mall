<template>
    <el-container class="home">
        <el-aside :width="width" class="vh100 scroll">
            <div class="logo border-right">
                <template v-if="!isCollapse">
                    <img src="../assets/logo.svg" alt="" />
                </template>
                <template v-else>
                    <img src="../assets/logo2.svg" alt="" class="logo2" />
                </template>
            </div>
            <el-menu
                :default-active="route.path"
                :collapse="isCollapse"
                :unique-opened="true"
                :router="true"
                class="h"
            >
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="/home/user">
                        <template #title>
                            <el-icon>
                                <Notification />
                            </el-icon>
                            <span>用户列表</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Open />
                        </el-icon>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="/home/role">
                        <template #title>
                            <el-icon>
                                <Notification />
                            </el-icon>
                            <span>角色列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/home/right">
                        <template #title>
                            <el-icon>
                                <Notification />
                            </el-icon>
                            <span>权限列表</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <Handbag />
                        </el-icon>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="/home/goods">
                        <template #title>
                            <el-icon>
                                <Notification />
                            </el-icon>
                            <span>商品列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/home/param">
                        <template #title>
                            <el-icon>
                                <Notification />
                            </el-icon>
                            <span>分类参数</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/home/category">
                        <template #title>
                            <el-icon>
                                <Notification />
                            </el-icon>
                            <span>商品分类</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                            <ShoppingTrolley />
                        </el-icon>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="/home/order">
                        <template #title>
                            <el-icon>
                                <Notification />
                            </el-icon>
                            <span>订单列表</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="5">
                    <template #title>
                        <el-icon>
                            <Histogram />
                        </el-icon>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="/home/report">
                        <template #title>
                            <el-icon>
                                <Notification />
                            </el-icon>
                            <span>数据报表</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="header border-bottom">
                    <template v-if="!isCollapse">
                        <el-icon @click="toggleCollapse()" size="20">
                            <Fold />
                        </el-icon>
                    </template>
                    <template v-else>
                        <el-icon @click="toggleCollapse()" size="20">
                            <Expand />
                        </el-icon>
                    </template>
                    <!-- <el-menu :default-active="activeIndex" mode="horizontal" class="menu" :router="true">
                        <el-menu-item index="/home/user">用户列表</el-menu-item>
                        <el-sub-menu>
                            <template #title>商品管理</template>
                            <el-menu-item index="/home/goods">商品列表</el-menu-item>
                            <el-menu-item index="/home/param">分类参数</el-menu-item>
                            <el-menu-item index="/home/category">商品分类</el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index="/home/order">订单列表</el-menu-item>
                    </el-menu> -->
                    <div>
                        <span class="user-name">{{
                            userStore.user?.username
                        }}</span>
                        <el-button
                            type="danger"
                            :icon="SwitchButton"
                            circle
                            @click="logout()"
                        />
                    </div>
                </div>
            </el-header>
            <el-main style="height: calc(100vh - 120px); padding: 0px">
                <RouterView />
            </el-main>
            <el-footer>
                <div class="border-top pt20">
                    版本所有©王龙 {{ currentTime }}
                </div>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
    Histogram,
    Handbag,
    ShoppingTrolley,
    Open,
    User,
    Notification,
    Fold,
    Expand,
    SwitchButton,
} from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
let isCollapse = ref(false);
let activeIndex = ref("");
let currentTime = ref("");
let timer = ref(null);
let width = ref("200px");

let router = useRouter();
let route = useRoute();
let userStore = useUserStore();

//#region 组件的方法
function formatDate(date) {
    if (date instanceof Date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    return ``;
}

function changeCurrentTime() {
    timer.value = setInterval(() => {
        currentTime.value = formatDate(new Date());
    }, 1000);
}

function toggleCollapse() {
    isCollapse.value = !isCollapse.value;
    width.value = isCollapse.value ? "64px" : "200px";
}

function logout() {
    userStore.removeUser();
    router.push("/login");
}
//#endregion

onMounted(() => {
    changeCurrentTime();
});

onUnmounted(() => {
    timer.value = null;
    clearInterval(timer.value);
});
</script>

<style scoped lang="scss">
.home {
    .h {
        height: calc(100vh - 65px);
    }

    .scroll::-webkit-scrollbar {
        width: 4px;
        height: 0px;
        background-color: #ccc;
    }

    .logo {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: sticky;
        left: 0;
        top: 0;
        width: 100%;
        box-sizing: border-box;
        z-index: 999;
        background-color: #fff;

        img {
            width: 100px;
        }

        img.logo2 {
            width: auto;
            height: 30px;
        }
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;

        .el-menu {
            border-bottom: none !important;
        }

        .menu {
            flex-grow: 1;
        }

        .user-name {
            margin-right: 20px;
        }
    }
}
</style>