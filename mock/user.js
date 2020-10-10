import Mock from 'mockjs'
const User = {
    username:"admin",
    password:"123"
}

Mock.mock('/api/user/login','post',(options)=>{
    let {username,password} = JSON.parse (options.body)
    if(username === User.username && password === User.password){
        return Mock.mock({
            code:1,
            message:"登录成功"
        })
    }else{
        return Mock.mock({
            code:-1,
            message:"用户名或者密码错误"
        })
    }
})