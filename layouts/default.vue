<template>
  <div>
    <!-- 全局引入头部和尾部 -->
    <myHeader></myHeader>
    <nuxt />
    <myfooter></myfooter>
  </div>
</template>

<script>
import myHeader from "../components/Header";
import myfooter from "../components/Footer";
export default {
  components: {
    myHeader,
    myfooter
  }
};
</script>

<style>
</style>
