<template>
  <el-dialog
    title="添加用户"
    :visible.sync="$store.state.dialogVisible"
    width="50%"
    @close="addClose"
  >
    <el-form
      :model="addForm"
      status-icon
      :rules="addFormRules"
      ref="addFormRef"
      label-width="70px"
    >
      <!-- //用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="addForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- //密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="addForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input
          type="email"
          v-model="addForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 手机 -->
      <el-form-item label="手机" prop="mobile">
        <el-input
          type="text"
          v-model="addForm.mobile"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>

    <span
      slot="footer"
      class="dialog-footer"
      @click="this.$store.state.dialogVisible = false"
    >
      <el-button @click="$store.state.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { log } from "util";
import { request } from "../../NetWork/request";
export default {
  data() {
    return {
      //用户数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //验证规则
      addFormRules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "密码长度6~10",
            trigger: ["blur", "change"],
          },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 6,
            message: "用户名长度6~10",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 4,
            message: "邮箱填写错误",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            message: "请输入正确的手机号",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    //监听对话框关闭
    addClose() {
      this.addForm.username = "";
      this.addForm.password = "";
      this.addForm.email = "";
      this.addForm.mobile = "";
    },
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        console, log(this.addForm.username);
        console.log(valid);
        if (!valid) {
          return;
        }

        request({
          method: "post",
          url: 'users',
          data:this.addForm
        })
         .then((value) => {
            this.$message({
              message:"创建用户成功",
              type:"success"
            })
            this.$store.state.dialogVisible = false,
            this.$store.commit('getUserlist')
          })
          .catch((reson) => {
            this.$message.error("更新失败");
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>