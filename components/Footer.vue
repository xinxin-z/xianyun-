<template>
  <div class="Footer">
    <div class="main">
      <div :gutter="20" class="info_list">
        <el-col :span="6">
          <h3>闲云旅游旅游网</h3>
          <p>上亿旅行者共同打造的"旅行神器"</p>
          <p>
            <span>60,000</span> 多个全球旅游目的地
          </p>
          <p>
            <span>600,000</span>个细分目的地新玩法
          </p>
          <p>
            <span>760,000,000</span> 次攻略下载
          </p>
          <p>
            <span>38,000</span> 家旅游产品供应商
          </p>
        </el-col>
        <el-col :span="5">
          <h3>关于我们</h3>
          <p>隐私政策 商标声明</p>
          <p>服务协议 游记协议</p>
          <p>商城平台服务协议</p>
          <p>网络信息侵权通知指引</p>
          <p>闲云旅游旅游网服务监督员</p>
          <p>网站地图加入闲云旅游</p>
        </el-col>
        <el-col :span="5">
          <h3>旅行服务</h3>
          <p>旅游攻略 酒店预订</p>
          <p>旅游特价 国际租车</p>
          <p>旅游问答 旅游保险</p>
          <p>旅游指南 订火车票</p>
          <p>旅游资讯 APP下载</p>
        </el-col>
        <el-col :span="6" class="erweima">
          <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
          <p>关注我们</p>
        </el-col>
      </div>

      <div class="licence">
        <p>京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'  scoped>
.Footer {
  background-color: #333;

  .main {
    width: 1000px;
    margin: 0 auto;
    color: #fff;
  }

  .info_list {
    height: 200px;
    display: flex;
    justify-content: space-around;
    padding: 30px 25px;
    h3 {
      font-size: 16px;
      font-weight: normal;
    }
    p {
      font-size: 12px;
      span {
        color: orange;
      }
    }
    .erweima {
      text-align: center;
      img {
        display: block;
        width: 140px;
        height: 140px;
        margin: 25px auto;
      }
    }
  }

  .licence {
    padding: 10px;
    margin: 0 auto;
    text-align: center;
    font-size: 12px;
    border-top: 1px solid #888;
  }
}
</style>
