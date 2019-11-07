<template>
  <div class="flightSearch">
    <!-- 筛选模块 -->
    <div class="flights_check">
      <div class="check_select">
        <div
          class="citys"
        >单程:&nbsp;{{datainfo.departCity}}-{{datainfo.destCity}}&nbsp;/&nbsp;{{datainfo.departDate}}</div>
        <div class="citys_select">
          <el-select
            class="select_item"
            v-model="airport"
            placeholder="起飞机场"
            size="mini"
            @change="handleChange"
            clearable
          >
            <el-option
              v-for="item in optionschang.airport "
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            class="select_item"
            v-model="flightTimes"
            placeholder="起飞时间"
            size="mini"
            @change="handleChange"
            clearable
          >
            <el-option
              v-for="item in optionschang.flightTimes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            class="select_item"
            v-model="company"
            placeholder="航空公司"
            size="mini"
            @change="handleChange"
            clearable
          >
            <el-option
              v-for="item in optionschang.company"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            class="select_item"
            placeholder="机型"
            size="mini"
            v-model="airSize"
            @change="handleChange"
            clearable
          >
            <el-option
              v-for="item in optionschang.airSize"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <!-- 筛选按钮 -->
      <div class="selectBtn">
        筛选：
        <el-button type="primary" plain size="mini" @click="handleClick">撤销</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datainfo: {
      type: Object,
      default: {}
    },
    optionsInfo: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    console.log(this.datainfo);
    console.log(this.optionsInfo);
  },
  data() {
    return {
      // 起飞机场
      airport: "",
      // 起飞时间
      flightTimes: "",
      // 航空公司
      company: "",
      // 机型
      airSize: ""
    };
  },
  computed: {
    optionschang() {
      // 起飞机场
      let airport = [];
      // this.optionsInfo.airport &&
      this.optionsInfo.airport.forEach(v => {
        v && airport.push({ value: v, label: v });
      });

      // 航空公司
      let company =
        // this.optionsInfo.company &&
        this.optionsInfo.company.map(v => {
          return { value: v, label: v };
        });

      // 起飞时间
      let flightTimes = this.optionsInfo.flightTimes.map(v => ({
        value: v.from + "|" + v.to, // 7|0
        label: `${v.from}:00 - ${v.to}:00`
      }));

      // 机型大小
      let airSize = [
        { value: "L", label: "大" },
        { value: "M", label: "中" },
        { value: "S", label: "小" }
      ];
      return { airport, company, airSize, flightTimes };
    }
  },
  methods: {
    // 撤销的点击按钮事件
    handleClick() {},
    // 筛选数值发送改变
    handleChange() {
      console.log(this.airport, this.flightTimes, this.company, this.airSize);
      // 把选中的数据发送到父组件中
      let filter = {
        airport: this.airport,
        flightTimes: this.flightTimes,
        company: this.company,
        airSize: this.airSize
      };
      this.$emit("handleChange", filter);
    }
  }
};
</script>

<style lang='less' scoped>
.flights_check {
  margin-right: 10px;
}
.check_select {
  display: flex;
  justify-content: space-between;

  .citys {
    font-size: 13px;
  }
  .citys_select {
    display: flex;
    justify-content: space-around;

    .select_item {
      width: 120px;
      margin-left: 5px;
    }
  }
}

.selectBtn {
  font-size: 13px;
}
</style>
