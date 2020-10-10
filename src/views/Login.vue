<template>
    <div class="login-wrapper">
        <el-form :model="user" ref="loginForm" :rules="rules" class="login-form">
            <h1>
                系统登陆
            </h1>
            <el-form-item label="" prop="username">
                <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item label="" prop="password">
                <el-input v-model="user.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item label="">
                <el-checkbox label="记住密码"></el-checkbox>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user:{
                username:"",
                password:""
            },
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        handleLogin(){
            this.$refs.loginForm.validate(async (valid)=>{
                if(valid){
                    console.log('pass');
                    let rs = await this.$http.post('/api/user/login',{
                        username:this.user.username,
                        password:this.user.password
                    })
                    if(rs.data.code === 0){
                        // 失败
                    }else{
                        //成功
                    }
                }else{
                    console.log('unpass');
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login-wrapper{
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
    // background: url("../assets/img/main.jpg") no-repeat center/cover ;
    .login-form{
        width: 500px;
        height: 400px;
        box-shadow: 1px 1px 15px #ccc;
        border-radius: 15px;
        box-sizing: border-box;
        padding: 20px;
        h1{
            margin-bottom: 25px;
            text-align: center;
            line-height: 50px;
            font-size: 26px;
        }
        button{
            width: 100%;
        }
    }
}
</style>