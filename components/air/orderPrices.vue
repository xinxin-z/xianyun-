<template>
  <div class="orderPrices">
    <div class="price">
      <!-- 城市信息 -->
      <div class="info">
        <div class="date">{{data.dep_date}}</div>
        <div class="travel">{{data.org_city_name}} - {{data.dst_city_name}}</div>
      </div>

      <!-- 航班信息 -->
      <div class="flighInfo">
        <!-- 起飞信息 -->
        <div class="depTime">
          <div class="dep_time">{{data.dep_time}}</div>
          <div class="dep_airport">{{data.org_airport_name}}{{data.org_airport_quay}}</div>
        </div>

        <!-- 历程信息 -->
        <div class="mileageTime">
          <div class="mileage_time">--- {{durations}}---</div>
          <div class="flighInfos">{{data.airline_name}} {{data.flight_no}}</div>
        </div>

        <!-- 到达信息 -->
        <div class="arrTime">
          <div class="arr_time">{{data.arr_time}}</div>
          <div class="arr_airport">{{data.dst_airport_name}}{{data.dst_airport_quay}}</div>
        </div>
      </div>

      <!-- 订单详情 -->
      <div class="orderDetails">
        <el-row class="detalItem">
          <el-col :span="8">
            <div class="grid-content bg-purple">订单总价</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light" style="text-align:center">金额</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple" style="text-align:right">数量</div>
          </el-col>
        </el-row>

        <el-row class="detalItem">
          <el-col :span="8">
            <div class="grid-content bg-purple">成人机票</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light" style="text-align:center">￥{{data.base_price}}</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple" style="text-align:right">×1</div>
          </el-col>
        </el-row>

        <el-row class="detalItem">
          <el-col :span="8">
            <div class="grid-content bg-purple">机建+燃油</div>
          </el-col>
          <el-col :span="8">
            <div
              class="grid-content bg-purple-light"
              style="text-align:center"
            >￥{{data.airport_tax_audlet}}/人/单程</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple" style="text-align:right">×1</div>
          </el-col>
        </el-row>
      </div>

      <!-- 总价 -->
      <div class="totalPrice">
        <div>应付总额：</div>
        <div class="price">￥{{price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: {} },
    price: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    // console.log(this.price);
  },
  // 计算时间差
  computed: {
    // 时间距离格式化
    durations() {
      // 获取时间
      let firstTime = this.data.dep_datetime;
      let lastTime = this.data.arr_datetime;

      let startDate = new Date(firstTime);
      let EndDate = new Date(lastTime);

      // 计算差值 两个格式化时间相减，结果为毫秒
      let duration = EndDate - startDate;

      // 时
      let hour = parseInt(duration / 1000 / 60 / 60);
      // 分
      let minutes = parseInt(duration / 1000 / 60 - hour * 60);
      return hour + " 时 " + minutes + " 分";
    }
  }
};
</script>

<style lang='less' scoped>
.orderPrices {
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 25px;

  .info {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    margin-bottom: 5px;
  }

  .flighInfo {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    padding: 5px 0;
    margin-bottom: 10px;

    .dep_time,
    .arr_time {
      font-size: 20px;
      padding-bottom: 5px;
    }

    .dep_airport,
    .arr_airport,
    .mileageTime {
      font-size: 13px;
      color: #999;
    }
  }

  .orderDetails {
    border-top: 1px dashed #999;
    font-size: 14px;

    .detalItem {
      border-bottom: 1px dashed #999;
      padding: 10px 0;
    }
  }

  .totalPrice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 0 0;
    .price {
      font-size: 24px;
      color: orange;
    }
  }
}
</style>
