<template>
  <el-card class="card"> 
      <el-table :data='rightslist' border stripe>
          <el-table-column label="#" type='index'></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="权限路径" prop="path"></el-table-column>
          <el-table-column label="权限等级" prop="level">
              <template slot-scope="scope">
                    <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
              </template>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
import { request } from "../../NetWork/request";
export default {
  data() {
    return {
      rightslist: [],
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    getRightsList() {
      request({
        method: "get",
        url: "rights/list",
      })
        .then((value) => {

          this.rightslist = value.data;
        })
        .catch((reson) => {
          console.log(reson);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  margin-top: 30px;
}
</style>