<template>
    <div class="role">
        <div style="margin: 20px 0">
            <el-button type="primary" size="large">添加角色</el-button>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            :border="true"
            size="large"
        >
            <el-table-column width="50" label="" />
            <el-table-column type="index" width="50" label="#" />
            <el-table-column prop="roleName" label="角色列表" width="550" />
            <el-table-column prop="roleDesc" label="角色描述" width="550" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" :icon="Edit">编辑</el-button>
                    <el-button
                        type="danger"
                        :icon="Delete"
                        @click="remove(scope.row.id)"
                        >删除</el-button
                    >
                    <el-button type="warning" :icon="Setting"
                        >分配权限</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Setting,
} from "@element-plus/icons-vue";
import instance from "../modules/request";
import { useUserStore } from "../stores/user";
import { computed, onMounted, ref } from "vue";

let userStore = useUserStore();
var tableData = ref([]);

onMounted(() => {
    let url = `/roles`;
    instance
        .get(url, { headers: { Authorization: userStore.user.token } })
        .then((res) => {
            console.log(res);
            // console.log(res.data.data);
            tableData.value = res.data.data;
        });
});

function remove(id) {
    console.log(id);
}
</script>
<style lang="scss" scoped>
.role {
    padding: 20px;
}
</style>