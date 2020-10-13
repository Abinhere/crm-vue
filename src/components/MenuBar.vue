<template>
    <el-menu
      :default-active="$store.state.menuActive"
      class="el-menu-vertical-demo"
      :default-openeds="openeds"
      >
        <el-submenu :index="item.meta.id" v-for="(item) in getNav($router.options.routes)" :key="item.meta.id">
            <template slot="title">
                <i :class="item.meta.iconclass"></i>
                {{item.meta.name}}
            </template>
        <el-menu-item :index="sub.meta.id" v-for="(sub) in getNav(item.children)" :key="sub.meta.id" @click="handleClick(sub)">
                {{sub.meta.name}}
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
        },
        getNav(list){
            return list.filter(item => item.meta)
        }
    },
    mounted(){
        // console.log(this.$router);
    }   
}
</script>