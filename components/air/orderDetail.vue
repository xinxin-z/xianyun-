<template>
  <!-- 机票订单详情页 -->
  <div class="orderDetail">
    <!-- 乘机人 -->
    <div class="passenger">
      <!-- 需要调用计算属性才能返回数据 -->
      <input type="hidden" name id :value="prices" />
      <div class="passengerTitle">乘机人</div>

      <!-- 乘机人类型 -->
      <div class="passengerType" v-for="(item,index) in users" :key="index">
        <!-- 乘机人类型 -->
        <div style="margin-top: 15px;">
          <span>乘机人类型</span>
          <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
            <el-select v-model="selectName" slot="prepend" style="width:120px">
              <el-option label="成人" value="1"></el-option>
            </el-select>
          </el-input>
        </div>

        <!-- 减少乘机人 -->
        <div class="reduce" @click="reducePeople(index)" v-if="users.length > 1">-</div>

        <!-- 证件类型 -->
        <div style="margin-top: 15px;">
          <span>证件类型</span>
          <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
            <el-select v-model="selectCredentials" slot="prepend" style="width:120px">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
            </el-select>
          </el-input>
        </div>
      </div>

      <el-button type="primary" class="addPassenger" @click="addPeople">添加乘机人</el-button>
    </div>

    <!-- 保险 -->
    <div class="insurance">
      <div class="insurTitle">保险</div>
      <div class="insurSelect" v-for="(item,index) in insurancesInfo" :key="index">
        <el-checkbox
          class="select"
          label="备选项1"
          border
          @change="selectIt(item.id)"
        >{{item.type}}: ¥{{item.price}}/份x1最高赔付{{item.compensation}}</el-checkbox>
      </div>
    </div>

    <!-- 联系人 -->
    <div class="contact">
      <div class="contactTitle">联系人</div>
      <div class="form">
        <el-form :model="form" status-icon :rules="rules" ref="form" class="demo-ruleForm">
          <el-form-item label="姓名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="form.phone">
              <template slot="append">
                <span class="sendCaptchas" @click="sendcaptchas">发送验证码</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verificationCode">
            <el-input v-model="form.verificationCode"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-button type="warning" class="submitBtn" @click="submitOrder">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户
      users: [
        {
          username: "",
          id: ""
        }
      ],
      // 机票信息
      tickets: {},
      // 保险
      insurancesInfo: [],
      // 保险id
      insurances: [],
      checked: false,
      // 默认乘机人选项
      selectName: "1",
      //   默认证件类型选项
      selectCredentials: "1",
      //   姓名
      inputName: "",
      //   证件
      inputCred: "",
      form: {
        //   姓名
        username: "",
        // 手机
        phone: "",
        // 验证码
        verificationCode: "000000"
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    console.log(this.$route.query);
    // 根据路由获取参数
    let id = this.$route.query.id;
    let seat_xid = this.$route.query.seat_xid;
    // 发送请求获取机票数据
    // this.$axios.get(`/airs/${id}seat_xid=${seat_xid}`).then(res => {
    this.$axios.get(`/airs/${id}`, { params: { seat_xid } }).then(res => {
      console.log(res);
      if (res.status === 200) {
        //   获取保险信息
        this.insurancesInfo = res.data.insurances;
        console.log(this.insurancesInfo);
        // 获取机票数据
        this.tickets = res.data;
        console.log(this.tickets);
        // 发射数据给父组件
        this.$emit("dataInfo", res.data);
      }
    });
  },
  methods: {
    // 点击添加新的联系人
    addPeople() {
      this.users.push({ username: "", id: "" });
    },
    // 点击减少联系人
    reducePeople(index) {
      this.users.splice(index, 1);
    },
    // 获取保险id(发请求需要的参数)
    selectIt(id) {
      // console.log(id);
      // this.insurances.push(id);
      // 多次点击会有重复值，判断有无重复值
      const index = this.insurances.findIndex(v => v === id);
      // console.log(index);
      if (index !== -1) {
        // 如果有重复的id，就需要去除
        this.insurances.splice(index, 1);
      } else {
        // 没有重复的id，就可以添加进数组
        this.insurances.push(id);
      }
      // console.log(this.insurances);
    },
    // 发送验证码
    sendcaptchas() {
      this.$axios.post("/captchas", { tel: this.form.phone }).then(res => {
        console.log(res);
      });
    },
    // 提交表单
    submitOrder() {
      let formInfo = {
        // 用户列表
        users: this.users,
        // 保险id
        insurances: this.insurances,
        // 联系人姓名
        contactName: this.form.username,
        // 联系人电话
        contactPhone: this.form.phone,
        // 默认不需要发票
        invoice: false,
        // 座位id
        seat_xid: this.$route.query.seat_xid,
        // 航班id
        air: this.$route.query.id,
        // 手机验证码
        captcha: this.form.verificationCode
      };

      let token = this.$store.state.user.userinfo.token;

      console.log(token);
      console.log(formInfo);
      // 发起提交订单请求
      this.$axios
        .post("/airorders", formInfo, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success(res.data.message);
            // 跳转到微信付款页
            setTimeout(() => {
              this.$router.push({
                path: "/air/pay",
                query: { id: res.data.data.id }
              });
            }, 1000);
          }
        });
    }
  },
  computed: {
    // 计算总价
    prices() {
      let price = 0;
      // 基础价格
      price += this.tickets.base_price;
      // 加机件燃油费
      price += this.tickets.airport_tax_audlet;

      // 保险费用
      // 匹配用户选中的保险的id，和数据中的id是否相对应
      // console.log(this.insurancesInfo);
      this.insurances.forEach(v => {
        // console.log(v);
        const index = this.insurancesInfo.findIndex(vv => vv.id === v);
        // console.log(index);
        // 如果找到匹配的id，就用这个id，在数据里面查找，然后找到对应的保险数据对象
        // console.log(this.insurancesInfo[index]);
        let item = this.insurancesInfo[index];

        // 然后叠加价格
        price += item.price;
      });

      // 用户数量
      price *= this.users.length;
      // 发射到父组件
      this.$emit("getprice", price);
      return price;
    }
  }
};
</script>

<style lang='less' scoped>
.orderDetail {
  .passenger {
    border-bottom: 1px solid #eee;
    padding: 20px 0;
    margin-bottom: 20px;

    .passengerType {
      position: relative;
      span {
        font-size: 14px;
        color: #999;
        line-height: 30px;
      }
      .reduce {
        position: absolute;
        top: 78px;
        right: -24px;
        width: 20px;
        height: 20px;
        line-height: 16px;
        font-size: 24px;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        background-color: #999;
      }
    }
    .addPassenger {
      margin: 50px 0 5px 0;
    }
  }

  .passengerTitle,
  .insurTitle,
  .contactTitle {
    font-size: 18px;
    font-weight: 700;
  }

  .insurance {
    border-bottom: 1px solid #eee;
    padding: 20px 0;
    margin-bottom: 20px;

    .insurSelect {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      .select {
        width: 400px;
        margin-bottom: 20px;
        &:last-child {
          margin-left: 0;
        }
      }
    }
  }

  .contact {
    margin-bottom: 50px;

    .form {
      width: 400px;
    }
  }

  .submitBtn {
    width: 200px;
    margin-top: 20px;
    margin-left: 40%;
  }

  .sendCaptchas {
    cursor: pointer;
  }
}
</style>
