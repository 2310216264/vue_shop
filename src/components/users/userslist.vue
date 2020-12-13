<template>
  <el-table :data="this.$store.state.userList" border stripe>
    <el-table-column type="index"></el-table-column>
    <el-table-column label="姓名" prop="username"> </el-table-column>
    <el-table-column label="邮箱" prop="email"> </el-table-column>
    <el-table-column label="电话" prop="mobile"> </el-table-column>
    <el-table-column label="角色" prop="role_name"> </el-table-column>
    <el-table-column label="状态" prop="mg_state">
      <template v-slot="scope">
        <el-switch
          v-model="scope.row.mg_state"
          @change="userChange(scope.row)"
        ></el-switch>
      </template>
    </el-table-column>
    

    <!-- 修改角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-table>
</template>

<script>
import { request } from "../../NetWork/request";
import axios from "axios";

export default {
  data() {
    return {
      //控制分配角色对话框显示与隐藏
      dialogVisible: false,
    };
  },
  created() {
    this.$store.commit("getUserlist");
  },
  methods: {
    userChange(userinfo) {
      console.log(userinfo);
      request({
        method: "put",
        url: `users/${userinfo.id}/state/${userinfo.mg_state}`,
      })
        .then((value) => {
          if (value.meta.status == 200) {
            this.$message({
              message: "更新成功",
              type: "success",
            });
          }
        })
        .catch((reson) => {
          this.$message.error("更新失败");
        });
    },
    setRole() {
      this.dialogVisible = true;
    },
    //删除用户
    remove(id) {
      console.log(id)
      //弹框询问是否删除
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((value) => {
          id = Number(id);
          request({
            method: "delete",
            url: `roles/${id}`,
          }).then((value) => {
            this.$message({
              message: "恭喜你，删除成功，但是不会删除，假的",
              type: "success",
            });
          });
        })
        .catch((reson) => {
          console.log(reson);
        });
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>