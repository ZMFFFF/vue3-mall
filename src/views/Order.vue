<template>
    <div class="boxs">
        <div>
            <el-header class="header">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                    <el-breadcrumb-item>订单列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
        </div>
        <div class="heainput">
            <el-input v-model="querys" size="large"  placeholder="请输入内容" class="input-with-select" maxlength="0" > 
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        <el-table class="pt20" :data="tableData" border stripe style="width: 100% " width="180">
            <el-table-column type="index" label="#" width="50" />
            <el-table-column prop="order_number" label="订单编号" sum-text />
            <el-table-column prop="order_price" label="订单价格" />
            <el-table-column label="是否付款">
                <template #default="scope">

                    <el-button type="danger" plain size="small"> {{ scope.row.pay_status == 0 ? '未付款' : '付款' }}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货" />
            <el-table-column prop="update_time" label="下单时间" />
            <el-table-column label="操作">
                <template #default>
                    <el-button type="primary" :icon="EditPen" />
                    <el-button type="success" :icon="Location" />
                </template>
            </el-table-column>

        </el-table>
    </div>
    <div class="demo-pagination-block" style="margin-left: 20px;" >

        <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[5, 10, 20, 30, 40]"
            :small="small" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="totals"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup>
import { Search, ArrowRight, EditPen, Location } from "@element-plus/icons-vue"
import { ref, onMounted } from 'vue'
import instance from "../modules/request";
import { useUserStore } from "../stores/user";
let userStore = useUserStore();

var tableData = ref([])
var currentPage4 = ref(1)
const pageSize4 = ref(10)
var querys = ref('')
var totals = ref(0)
var currenPage = ref(1)
var itemsPage = ref(10)
const small = ref(false)
const background = ref(true)
onMounted(() => {
    orderlist()
})

const handleSizeChange = (val) => {
    console.log(`${val} `)
    itemsPage.value = val
    orderlist()
}
const handleCurrentChange = (val) => {
    currenPage.value = val

    orderlist()

}



async function orderlist() {
    var rusit = await instance.get(`/orders?query=${querys.value}&pagenum=${currenPage.value}&pagesize=${itemsPage.value}`, {
        headers: {
            Authorization: userStore.user.token
        }
    })
    console.log(rusit);
    totals.value = rusit.data.data.total
    tableData.value = rusit.data.data.goods
}

</script>
<style lang="scss" scoped>
.boxs {
    padding: 20px;
}

.heainput {
    width: 260px;
}
</style>