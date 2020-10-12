<template>
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="$emit('close')"
    :rules="rules"
    >
        <el-form :model="user" ref="userForm">
            <!-- autocomplete是否记录输入历史 -->
            <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                <el-input v-model="user.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="性别"  :label-width="formLabelWidth">
                <el-radio  v-model="user.sex" :label="0" >女</el-radio>
                <el-radio v-model="user.sex" :label="1" >男</el-radio>
            </el-form-item>

            <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input-number v-model="user.age"  :min="1" :max="100"></el-input-number>
            </el-form-item>

            <el-form-item label="生日" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="user.date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="user.address"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data(){
        return{
            formLabelWidth:"80px",
            // 是否展示
            dialogFormVisible:true,
            user:{
                name:"",
                sex:1,
                age:1,
                date:'',
                address:''
            },
            rules:[
                {
                    name:[
                        {
                            required:true,
                            message:"用户名不能为空",
                            trigger:"blur"
                        },
                        { min: 3,max: 10, message:"长度在3到10个字符",trigger:"blur"}
                    ]
                }
            ]
        }
    },
    methods:{
        handleSubmit(){
            this.$refs.userForm.validate(async valid => {
                if(valid){
                    let rs = await this.$http.post('/api/user/add',{...this.user});
                    if(rs.data.code === 1){
                        this.$emit('close','success')
                    }
                    dialogFormVisible : false
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.el-form{
    text-align: left;
    //在加了scoped时 父组件中使用子组件时的样式设置可能不生效 这时只需要加上/deep/即可
    /deep/ .el-form-item__label{
        text-align: center;
    }
}
</style>