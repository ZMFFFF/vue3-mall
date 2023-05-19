<template>
    <el-container>
        <el-header class="header">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-header class="header">
            <el-form
                :inline="true"
                :model="searchForm"
                @submit.prevent="search()"
            >
                <el-form-item>
                    <el-input
                        v-model="searchForm.userName"
                        placeholder="用户名"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        :icon="Search"
                        @click.prevent="search()"
                        >查询</el-button
                    >
                    <el-button
                        type="success"
                        :icon="Plus"
                        @click="showAddOrEdit()"
                        >添加</el-button
                    >
                </el-form-item>
            </el-form>
        </el-header>
        <el-main>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号" width="70" />
                <el-table-column prop="username" label="姓名" width="120" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column prop="mobile" label="手机" />
                <el-table-column prop="role_name" label="角色" />
                <!-- <el-table-column prop="mg_state" label="状态" width="120" /> -->
                <el-table-column label="状态" width="120">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            @change="
                                changeState(scope.row.id, scope.row.mg_state)
                            "
                        />
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button
                            link
                            type="primary"
                            size="small"
                            @click="showAddOrEdit(scope.row.id, scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            link
                            type="primary"
                            size="small"
                            @click="remove(scope.row.id)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[1, 5, 10, 20, 30]"
                :small="false"
                :disabled="false"
                :background="false"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </el-footer>
    </el-container>

    <!-- 编辑或添加界面 -->
    <el-dialog v-model="show" :title="title">
        <el-form :model="form">
            <el-form-item label="用户名" label-width="140px">
                <el-input
                    v-model="form.username"
                    placeholder="用户名"
                    :disabled="title != '添加用户'"
                />
            </el-form-item>
            <el-form-item
                label="密码"
                label-width="140px"
                v-if="title == '添加用户'"
            >
                <el-input v-model="form.pass" placeholder="密码" />
            </el-form-item>
            <el-form-item label="邮箱" label-width="140px">
                <el-input v-model="form.email" placeholder="邮箱" />
            </el-form-item>
            <el-form-item label="手机" label-width="140px">
                <el-input v-model="form.mobile" placeholder="手机" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="show = false" :icon="Close">取消</el-button>
                <el-button type="primary" @click="save()" :icon="Check"
                    >保存</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import {
    ArrowRight,
    Search,
    Plus,
    Check,
    Close,
} from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import instance from "../modules/request";
import { useUserStore } from "../stores/user";
import { ElMessage, ElMessageBox } from "element-plus";

let userStore = useUserStore();

let searchForm = reactive({
    userName: "",
});

let tableData = ref([]);

let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
let show = ref(false);
let title = ref("添加用户");
let form = reactive({
    id: 0,
    username: "",
    pass: "",
    email: "",
    mobile: "",
});

function handleSizeChange(num) {
    pageSize.value = num;
    search();
}
function handleCurrentChange(num) {
    currentPage.value = num;
    search();
}

async function search() {
    let url = `/users?pagenum=${currentPage.value}&pagesize=${pageSize.value}&query=${searchForm.userName}`;
    let result = await instance.get(url, {
        headers: { Authorization: userStore.user.token },
    });
    console.log(result);
    if (result.data.meta.status != "200")
        return ElMessage.error(res.data.meta.msg);

    total.value = result.data.data.total;
    tableData.value = [...result.data.data.users];
}

function showAddOrEdit(id, row) {
    show.value = true;
    form.id = 0;
    form.username = "";
    form.pass = "";
    form.email = "";
    form.mobile = "";

    if (id) {
        title.value = "编辑用户";
        form.id = row.id;
        form.username = row.username;
        form.pass = "";
        form.email = row.email;
        form.mobile = row.mobile;
    } else {
        title.value = "添加用户";
    }
}

function save() {
    if (title.value == "添加用户") {
        let url = `/users`;
        let data = {
            username: form.username,
            password: form.pass,
            email: form.email,
            mobile: form.mobile,
        };
        instance
            .post(url, data, {
                headers: { Authorization: userStore.user.token },
            })
            .then((res) => {
                console.log(res);
                if (res.data.meta.status != "201")
                    return ElMessage.error(res.data.meta.msg);

                show.value = false;
                search();
            });
    } else {
        let url = `/users/${form.id}`;
        let data = {
            email: form.email,
            mobile: form.mobile,
        };
        instance
            .put(url, data, {
                headers: { Authorization: userStore.user.token },
            })
            .then((res) => {
                console.log(res);
                if (res.data.meta.status != "200")
                    return ElMessage.error(res.data.meta.msg);

                show.value = false;
                search();
            });
    }
}

function changeState(id, flag) {
    let url = `/users/${id}/state/${flag}`;
    let data = {};
    instance
        .put(url, data, { headers: { Authorization: userStore.user.token } })
        .then((res) => {
            if (res.data.meta.status != "200")
                return ElMessage.error(res.data.meta.msg);

            ElMessage.success("更新状态成功");
            search();
        });
}

function remove(id) {
    // console.log(id)
    ElMessageBox.confirm(`您确定要删除此条id=${id}记录吗?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            let url = `users/${id}`;
            instance
                .delete(url, {
                    headers: { Authorization: userStore.user.token },
                })
                .then((res) => {
                    if (res.data.meta.status != "200")
                        return ElMessage.error(res.data.meta.msg);

                    ElMessage({
                        type: "success",
                        message: "删除成功",
                    });

                    search();
                });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "删除已取消",
            });
        });
}

onMounted(() => {
    search();
});
</script>

<style lang="scss" scoped></style>