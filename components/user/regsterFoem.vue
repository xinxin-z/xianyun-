<template>
  <!-- 注册表单 -->
  <div class="register">
    <el-form
      :model="registerUser"
      :rules="rules"
      status-icon
      ref="registerUser"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input placeholder="用户名/手机" v-model="registerUser.username" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item class="getCaptcha" prop="captcha">
        <!-- 在输入框中嵌入一个按钮 -->
        <el-input placeholder="验证码" v-model="registerUser.captcha" auto-complete="off">
          <template slot="append">
            <div class="capBtn" @click="sendCap">发送验证码</div>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="nickname">
        <el-input placeholder="你的名字" v-model="registerUser.nickname" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码"
          v-model="registerUser.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password2">
        <el-input
          type="password"
          placeholder="确认密码"
          v-model="registerUser.password2"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%" @click="registerUserInfo">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    //   验证再次输入的密码是否匹配
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        username: "13800138000",
        nickname: "13800138000",
        captcha: "000000",
        password: "13800138000",
        password2: "13800138000"
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 验证手机号
    sendCap() {
      // 验证规则
      let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;

      //   验证用户手机号码
      if (reg.test(this.registerUser.username)) {
        //   发送请求验证手机
        this.$axios
          .post("/captchas", { tel: this.registerUser.username })
          .then(res => {
            console.log(res);
          });
      } else {
        this.$message.warning("手机号码不合法");
      }
    },
    //   提交表单
    registerUserInfo() {
      this.$refs.registerUser.validate(valid => {
        //   如果是true,则表示输入内容符合表单验证规则
        if (valid) {
          // 构造表单 发送异步请求
          // 删除对象的一个属性
          //   formInfo 等于  this.registerUser 对象中  除了 password2 属性外的剩下的 属性集合 = 对象
          let { password2, ...formInfo } = this.registerUser;
          console.log(formInfo);
          //   发送注册请求
          this.$axios
            .post("/accounts/register", formInfo)
            .then(res => {
              console.log(res);
              this.$message.success("注册成功");
              // 注册成功后跳转到登录页面
              setTimeout(() => {
                this.$router.push("/user/login/0");
              }, 1000);
            })
            .catch(err => {
              console.log(err.response.data.message);
              this.$message.warning(err.response.data.message);
            });
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.register {
  width: 400px;
  height: 420px;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
}
</style>
