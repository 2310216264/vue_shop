<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域 -->
    <card/>
  </div>
</template>

<script>
import card from "./cateCard.vue";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    card,
  },
};
</script>

<style lang="less" scoped>
</style>