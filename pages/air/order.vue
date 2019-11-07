<template>
  <!-- 机票订单页 -->
  <div class="order">
    <el-row>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <!-- 订单 -->
          <orderDetail @dataInfo="dataInfo" @getprice="getprice"></orderDetail>
        </div>
      </el-col>

      <el-col :span="9" class="price">
        <div class="grid-content bg-purple-light">
          <!-- 订单价格表 -->
          <orderPrices v-if="datas.id" :data="datas" :price="price"></orderPrices>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import orderDetail from "../../components/air/orderDetail";
import orderPrices from "../../components/air/orderPrices";

export default {
  components: { orderDetail, orderPrices },
  data() {
    return {
      datas: {},
      price: 0
    };
  },
  methods: {
    // 机票数据
    dataInfo(data) {
      this.datas = data;
      console.log(this.datas);
    },
    // 价格
    getprice(price) {
      this.price = price;
      console.log(this.price);
    }
  }
};
</script>

<style lang='less' scoped>
.order {
  width: 1000px;
  margin: 0 auto;

  .price {
    margin-left: 40px;
  }
}
</style>
