import Mock from 'mockjs'
const User = {
    username:"admin",
    password:"123"
}


//url地址  请求方式  回调函数或一个对象
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

Mock.mock('/api/user/logout','get',()=>{
    return Mock.mock({
        code:1,
        message:"退出登陆成功"
    })
})