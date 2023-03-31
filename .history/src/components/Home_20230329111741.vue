<template>
  <div style="display: flex; gap: 50px">
    <el-carousel>
      <el-carousel-item v-for="i in imgs">
        <img :src="i.picturePath" @load="imgLoad" @click="rollToVideo(i)" />
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div style="text-align: center">
              <span>热播排行榜</span>
            </div>
          </div>
        </template>
        <div
          v-for="o in popularList"
          :key="o"
          class="text item"
          style="width: 500px"
          @click="popularToVideo(o)"
        >
          {{ o.videoTitle }}
        </div>
      </el-card>
    </div>
  </div>

  <div class="home-card" v-show="contentshow">
    <el-row alignment="flex-start">
      <el-col
        v-for="o in movieList"
        :key="o.videoId"
        :xs="8"
        :sm="4"
        :md="4"
        style="padding: 9px"
      >
        <!-- :to="'/movdetail/' + o.checkVideoId" -->
        <!-- :to="{ path: '/checkvideo', query: { id: 113 } }" -->

        <router-link
          :to="{
            path: '/video',
            query: { videoId: o.videoId },
          }"
          style="text-decoration: none"
          target="_blank"
        >
          <el-card
            class="box-card"
            @click="selectMovie"
            shadow="hover"
            :body-style="{ padding: '8px 5px' }"
          >
            <div class="card-div" style="width: 100%; height: 200px">
              <img
                :src="o.picturePath"
                class="card-image"
                style="width: 100%; height: 100%"
              />

              <!-- 备注 -->
              <!-- <span class="card-remark">{{ o.vod_remarks }}</span> -->
            </div>
            <div>播放量:{{ o.viewNum }}</div>
            <div>用户:{{ o.userName }}</div>
            <div style="padding: 0px">
              <span
                style="
                  line-height: 26px;
                  font-size: 15px;
                  color: #777;
                  display: flex;
                  margin-top: 4px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  width: 80%;
                  white-space: nowrap;
                "
              >
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="o.videoTitle"
                  placement="bottom-end"
                  :show-after="1000"
                >
                  标题:{{ o.videoTitle }}
                </el-tooltip>
              </span>
              <!-- <div class="bottom">
              <p style="font-size:smaller; color:#777; margin: 4px 0">{{ o.vod_remarks }}</p>
            </div> -->
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
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
import { getRecommendList, getPoplularVideoList } from "../services/video";
import router from "../router/router.js";
export default {
  name: "MovieHome",

  data() {
    return {
      imgs: [],
      contentshow: true,
      movieList: [],
      popularList: [],
      currentPage: 0,
      pageSize: 11,
    };
  },
  methods: {
    imgLoad() {
      this.$nextTick(() => {});
    },
    rollToVideo(i) {
      let routeData = this.$router.resolve({
        path: "/video",
        query: { videoId: i.videoId },
      });

      window.open(routeData.href, "_blank");
    },

    popularToVideo(i) {
      let routeData = this.$router.resolve({
        path: "/video",
        query: { videoId: i.videoId },
      });

      window.open(routeData.href, "_blank");
    },

    async getPopularList() {
      try {
        const res = await getPoplularVideoList(this.currentPage, this.pageSize);

        for (var i = 0; i < 11; i++) {
          this.popularList.push(res.list[i]);
        }

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async getMovList() {
      try {
        const res = await getRecommendList();

        for (var i = 0; i < 5; i++) {
          this.imgs.push(res.data[i]);
        }

        if (res.data.length > 0) {
          for (var i = 5; i < 17; i++) {
            this.movieList.push(res.data[i]);
          }
        } else {
          this.contentShow = false;
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

    this.getPopularList();
  },
};
</script>

<style scoped>
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
  width: 600px;
  height: 350px;
}
.el-carousel-item {
  width: 600px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-carousel__container {
  width: 600px;
  height: 350px;
}
.el-carousel-item img {
  max-width: 100%;
  max-height: 100%;
}
</style>
