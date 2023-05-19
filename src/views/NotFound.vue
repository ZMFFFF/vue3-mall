<template>
    <div class="page404">
        <img src="../assets/404.gif" alt="">
        <div class="info">
            <h2>404</h2>
            <p>很抱歉，你访问的页面不存在</p>
            <p class="tip">请检查你输入的网址是否正确，或者点击链接继续浏览</p>
            <p>
                <RouterLink to="/">
                    <span>返回首页</span>
                    <el-icon class="arrow">
                        <DArrowRight />
                    </el-icon>
                </RouterLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import { DArrowRight } from '@element-plus/icons-vue'
</script>

<style lang="scss">
.page404 {
    width: 700px;
    margin: 100px auto;
    display: flex;
    box-shadow: var(--el-box-shadow-dark);
    padding: 30px;
    border-radius: 4px;

    img {
        width: 200px;
        height: 200px;
        margin-right: 20px;
        border-radius: 5px;
    }

    .info {
        h2 {
            font-size: 50px;
        }

        p {
            margin: 10px 0;
        }

        .tip {
            color: #999;
            font-size: 12px;
        }

        a {
            .arrow {
                margin-left: 5px;
                vertical-align: middle;
            }
        }
    }
}
</style>

