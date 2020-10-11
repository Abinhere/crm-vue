<template>
    <div>
        <el-row  class="tool-bar">
            <el-col :span="4">
                <el-input/>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">搜索</el-button>
                <el-button type="primary">查询</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less" scoped>
.tool-bar{
    margin-top: 20px;
}
</style>