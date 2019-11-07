<template>
  <div class="login">
    <!-- 内容部分 -->
    <div class="content">
      <div class="login_info">
        <div class="tite">
          <!-- 标题 -->
          <div
            class="tite_list"
            v-for="(item,index) in ['登录','注册']"
            :key="index"
            :class="listIndex == index ? 'active':''"
            @click="change(index)"
          >{{item}}</div>
        </div>
        <!-- 内容 -->
        <div class="form">
          <!-- 注册表单 -->
          <registerForm v-if="listIndex == 1"></registerForm>

          <!-- 登录表单 -->
          <loginForm v-if="listIndex == 0"></loginForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import registerForm from "@/components/user/regsterFoem";
import loginForm from "@/components/user/loginForm";

export default {
  components: {
    registerForm,
    loginForm
  },
  data() {
    return {
      // 让索引等于当前路由id
      listIndex: this.$route.params.id
    };
  },
  methods: {
    change(index) {
      console.log(this.$route.params.id);
      //   点击后跳转到当前id相对应的页面
      this.$router.push("/user/login/" + index);
    }
  }
};
</script>

<style lang='less' scoped>
.content {
  position: relative;
  height: 700px;
  background: url(http://127.1:11337/assets/images/th03.jfif) center center;

  .tite {
    display: flex;
    width: 400px;
    height: 50px;
    background-color: #fff;

    .tite_list {
      position: relative;
      flex: 1;
      text-align: center;
      line-height: 50px;
      background-color: #eee;

      &.active {
        background-color: #fff;
        color: orange;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: orange;
        }
      }
    }
  }

  .login_info {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
