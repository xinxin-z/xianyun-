<template>
  <!-- 微信付款页码 -->
  <div class="pays">
    <div class="orderPay">
      <div class="totalprice">
        支付总金额
        <span>￥{{orderInfo.price}}</span>
      </div>

      <div class="pay">
        <div class="paytitle">微信支付</div>
        <div class="payWay">
          <div class="QRcode">
            <canvas id="canvas"></canvas>
            <p>
              请使用微信扫一扫
              <br />扫描二维码支付
            </p>
          </div>
          <div class="wayimg">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderInfo: {}
    };
  },
  mounted() {
    let id = this.$route.query.id;
    let token = this.$store.state.user.userinfo.token;
    // 发送请求获取订单详情
    this.$axios
      .get("/airorders/" + id, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.orderInfo = res.data;
          // 获取到订单的详情信息
          console.log(this.orderInfo);

          // 画二维码
          var QRCode = require("qrcode");
          var canvas = document.getElementById("canvas");
          QRCode.toCanvas(canvas, res.data.payInfo.code_url, function(error) {
            if (error) console.error(error);
            console.log("success!");
          });

          // 开启定时器，查看用户是否支付成功
          let timeID = setInterval(() => {
            // 发送查看付款状态的请求
            this.$axios
              .post(
                "/airorders/checkpay",
                {
                  id,
                  nonce_str: res.data.payInfo.nonce_str,
                  out_trade_no: res.data.payInfo.order_no
                },
                {
                  headers: { Authorization: `Bearer ${token}` }
                }
              )
              .then(result => {
                console.log(result);
                // 支付成功后停止继续发送请求
                if (result.data.trade_state === "SUCCESS") {
                  clearInterval(timeID);
                  this.$message.success("支付成功");
                }
              });
          }, 3000);
        }
      });
  }
};
</script>

<style lang='less' scoped>
.pays {
  background-color: rgb(245, 245, 245);
}
.orderPay {
  width: 1000px;
  margin: 0 auto;

  .totalprice {
    width: 100%;
    padding: 20px 0 10px 0;
    text-align: right;
    font-size: 15px;
    span {
      font-size: 25px;
      color: red;
    }
  }

  .pay {
    border-top: 3px solid orange;
    background-color: #fff;
    padding: 25px;

    .paytitle {
      font-weight: 700;
      margin-bottom: 20px;
    }

    .payWay {
      display: flex;
      justify-content: space-between;
      margin: 0 10%;

      .QRcode {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #999;
        width: 210px;
        height: 320px;
        margin-top: 30px;
        box-sizing: border-box;
        padding: 30px 0;

        p {
          text-align: center;
          line-height: 35px;
        }
      }
    }
  }
}
</style>
