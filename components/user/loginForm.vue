<template>
  <!-- 登录表单 -->
  <div class="login">
    <!-- <h1>{{token}}</h1> -->
    <el-form :model="loginUser" status-icon ref="loginUser" class="demo-ruleForm" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="用户名/手机" v-model="loginUser.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="loginUser.password" auto-complete="off"></el-input>
      </el-form-item>

      <div class="forget">
        <nuxt-link to="/user/login/#">忘记密码</nuxt-link>
      </div>

      <el-form-item>
        <el-button type="primary" style="width:100%" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUser: {
        username: "13800138000",
        password: "13800138000"
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      }
    };
  },
  // computed: {
  //   token() {
  //     return this.$store.state.user.userinfo.token;
  //   }
  // },
  methods: {
    //   发起登录请求
    login() {
      console.log(this.loginUser);
      // 调用actions方法,并传递数据
      this.$store
        .dispatch("user/setUser", this.loginUser)
        .then(() => {
          this.$message.success("登录成功");
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        })
        .catch(() => {
          this.$message.warning("登录失败，请重试");
        });

      //   console.log(this.$refs.loginUser);
      // this.$refs.loginUser.validate(valid => {
      //   //   提交表单,符合表单要求
      //   if (valid) {
      //     this.$axios.post("/accounts/login", this.loginUser).then(res => {
      //       console.log(res);
      //       if (res.status === 200) {
      //         this.$message.success("登录成功");
      //         setTimeout(() => {
      //           this.$router.push("/");
      //         }, 2000);
      //       } else {
      //         this.$message.warning("登录失败,请重试");
      //         setTimeout(() => {
      //           this.$router.push("/user/login");
      //         }, 1000);
      //       }
      //     });
      //   } else {
      //     this.$message.warning("非法输入");
      //   }
      // });
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  width: 400px;
  height: 280px;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
  .forget {
    float: right;
    padding-bottom: 10px;
    a {
      text-decoration: none;
      font-size: 13px;
      color: #409eff;
    }
  }
}
</style>


