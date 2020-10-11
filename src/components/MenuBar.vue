<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :default-openeds="openeds"
      >
        <el-submenu :index="item.meta.id" v-for="(item) in $router.options.routes" :key="item.meta.id" v-if="item.meta">
            <template slot="title">
                <i :class="item.meta.iconclass"></i>
                <span>{{item.meta.name}}</span>
            </template>
        <el-menu-item :index="sub.meta.id" v-for="(sub) in item.children" :key="sub.meta.id">
            <span @click="handleClick(sub)">
                {{sub.meta.name}}
            </span>
        </el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
    data(){
        return{
            openeds:['1','4'],
            uniqueOpened:false
        }
    },
    methods:{
        handleClick(menu){
            this.$router.push(menu.path)
        }
    },
    mounted(){
        // console.log(this.$router);
    }   
}
</script>