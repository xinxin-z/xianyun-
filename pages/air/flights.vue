<template>
  <div class="flights">
    <el-row>
      <el-col :span="18" class="left">
        <div class="grid-content bg-purple">
          <!-- 筛选模块 -->
          <flightSearch
            v-if="ticketList.flights"
            :datainfo="ticketList.info"
            :optionsInfo="ticketList.options"
            @handleChange="handleChange"
          ></flightSearch>
          <!-- 筛选模块结束 -->

          <!-- 机票信息表头 -->
          <flightsHead></flightsHead>

          <!-- 机票信息列表 -->
          <!-- 在父组件中遍历数据，使子组件中的每一行的数组都是独立的，点击展开列表的时候，就不会同时进行 -->
          <flightersItem v-for="(item,index) in flights" :key="index" :data="item"></flightersItem>
        </div>

        <!-- 分页 -->
        <div class="block">
          <!--  
            @size-change 页码改变事件
            @current-change 页容量改变事件
            :current-page  当前页码
            :page-sizes   页容量 数组
            :page-size   当前 页容量
          -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="certification">
            <div class="certification_icon">
              <div class="icon_item">
                <i class="iconfont iconweibiaoti-_huabanfuben"></i>
                <span>航协认证</span>
              </div>
              <div class="icon_item">
                <i class="iconfont iconbaozheng" style="color:green"></i>
                <span>出行保证</span>
              </div>
              <div class="icon_item">
                <i class="iconfont icondianhua"></i>
                <span>7×24</span>
              </div>
            </div>
            <div class="consumerHotline">免费客服电话: 4006345678转2</div>
          </div>
          <div class="history">
            <div class="history_title">历史查询</div>
            <div class="history_item" v-for="(item,index) in historyInfo" :key="index">
              <div class="items">
                <div class="place">{{item.departCity}} - {{item.destCity}}</div>
                <div class="time">{{item.departDate}}</div>
              </div>
              <div class="btn">
                <el-button type="warning" size="mini">选择</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import flightSearch from "../../components/air/flightsSearch";
import flightsHead from "../../components/air/flightsHead";
import flightersItem from "../../components/air/flightersItem";

export default {
  data() {
    return {
      // 机票列表
      ticketList: {},
      page: {
        // 当前页码
        currentPage: 1,
        // 当前页容量
        pageSize: 4,
        // 页容量
        pageSizes: [4, 8, 12, 16],
        // 总数
        total: 0
      },
      // 分页存储的数据列表
      flights: [],
      // 筛选后的数据源
      flightsList: [],
      // 历史搜索记录
      historyInfo: []
    };
  },
  components: {
    flightSearch,
    flightsHead,
    flightersItem
  },
  mounted() {
    console.log(this.$route.query);
    // 发送请求获取相关机票信息
    this.$axios
      .get("/airs", { params: this.$route.query })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.ticketList = res.data;
          console.log(this.ticketList);
          this.page.total = res.data.total;
          this.flightsList = this.ticketList.flights;
          // 当拿到数据之后就进行分页操作
          this.pagination();
        }
      })
      .catch(err => {
        console.log(err);
      });

    // 历史数据查询
    this.historyInfo = JSON.parse(localStorage.getItem("searchCityHistory"));
    console.log(this.historyInfo);
  },
  methods: {
    // 修改页容量
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.pagination();
    },
    // 改修当前页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.pagination();
    },
    // 分页
    pagination() {
      if (this.ticketList.flights) {
        // 公式

        this.flights = this.flightsList.slice(
          (this.page.currentPage - 1) * this.page.pageSize,
          this.page.currentPage * this.page.pageSize
        );
        console.log(this.flights);
      } else {
      }
    },
    // 筛选的条件
    handleChange(filter) {
      // 情况1： {airport: "浦东机场", flightTimes: "", company: "", airSize: ""}
      // 情况2： {airport: "浦东机场", flightTimes: "0|6", company: "南航", airSize: "L"}
      console.log(filter);

      // 1 先过滤 第一个条件， 航空公司
      // 要拿完整的数据来筛选
      this.flightsList = this.ticketList.flights.filter(v => {
        // 当取消选择航空公司的时候，也能查询到全部的数据
        // if (filter.company === "" || v.airline_name === filter.company) {
        //   return true;
        // } else {
        //   return false;
        // }
        // 过滤航空公司
        let company =
          filter.company === "" || v.airline_name === filter.company;

        // 过滤起飞机场
        let airport =
          filter.airport === "" || v.org_airport_name === filter.airport;

        // 过滤时间
        // 获取筛选条件中的时间
        let [from, to] = filter.flightTimes.split("|");
        // let to = filter.flightTimes.split("|")[1];
        // console.log(from, to);
        // 获取所有航班的起飞时间
        let deptime = v.dep_time.split(":")[0];
        // console.log(deptime);
        // + 强转为数字类型
        let time =
          filter.flightTimes === "" || (+deptime >= +from && +deptime <= +to);

        // 过滤机型
        let sizas = filter.airSize === "" || v.plane_size === filter.airSize;

        return company && airport && sizas && time;
      });

      // 重新调用分页刷新数据列表
      this.page.total = this.flightsList.length;
      this.pagination();
    }
  }
};
</script>

<style lang='less' scope>
.flights {
  width: 1000px;
  margin: 10px auto;

  .certification {
    border: 1px solid #999;
    margin-bottom: 10px;
    margin-left: 10px;

    .certification_icon {
      display: flex;
      justify-content: space-around;
      padding: 10px;

      .icon_item {
        display: flex;
        flex-flow: column;
        align-items: center;
        i {
          color: rgb(64, 158, 255);
          font-size: 45px;
        }
        span {
          font-size: 13px;
        }
      }
    }

    .consumerHotline {
      background-color: #eee;
      padding: 5px;
      font-size: 14px;
      text-align: center;
    }
  }

  .history {
    border: 1px solid #999;
    padding: 10px 15px 0 15px;
    margin-left: 10px;

    .history_title {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }

    .history_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;

      .items {
        .time {
          font-size: 13px;
          line-height: 18px;
          color: #999;
        }
      }
    }
  }
}
</style>
