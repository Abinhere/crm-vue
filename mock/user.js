import { options } from 'less'
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
//单个删除
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
//批量删除
Mock.mock('/api/user/batchdel','post',(options)=>{
    let ids = JSON.parse(options.body).ids;
    // 第一层循环找到所有选中元素
    for(let i = 0;i < ids.length; i++){
        //第二层循环逆向删除选中元素 因为正向删除时每次删除元素下标变动时会有影响 所有采用逆向删除
        for(let j = Users.length-1; j>=0 ; j--){
            if(ids[i] == Users[j].id){
                Users.splice(j,1)
                break;
            }
        }
    }
    return {
        code:1,
        message:'批量删除成功'
    }
})

//添加
Mock.mock('/api/user/add','post',(options)=>{
    let user = JSON.parse(options.body);
    user.id = Users.length +1;
    Users.push(user);

    return {
        code:1,
        message:"添加用户成功"
    }
})

// 更新
Mock.mock('/api/user/update','post',(options)=>{
    let user = JSON.parse(options.body)
    Users.forEach((item,index)=>{
        if(item.id === user.id){
            Users[index] = user;
        }
    })
    return {
        code:1,
        message:"用户修改成功"
    }
})