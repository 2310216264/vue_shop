<template>
  <div>
    <el-button @click="logout">退出</el-button>
    Home 组件
  </div>
</template>

<script>
export default {
  data() {
      return{
          
      }
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
</style>