<template>
<el-container class="home-container">
  <el-header>
    <!-- span一共24 4等于是六分之一 采用的flex布局 offset表示栅格距离左边19 -->
    <el-row>
      <el-col :span="4" :offset="19">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎，{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
            <el-dropdown-item>用户设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <MenuBar></MenuBar>
    </el-aside>
    <el-container>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <div v-if="$route.path !== '/home/statics'">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.meta.id"><a :href="'#'+item.path">{{item.meta.name}}</a></el-breadcrumb-item>
          </div>
          </el-breadcrumb>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
// @ is an alias to /src
import MenuBar from '../components/MenuBar'
export default {
  data(){
    return {
      username:sessionStorage.getItem("username")
    }
  },
  name: 'Home',
  methods:{
    async handleCommand(cmd){
      if(cmd === 'logout'){
        // console.log(cmd);
        let rs = await this.$http.get('/api/user/logout');
        if(rs.data.code === 1){
          sessionStorage.removeItem("username");
          this.$message({
            message: rs.data.message,
            type: 'success'
          });
          this.$router.push('/login')
        }
      }
    }
  },
  mounted(){

  },
  components: {
    MenuBar
  }
}
</script>


<style lang="less" scoped>
  .home-container{
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>