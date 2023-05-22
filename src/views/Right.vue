<template>
    <div class="right">
        <el-breadcrumb :separator-icon="ArrowRight" style="margin: 0 0 20px 0">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            :border="true"
            size="large"
        >
            <el-table-column type="index" width="50" label="#" />
            <el-table-column prop="authName" label="权限名称" width="500" />
            <el-table-column prop="path" label="路径" width="500" />
            <el-table-column label="权限等级">
                <template #default="scope">
                    <!-- <span>{{ level_s(scope.row.level) }}</span> -->
                    <el-button
                        :type="
                            scope.row.level == 0
                                ? 'primary'
                                : scope.row.level == 1
                                ? 'success'
                                : scope.row.level == 2
                                ? 'danger'
                                : ''
                        "
                        plain
                        size="small"
                        >{{ level_s(scope.row.level) }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import instance from "../modules/request";
import { useUserStore } from "../stores/user";
import { ArrowRight } from "@element-plus/icons-vue";

let userStore = useUserStore();

var tableData = ref([]);

onMounted(() => {
    let url = `/rights/list`;
    instance
        .get(url, { headers: { Authorization: userStore.user.token } })
        .then((res) => {
            // console.log(res);
            // console.log(res.data.data);
            tableData.value = res.data.data;
        });
});

var level_s = computed(() => (s) => {
    var l = "一级";
    if (s == "1") {
        l = "二级";
    }
    if (s == "2") {
        l = "三级";
    }
    return l;
});
</script>

<style lang="scss" scoped>
.right {
    padding: 20px;
}

.el-table-column {
    height: 500px;
}
</style>