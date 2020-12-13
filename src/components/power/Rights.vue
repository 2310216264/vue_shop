<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <card />
  </div>
</template>

<script>
import { request } from "../../NetWork/request";
import card from "./card.vue";
export default {
  data() {
    return {
    };
  },
  created() {

  },
  methods: {
    
  },
  components: {
    card,
  },
};
</script>

<style lang="less" scoped>
</style>