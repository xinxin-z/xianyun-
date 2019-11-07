// 模块封装
// 定义 state 函数, 返回对象
export const state = () => ({
  userinfo: {
    token: "",
    user: {}
  }
});

// // 定义 mutationsex
export const mutations = {
  setUserInfo(state, userinfo) {
    // 接收从登录页传递过来的userinfo,赋值给state里面的userinfo
    state.userinfo = userinfo;
  }
};

// 定义actions 负责异步操作
export const actions = {
  setUser(context, loginInfo) {
    //   接收dispatch传递过来的数据,发请求
    return this.$axios.post("/accounts/login", loginInfo).then(res => {
      // console.log(res);
      if (res.status === 200) {
        // console.log(res);
        //   调用mutations方法
        context.commit("setUserInfo", res.data);
        //   将用户数据存储到本地
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      }
    });
  }
};
