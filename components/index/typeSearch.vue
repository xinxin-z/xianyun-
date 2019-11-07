<template>
  <div class="index">
    <div class="search">
      <!-- 搜索条目 -->
      <div
        class="title"
        @click="changeIndex(index)"
        v-for="(item,index) in title"
        :key="index"
      >{{item.text}}</div>
      <!-- 搜索框 -->
      <el-input :placeholder="title[titleIndex].SearchPhlaceholder" suffix-icon="el-icon-search"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [
        {
          text: "攻略",
          SearchPhlaceholder: "搜索城市"
        },
        {
          text: "酒店",
          SearchPhlaceholder: "请输入城市搜索酒店"
        },
        {
          text: "机票",
          SearchPhlaceholder: "请输入出发地"
        }
      ],
      titleIndex: 0
    };
  },
  methods: {
    changeIndex(index) {
      // 切换遍历搜索导航栏的索引,切换索引,给默认值赋值
      this.titleIndex = index;
      // 如果是点击到机票按钮,则需要跳转到机票页面
      if (index === 2) {
        this.$router.push("/air");
      }
    }
  }
};
</script>

<style lang='less' scoped>
.title {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #999;
  transform: skewX(-9deg);
  float: left;
  font-size: 13px;
  &:hover {
    cursor: pointer;
  }
}
.search {
  width: 552px;
  height: 47px;
}
</style>
