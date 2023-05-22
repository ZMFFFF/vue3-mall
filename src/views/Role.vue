<template>
    <div class="role">
        <div style="margin: 20px 0">
            <el-button
                type="primary"
                size="large"
                @click="
                    dialogFormVisible = true;
                    form.name = '';
                    form.describe = '';
                    form.id = '';
                "
                >添加角色</el-button
            >
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
            <el-table-column
                prop="roleName"
                label="角色列表"
                min-width="350px"
            />
            <el-table-column
                prop="roleDesc"
                label="角色描述"
                min-width="350px"
            />
            <el-table-column label="操作" min-width="350px">
                <template #default="scope">
                    <el-button
                        type="primary"
                        :icon="Edit"
                        @click="
                            bianji(
                                scope.row.id,
                                scope.row.roleName,
                                scope.row.roleDesc
                            )
                        "
                        >编辑</el-button
                    >
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
        <!-- 添加角色 -->
        <el-dialog
            v-model="dialogFormVisible"
            title="添加角色"
            style="width: 700px"
        >
            <el-form :model="form">
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色描述" :label-width="formLabelWidth">
                    <el-input v-model="form.describe" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                        >取消</el-button
                    >
                    <el-button type="primary" @click="subm"> 确定 </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 编辑角色 -->
        <el-dialog title="添加角色" style="width: 700px" v-model="show">
            <el-form :model="form">
                <el-form-item label="角色名称">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="form.describe" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="show = false">取消</el-button>
                    <el-button type="primary" @click="putEnd"> 确定 </el-button>
                </span>
            </template>
        </el-dialog>
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
import { computed, onMounted, ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

let userStore = useUserStore();
var tableData = ref([]);

const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

// 编辑
var show = ref(false);

var form = reactive({
    name: "",
    describe: "",
    id: "",
});

onMounted(() => {
    content();
});

function content() {
    let url = `/roles`;
    instance
        .get(url, { headers: { Authorization: userStore.user.token } })
        .then((res) => {
            console.log(res);
            // console.log(res.data.data);
            tableData.value = res.data.data;
        });
}

// 添加角色
function subm() {
    dialogFormVisible.value = false;
    if (form.name !== "" && form.describe !== "") {
        let url = `/roles`;
        let data = {
            roleName: form.name,
            roleDesc: form.describe,
        };
        instance
            .post(url, data, {
                headers: { Authorization: userStore.user.token },
            })
            .then((res) => {
                console.log(res);
                if (res.data.meta.status != "200") content();
                return ElMessage.success(res.data.meta.msg);
            });
    }
}

function bianji(a, b, c) {
    show.value = true;
    console.log(a, b, c);
    form.id = a;
    form.name = b;
    form.describe = c;
}

// 编辑
function putEnd() {
    let url = `roles/${form.id}`;
    let data = {
        roleName: form.name,
        roleDesc: form.describe,
    };
    instance
        .put(url, data, {
            headers: { Authorization: userStore.user.token },
        })
        .then((res) => {
            console.log(res);
            show.value = false;
            if ((res.data.meta.status = "200")) content();
            return ElMessage.success("编辑成功");
        });
}

// 删除角色
function remove(id) {
    console.log(id);
    ElMessageBox.confirm(`您确定要删除该角色吗?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            let url = `roles/${id}`;
            instance
                .delete(url, {
                    headers: { Authorization: userStore.user.token },
                })
                .then((res) => {
                    // console.log(res);
                    if (res.data.meta.status != "200")
                        return ElMessage.error(res.data.meta.msg);

                    ElMessage({
                        type: "success",
                        message: "删除成功",
                    });

                    content();
                });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "删除已取消",
            });
        });
}
</script>
<style lang="scss" scoped>
.role {
    padding: 20px;
}
</style>