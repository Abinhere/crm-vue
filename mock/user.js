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

//mock.js 这里的@相当于Random 例如: @cname 相当于 Random.cname
var Users = [];
function InitUserData(){
    for(let i = 0; i < 56; i++){
        Users.push(Mock.mock({
            id:"@increment()",
            name:"@cname",
            sex:"@natural(0,1)",
            age:"@natural(18,100)",
            date:"@date()",
            address:"@county(true)"
        }))
    }
}

InitUserData()

Mock.mock('/api/user/list','post',(options)=>{
    let {name,pageno,pagesize} =JSON.parse(options.body);
    //查询
    let temUsers = Users.filter((user) => {
        return user.name.indexOf(name) > -1;
    })

    //分页处理
    let startIndex = (pageno - 1) *pagesize;
    let endIndex = startIndex + pagesize;
    let result = temUsers.slice(startIndex,endIndex)

    return {
        total:temUsers.length,
        code:1,
        list:result
    }
})

Mock.mock(/\/api\/user\/del/,'get',(options)=>{
    let id = options.url.split('=')[1];
    Users.forEach((user,index)=>{
        if(user.id == id){
            Users.splice(index,1);
        }
    })
    return{
        code:1,
        message:"删除数据成功"
    }
})