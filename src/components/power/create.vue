<template>
  <div>
    <el-row class="create">
      <el-col>
        <el-button @click="create" type="primary">添加角色</el-button>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色" prop="name">
          <el-input aria-placeholder="roleName"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="name">
          <el-input v-model="ruleForm.miaoshu"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "../../NetWork/request";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: "",
        miaoshu: "",
      },
    };
  },
  methods: {
    create() {
      this.dialogVisible = true;
    },
    commit() {
      request({
        method: "post",
        url: "roles",
        data: {
          roleName: this.ruleForm.name,
          roleDesc: this.ruleForm.name,
        },
      })
        .then((value) => {
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.$router.replace("/roles");
        })
        .catch((reson) => {
          console.log(reson);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.create {
  margin-bottom: 30px;
}
</style>