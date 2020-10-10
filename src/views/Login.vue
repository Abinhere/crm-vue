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
                <el-checkbox v-model="user.checked" label="记住密码"></el-checkbox>
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
                password:"",
                checked:false
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
                    console.log(rs);
                    if(rs.data.code === -1){
                        //登录失败
                        this.$message({
                            message:rs.data.message,
                            type:"warning"
                        })
                    }else{
                        //登录成功
                        //若勾选了记住密码则存入localStorage
                        if(this.user.checked){
                            localStorage.setItem('checked',this.user.checked)
                            localStorage.setItem('username',this.user.username)
                            localStorage.setItem('password',this.user.password)
                        }else{
                            localStorage.removeItem('checked')
                            localStorage.removeItem('username')
                            localStorage.removeItem('password')
                        }
                        this.$router.push('/home')
                    }
                }else{
                    console.log('unpass');
                }
            })
        }
    },
    mounted(){
        let checked =JSON.parse(localStorage.getItem('checked'));
        if(checked){
            this.user.checked = checked;
            this.user.username = localStorage.getItem('username');
            this.user.password = localStorage.getItem('password');
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