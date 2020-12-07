<template>
  <el-header>
    <div>
      <img src="../assets/logo.png" alt="" />
      <span>电商后台管理系统</span>
    </div>
    <el-button @click="logout">退出</el-button>
  </el-header>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="less" scoped>

</style>