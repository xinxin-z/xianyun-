<template>
  <div class="Header">
    <div class="header_main">
      <div class="main">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt class="logo" />
        </nuxt-link>
        <nuxt-link class="main_post" to="/">首页</nuxt-link>
        <nuxt-link class="main_post" :to="{name:'post'}">旅游攻略</nuxt-link>
        <nuxt-link class="main_post" to="/hotel">酒店</nuxt-link>
        <nuxt-link class="main_post" to="/air">国内机票</nuxt-link>
      </div>
      <div class="main_login">
        <nuxt-link to="/message">
          <!-- 消息下拉菜单 -->
          <el-dropdown>
            <div class="el-dropdown-link">
              <i class="el-icon-bell"></i>
              消息
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>消息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </nuxt-link>
        <!-- 登录注册按钮 -->
        <!-- 点击后默认跳转到注册页面 -->
        <nuxt-link to="/user/login/1">
          <!-- 如果是登录状态,就显示用户信息 -->
          <div class="login_user" v-if="getInfo.token">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img :src="$axios.defaults.baseURL+getInfo.user.defaultAvatar" alt />
                <span>{{getInfo.user.nickname}}</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>
                  <div @click="exitLogin">退出</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- 未登录,就显示登录链接 -->
          <span v-else>登录/注册</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let userinfo = localStorage.getItem("userInfo");
    if (userinfo) {
      let userinfos = JSON.parse(userinfo);
      // 如果存在,就把数据推送到vuex的token里面
      this.$store.commit("user/setUserInfo", userinfos);
    }
  },
  computed: {
    getInfo() {
      return this.$store.state.user.userinfo;
    }
  },
  methods: {
    exitLogin() {
      // 删除vuex中的用户信息
      this.$store.commit("user/setUserInfo", {
        token: "",
        user: {}
      });
      // 删除本地存储中的用户信息
      localStorage.removeItem("userInfo");
      // 退出后跳转到首页
      this.$message.success("退出成功");
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    }
  }
};
</script>

<style lang='less' scoped>
.Header {
  width: 100%;
  border-bottom: 1px solid #ccc;

  .nuxt-link-exact-active {
    background-color: #0094ff !important;
    color: #fff !important;
  }

  .header_main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    margin: 0 auto;
  }

  .logo {
    display: block;
    height: 60px;
    line-height: 60px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .main {
    display: flex;
    height: inherit;
    .main_post {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      height: inherit;
      &:hover {
        color: #0094ff;
        background-color: #fff;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          bottom: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background-color: #0094ff;
        }
      }
    }
  }

  .main_login {
    > a {
      font-size: 13px;
      color: #999;
      padding: 0 5px;
      &:hover {
        text-decoration: underline;
        color: #0094ff;
      }
    }
  }
}

.login_user {
  display: inline-block;
  .el-dropdown-link {
    img {
      width: 34px;
      height: 34px;
      vertical-align: middle;
      margin-bottom: 5px;
    }
  }
}
</style>
