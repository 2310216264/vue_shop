<template>
  <el-pagination
  class="page"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="this.$store.state.queryInfo.pagenum"
    :page-sizes="[1, 2, 5, 10]"
    :page-size="this.$store.state.queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="this.$store.state.total"
  >
    <!--  -->
  </el-pagination>
</template>
<script>
export default {
  namespaced: true,
  created() {
    this.$store.dispatch("getUserlist");
  },
  methods: {
    //监听pagesize发生改变 每页显示条数
    handleSizeChange(newSize) {
      console.log(newSize);
      this.$store.state.queryInfo.pagesize = newSize;
      this.$store.dispatch("getUserlist");
    },
    handleCurrentChange(newPage) {
      this.$store.state.queryInfo.pagenum = newPage;
      this.$store.dispatch("getUserlist");
    },
  },
};
</script>

<style lang="less" scoped>
.page{
  margin-top: 20px;
}
</style>