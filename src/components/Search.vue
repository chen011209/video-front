<template>
  <div v-if="this.isEmpty" class="container">没有搜索到视频</div>
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

  <div class="container">
    <el-pagination
      :page-size="this.pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      :total="this.pageSize * this.pagerCount"
      v-model:current-page="currentPage"
    />
  </div>
</template>

<script>
import { getSearchList } from "../services/video";

export default {
  setup() {
    // const store = useStore(); // 该方法用于返回store 实例
    // return {
    //   store,
    // };
  },

  data() {
    return {
      contentshow: true,
      movieList: [],
      pageNum: 1,

      currentPage: 1,
      pagerCount: 0,
      pageSize: 12,
      isEmpty: true,

      content: this.$route.query.content,
    };
  },

  methods: {
    async getMovList() {
      try {
        const res = await getSearchList(
          this.pageNum,
          this.pageSize,
          this.content
        );

        console.log(res);

        if (res.list.length == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }

        this.pagerCount = res.pages;

        if (res.list.length > 0) {
          for (var i in res.list) {
            this.movieList.push(res.list[i]);
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
    this.$watch("currentPage", async (newValue, oldValue) => {
      this.currentPage = newValue;

      try {
        const res = await getSearchList(
          this.pageNum,
          this.pageSize,
          this.content
        );

        if (res.list.length == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }

        this.pagerCount = res.pages;

        this.movieList = [];

        if (res.list.length > 0) {
          for (var i in res.list) {
            this.movieList.push(res.list[i]);
          }
        } else {
          this.contentShow = false;
        }

        console.log(res);
      } catch (error) {
        console.log(error);
      }

      console.log(`message的值从"${oldValue}"变成了"${newValue}"`);
    });
    this.getMovList();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
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
</style>
