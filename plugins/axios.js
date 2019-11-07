// 错误信息拦截
// 引入elment-ui的样式
import { Message } from "element-ui";

export default function({ $axios, redirect }) {
  $axios.onError(error => {
    //   获取请求失败后的返回值
    const { statusCode, message } = error.response.data;
    if (statusCode === 400) {
      Message.warning(message);
    } else if (statusCode === 401) {
      // token过期
      Message.warning("token过期");
      setTimeout(() => {
        //   返回登录页码
        redirect("/user/login/0");
      }, 1000);
    } else if (statusCode === 403) {
      // 没有token
      Message.warning("没有token");
      setTimeout(() => {
        //   返回登录页码
        redirect("/user/login/0");
      }, 1000);
    }
  });
}
