<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        
        <el-col :span="7">
          <el-input v-model="this.$store.state.queryInfo.query"></el-input>
          <el-button slot="append"  icon="el-icon-search"></el-button>
        </el-col>
        <el-col :span="6">
          <el-button @click="useradd" type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <slot></slot>
    <message/>
    </el-card>
  </div>
</template>

<script>

import message from './message.vue'
export default {

  created(){

  },
  methods: {
    useradd(){
      this.$store.state.dialogVisible = true
    }
  },
  computed:{},
  components: {
    message,
  },
};
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
</style>