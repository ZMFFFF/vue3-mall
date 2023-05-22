<template>
    <div class="report">
        <el-breadcrumb :separator-icon="ArrowRight" style="margin: 20px 0">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
        <div id="chart"></div>
    </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import instance from "../modules/request";
import { useUserStore } from "../stores/user";
import { ArrowRight } from "@element-plus/icons-vue";
var userStore = useUserStore();
var myChart1 = null;
onMounted(() => {
    instance
        .get("reports/type/1", {
            headers: { Authorization: userStore.user.token },
        })
        .then((res) => {
            console.log(res.data);
            // opoptions = res.data.data;
            myChart1 = echarts.init(document.querySelector("#chart"));
            myChart1.setOption(res.data.data);
        });
});
</script>

<style lang="scss" scoped>
.report {
    width: 80vw;
    height: 500px;
    margin: 0 auto;
    background-color: #fff;

    #chart {
        width: 100%;
        height: 100%;
    }
}
</style>
