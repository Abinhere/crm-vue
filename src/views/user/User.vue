<template>
    <div>
        <el-row  class="tool-bar">
            <el-col :span="4">
                <el-input v-model="name" placeholder="请输入用户名"/>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="handleQuery">搜索</el-button>
                <el-button type="primary">新增</el-button>
            </el-col>
        </el-row>

         <el-table
            :data="datalist" v-loading="isloading"
            style="width: 100%" :height="getHeight()"
            :default-sort = "{prop: 'date', order: 'descending'}"
            @selection-change="handleSelect" 
            >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" label="#">
            </el-table-column>
            <el-table-column prop="name" label="姓名" sortable width="180">
            </el-table-column>
            <el-table-column prop="sex" label="性别" sortable width="100">
            </el-table-column>
            <el-table-column prop="age" label="年龄" sortable width="100">
            </el-table-column>
            <el-table-column prop="date" label="生日" sortable width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址" sortable >
            </el-table-column>
            <el-table-column label="操作"  width="180">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row class="footer">
            <el-col :span="4" align="left">
                <el-button :type="istype" :disabled="isbatchDel">批量删除</el-button>
            </el-col>
            <el-col :span="20" align="right">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total" @current-change="handlePageChange">
            </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:'',
            pageno:1,
            pagesize:10,
            total:0,
            datalist:[],
            selectedList:[],
            isloading:false
        }
    },
    computed:{
        isbatchDel(){
            return !this.selectedList.length > 0
        },
        //在是否禁用按钮时变换按钮样式
        istype(){
            return !this.selectedList.length>0?"danger":"primary";
        }
    },
    methods:{
        getHeight(){
            return window.innerHeight - 215;
        },
        handleSelect(select,rows){
            this.selectedList = select;
        },
        //curPage页码
        handlePageChange(curPage){
            this.pageno = curPage;
            this.getuserlist();
        },
        handleEdit(){

        },
        handleDelete(index,row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let id = row.id;
                let rs = await this.$http.get("/api/user/del",{ params: {id}})
                this.$message({
                    type: 'success',
                    message: rs.data.message
                });
                if(rs.data.code === 1){
                    this.getuserlist();
                }
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
        },
        handleQuery(){
            this.getuserlist()
        },
        async getuserlist(){
            this.isloading = true;
            let rs = await this.$http.post('/api/user/list',
            {
                name:this.name,
                pageno:this.pageno,
                pagesize:this.pagesize
            })
            this.datalist = rs.data.list
            this.total = rs.data.total
            this.isloading = false
        }
    },
    created(){
        this.getuserlist()
    }
}
</script>
<style lang="less" scoped>
.tool-bar{
    margin: 10px auto;
}
.footer{
    background: white;
    padding: 5px;
}
</style>