<template>
  <!-- 搜索机票 -->
  <div class="air_header">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content air_left">
          <!-- 机票栏目 -->
          <div class="title">
            <div
              class="tite_list"
              v-for="(item,index) in ['单程','往返']"
              :key="index"
              :class="listIndex == index ? 'active':''"
              @click="change(index)"
            >{{item}}</div>
          </div>
          <!-- 表单 -->
          <div class="air_city">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="出发城市">
                <!-- <el-input v-model="form.name" placeholder="请搜索出发城市"></el-input> -->
                <el-autocomplete
                  v-model="form.departCity"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect1"
                  style="width:100%"
                ></el-autocomplete>
              </el-form-item>

              <!-- 换 -->
              <div class="changeCity" @click="changeCity">换</div>

              <el-form-item label="到达城市">
                <!-- <el-input v-model="form.name" placeholder="请搜索到达城市"></el-input> -->
                <el-autocomplete
                  v-model="form.destCity"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect2"
                  style="width:100%"
                ></el-autocomplete>
              </el-form-item>

              <el-form-item label="出发时间">
                <div class="block">
                  <el-date-picker
                    v-model="form.departDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" style="width:100%" @click="handleGetTicket">
                  <i class="el-icon-search"></i>&nbsp;&nbsp;搜索
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>

      <el-col :span="16">
        <div class="grid-content bg-purple air_right">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listIndex: 0,
      form: {
        city: ""
      },
      form: {
        //   出发城市
        departCity: "上海",
        // 出发城市代码
        departCode: "SHA",
        // 目标城市
        destCity: "广州",
        // 目标城市代码
        destCode: "CAN",
        // 日期
        departDate: "2019-11-30"
      }
    };
  },
  methods: {
    //   切换栏目
    change(index) {
      this.listIndex = index;
      //   如果点击往返按钮，则弹出未开放弹窗
      if (this.listIndex === 1) {
        this.$alert("目前不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定"
        });
        this.listIndex = 0;
      }
    },
    // 展示下拉框
    querySearchAsync(queryString, cb) {
      console.log(queryString);
      //   如果用户键入了数值，则发起获取城市名的请求
      //   搜索关键字，发送请求，例如“广”
      if (queryString) {
        this.$axios
          .get("/airs/city", { params: { name: queryString } })
          .then(res => {
            console.log(res);
            let cityList = res.data.data;
            // 遍历数组，添加value属性，element下拉框需要value值，
            cityList.forEach(v => {
              v.value = v.name.replace("市", "");
            });
            // 把异步查询获取到的结果通过回调方法传递返回数组，进行下一步操作
            cb(cityList);
          });
      }
    },
    handleSelect1(item) {
      // 出发城市代码赋值
      console.log(item);
      this.form.departCode = item.sort;
    },
    handleSelect2(item) {
      // 到达城市代码赋值
      console.log(item);
      this.form.destCode = item.sort;
    },
    // 交换城市和编码
    changeCity() {
      // es6 调换数组元素位置 (解构)
      [
        this.form.departCity,
        this.form.departCode,
        this.form.destCity,
        this.form.destCode
      ] = [
        this.form.destCity,
        this.form.destCode,
        this.form.departCity,
        this.form.departCode
      ];
    },
    // 点击搜索按钮
    handleGetTicket() {
      // 将搜索记录存储在本地
      // 1 查询本地现有的数据
      // 在本地存储里面取出来的数据是字符串,要先转换为数组的形式
      let oldData = JSON.parse(localStorage.getItem("searchCityHistory")) || [];

      // 去重
      // 判断新数据的内容与旧数据的内容有无重复的地方,有就去除
      // 把对象里面的内容变成字符串来比较,如果findIndex找到了,就会返回一个索引值,没有则返回-1
      let index = oldData.findIndex(v => {
        return JSON.stringify(this.form) === JSON.stringify(v);
      });
      // console.log(index);
      // 把重复的数据删除
      if (index !== -1) {
        oldData.splice(index, 1);
      }

      // 将新的数据增加到本地数据里面
      oldData.push(this.form);
      // 将新增加好的数据数组转换为字符串,存储在本地
      let newDates = JSON.stringify(oldData);
      localStorage.setItem("searchCityHistory", newDates);
      // 进行表单验证
      // 跳转到飞机列表页面
      this.$router.push({ path: "/air/flights", query: this.form });
    }
  }
};
</script>

<style lang='less' scoped>
.air_header {
  margin-bottom: 20px;
}
.air_right {
  img {
    display: block;
    float: right;
    width: 566px;
    height: 341px;
  }
}
.air_left {
  width: 400px;
  border: 1px solid #eee;
  border-top: none;
}
.title {
  display: flex;
  width: 100%;
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

.air_city {
  position: relative;
  padding: 20px;
  width: 300px;

  .changeCity {
    position: absolute;
    top: 61px;
    right: -33px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    background-color: #999;
    color: #fff;
    text-align: center;
    font-size: 13px;
    &:hover {
      cursor: pointer;
    }

    &::before {
      content: "";
      width: 42px;
      height: 25px;
      border: 1px solid #999;
      border-bottom: none;
      border-left: none;
      position: absolute;
      top: -22px;
      left: -31px;
    }
    &::after {
      content: "";
      width: 42px;
      height: 25px;
      border: 1px solid #999;
      border-top: none;
      border-left: none;
      position: absolute;
      bottom: -22px;
      left: -31px;
    }
  }
}
</style>
