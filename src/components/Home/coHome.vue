<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <!-- <Header/> -->

    <el-container>
      <!-- 侧边栏 -->

      <el-aside :width='iscollapse?"64px":"200px"'>
        <div class="toggle-button" @click="toggle">|||</div>

        <el-menu
          :collapse="iscollapse"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#4169E1"
          unique-opened
          :collapse-transition="false"
          router
          :default-active='activepath'
        >
        <!-- 一级菜单 -->
          <el-submenu  :index="item.id + ''" v-for="item in MenusList" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="inconimg[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            
            <!-- 二级菜单 -->
            <el-menu-item @click="savepath('/'+ subitem.path)" :index="'/'+ subitem.path"  v-for="subitem in item.children" :key="subitem.id">
               <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{subitem.authName}}</span>
            </el-menu-item>

          </el-submenu>
          
        </el-menu>
      </el-aside >
      <!-- 右侧主体 -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {request} from "../../NetWork/request"
export default {
  data() {
    return {
      // activeroute:this.$routers.path,
      iscollapse:false,
      MenusList:[],
      inconimg:{
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      } ,
      //被激活的链接地址
      activepath:''
    };
  },
  //属性
  computed:{},

  //渲染页面时
  created(){
    this.getMenus();
  },
  
  //方法
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
    //获取列表
    getMenus(){
        request({
          url:'/menus'
        }).then(value =>{
          if(value.meta.status !== 200){
            this.$message.error(value.meta.msg)
          }

          this.MenusList = value.data
        }).catch(reson=>{
            console.log(reson)
        })
    },

    //折叠侧边栏
    toggle(){
      this.iscollapse = !this.iscollapse
    },
    savepath(path){
      window.sessionStorage.setItem('path',path)
      this.activepath = window.sessionStorage.getItem('path')
    }
  },
  components: {
    // Header,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      height: 100%;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  color: #fff;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>