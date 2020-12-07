<template>
  <div>
    <!-- 头部导航 -->
    <Bread />

    <!-- 卡片内容 -->
    <Card>
      <!-- 内容 -->
      <Userlist />

      <!-- 分页 -->
      <Page/>
    </Card>
  </div>
</template>

<script>
//头部
import Bread from "./bread.vue";
//卡片
import Card from "./card.vue";
//卡片数据内容
import Userlist from "./userslist.vue";

//底部分页
import Page from "./page.vue"
export default {
  components: {
    Bread,
    Card,
    Userlist,
    Page
  },
};
</script>

<style lang="less">
</style>