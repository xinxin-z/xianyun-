<template>
  <!-- 首页 -->
  <div class="index">
    <!-- 内容 -->
    <div class="block">
      <!-- 背景轮播图 -->
      <el-carousel height="700px">
        <el-carousel-item v-for="(item,index) in photoList" :key="index">
          <!-- <h3>{{ item.url }}</!-->
          <div
            :style="`background:url(${$axios.defaults.baseURL + item.url}) center center;height: 700px;`"
          ></div>
        </el-carousel-item>
      </el-carousel>

      <!-- 搜索框 -->
      <div class="search">
        <indexSearch></indexSearch>
      </div>
    </div>
  </div>
</template>

<script>
import indexSearch from "../components/index/typeSearch";

export default {
  components: {
    indexSearch
  },
  mounted() {
    console.log(this.photoList);
  },

  data() {
    return {
      photoList: []
    };
  },
  // 获取轮播图数据
  asyncData(context) {
    const $axios = context.app.$axios;
    return $axios.get("/scenics/banners").then(res => {
      return { photoList: res.data.data };
    });
  }
};
</script>

<style lang='less' scoped>
.block {
  position: relative;
  .search {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 111;
  }
}
</style>
