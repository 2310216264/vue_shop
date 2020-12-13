<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <rolesCard />
  </div>
</template>

<script>
import rolesCard from './rolesCard.vue'
export default {
    components:{
        rolesCard
    }
};
</script>

<style lang="less" scoped>
</style>