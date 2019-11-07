<template>
  <div class="air">
    <!-- 国内机票页面 -->

    <!-- 内容部分 -->
    <div class="air_main">
      <div class="air_check">
        <!-- 国内机票标题 -->
        <div class="check_title">
          <i class="iconfont iconfeiji"></i>&nbsp;国内机票
        </div>

        <!-- 查询城市机票 -->
        <div class="check_content">
          <airHeader></airHeader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import airHeader from "../../components/air/airHeader";

export default {
  components: { airHeader },
  data() {
    return {};
  }
};
</script>

<style lang='less' scoped>
.air_main {
  width: 1000px;
  margin: 0 auto;

  .check_title {
    color: orange;
    font-size: 20px;
    margin: 20px 0;
  }
}
</style>
