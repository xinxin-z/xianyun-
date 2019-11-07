<template>
  <!-- 机票详情列表 -->
  <div class="flightersItems">
    <div class="flighters_item">
      <!-- 航班信息 -->
      <div class="flighters_item_info" @click="isShow = !isShow">
        <div
          class="flighterName"
        >{{data.airline_name}}&nbsp;{{data.flight_no}}&nbsp;--&nbsp;{{data.plane_size}}</div>
        <div class="departTime">
          <div class="time">{{data.dep_time}}</div>
          <div class="location">{{data.org_airport_name}}{{data.org_airport_quay}}</div>
        </div>
        <div class="allTime">{{durations}}</div>
        <div class="arrayTime">
          <div class="time2">{{data.arr_time}}</div>
          <div class="location2">{{data.dst_airport_name}}{{data.dst_airport_quay}}</div>
        </div>
        <div class="lowPrice">
          ￥
          <span>{{data.base_price * 0.3}}</span>起
        </div>
      </div>
      <!-- 机票价格列表 -->
      <div class="flighters_item_price" v-show="isShow">
        <div class="low_price">低价推荐</div>
        <div class="ticket_price">
          <div class="ticket_price_item" v-for="(item,index) in data.seat_infos" :key="index">
            <div class="site">
              <span>{{item.name}}</span>
              | {{item.supplierName}}
            </div>
            <div class="price">
              ￥
              <span>{{data.base_price}}</span>
            </div>
            <div class="seletct">
              <el-button
                type="warning"
                size="mini"
                @click="handlerGoToOrder(data.id,item.seat_xid)"
              >选定</el-button>
              <div class="remainder">
                剩余：
                <span>{{item.discount}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
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
  },
  mounted() {
    console.log(this.data);
    // console.log(this.data.id);
  },
  data() {
    return {
      // 默认不展示机票价格栏
      isShow: false
    };
  },
  methods: {
    // 跳转到订单详情页,order
    handlerGoToOrder(id, seat_xid) {
      // console.log(id, seat_xid);
      // query后接对象
      this.$router.push({ path: "/air/order", query: { id, seat_xid } });
    }
  }
};
</script>

<style lang='less' scoped>
.flighters_item {
  border: 1px solid #eee;
  margin-bottom: 10px;

  .flighters_item_info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70px;

    .flighterName {
      font-size: 14px;
    }

    .location,
    .location2,
    .allTime {
      color: #ccc;
      font-size: 12px;
    }

    .time,
    .time2 {
      text-align: center;
      font-size: 18px;
    }

    .allTime {
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      padding: 10px 0;
    }

    .lowPrice {
      font-size: 13px;
      span {
        font-size: 18px;
        color: orange;
      }
    }
  }

  .flighters_item_price {
    background-color: #eee;
    display: flex;

    .low_price {
      width: 130px;
      font-size: 13px;
    }

    .low_price,
    .site,
    .price {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ticket_price {
      width: 100%;
      flex: 1;
    }

    .ticket_price_item {
      display: flex;
      border-bottom: 1px solid #ccc;
      justify-content: space-around;
      padding: 10px;
      &:last-child {
        border-bottom: none;
      }
      .site {
        font-size: 12px;
        span {
          color: green;
        }
      }

      .price {
        color: orange;
      }

      .remainder {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
