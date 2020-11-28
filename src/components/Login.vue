<template>
  <div class="login_conantar">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>

      <!-- 登录框 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :rules="login"
        :model="loginFrom"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginFrom.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="passwrod">
          <el-input
            type="password"
            prop="password"
            v-model="loginFrom.passwrod"
            prefix-icon="el-icon-unlock"
          ></el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button type="primary" @click="loginfm">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { request } from "../NetWork/request";
export default {
  data() {
    return {
      loginFrom: {
        username: "admin",
        passwrod: "123456",
      },
      //这是表单的验证规则对象
      login: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        //验证密码是否合法
        passwrod: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //重置功能 清空表单
    reset() {
      //   console.log(this.loginFrom.username)
      this.loginFrom.username = "";

      this.loginFrom.passwrod = "";
    },
    loginfm() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        request({
          methods: "post",
          url: "/login",
          params: {
            username: this.loginFrom.username,
            password: this.loginFrom.passwrod,
          },
        })
          .then((value) => {
            if (!(value.meta.status == 200)) {
              this.$message.error("登录失败");
            } else if (value.meta.status == 200) {
              //弹出登录成功
              this.$message({
                message: "登录成功",
                type: "success",
              });
              
              //跳转页面
              setTimeout(() => {
                this.$router.replace("/home");
              }, 1000);
              window.sessionStorage.setItem("token", value.data.token);

            }
          })
          .catch((reson) => {
            console.log(reson);
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_conantar {
  display: flex;
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  margin: auto;
  background-color: #fff;
  position: relative;
  border-radius: 3px;
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  background-color: #fff;
  margin: -65px auto 0 auto;
  img {
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
    box-shadow: 0 0 10px #ddd;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.btn {
  display: flex;
  justify-content: flex-end;
}
</style>