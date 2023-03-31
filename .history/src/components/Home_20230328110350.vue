<template>
  <div class="container">
    <el-carousel>
      <el-carousel-item v-for="i in imgs">
        <img :src="i.picturePath" @load="imgLoad" @click="test(i.videoId)" />
      </el-carousel-item>
    </el-carousel>

    <div style="color: red; width: 100px; height: 100px display: inline-block;">
      12441
    </div>
  </div>

  <!-- <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>成功登录</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div> -->
</template>

<script>
import SakuraBigImgVue from "./SakuraBigImg.vue";
import { getRecommendList } from "../services/video";
export default {
  name: "MovieHome",
  components: {
    SakuraBigImgVue,
  },
  data() {
    return {
      imgs: [],
      contentshow: true,
      movieList: [],
    };
  },
  methods: {
    imgLoad() {
      this.$nextTick(() => {});
    },
    test(i) {
      console.log("wuhu");
      console.log(i);
    },

    async getMovList() {
      try {
        const res = await getRecommendList();

        if (res.data.length > 0) {
          for (var i in res.data) {
            this.movieList.push(res.data[i]);
          }
        } else {
          this.contentShow = false;
        }

        for (var i = 0; i < 5; i++) {
          this.imgs.push(this.movieList[i]);
        }

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getMovList();

    this.imgLoad();
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
span.home-card-type {
  float: left;
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
}

.home-card-type {
  float: left;
  margin: 10px;
  line-height: 20px;
}

a.home-card-type:hover {
  color: rgb(36, 184, 242) !important;
}

/* .image-text {
  position: absolute;
  top: 75%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  z-index: 1;
} */

.el-carousel {
  width: 500px;
  height: 300px;
}
.el-carousel-item {
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-carousel-item img {
  max-width: 100%;
  max-height: 100%;
}
</style>
