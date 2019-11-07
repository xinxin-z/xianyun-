<template>
  <!-- 机票列表头部 -->
  <div class="flightsHead">
    <div class="flights_head_item">航空信息</div>
    <div class="flights_head_item">起飞时间</div>
    <div class="flights_head_item">到达时间</div>
    <div class="flights_head_item">价格</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.flightsHead {
  display: flex;
  justify-content: space-around;
  border: 1px solid #ccc;
  background-color: #eee;
  font-size: 14px;
  color: #777;
  padding: 10px 0;
  margin: 20px 0;
}
</style>
