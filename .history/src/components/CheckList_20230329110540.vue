<template>
  <div class="home-card" v-show="contentshow">
    <el-row alignment="flex-start">
      <el-col
        v-for="o in movieList"
        :key="o.checkVideoId"
        :xs="8"
        :sm="4"
        :md="4"
        style="padding: 9px"
      >
        <!-- :to="'/movdetail/' + o.checkVideoId" -->
        <!-- :to="{ path: '/checkvideo', query: { id: 113 } }" -->

        <router-link
          :to="{
            path: '/checkvideo',
            query: { checkVideoId: o.checkVideoId },
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
                  :content="o.checkVideoTitle"
                  placement="bottom-end"
                  :show-after="1000"
                >
                  {{ o.checkVideoTitle }}
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
</template>

<script>
import { getCheckVideoList } from "../services/video";

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
      len: 16,
    };
  },

  methods: {
    selectMovie(h) {
      console.log(h);
    },

    async getMovList() {
      try {
        const res = await getCheckVideoList(this.len);

        console.log(res);

        if (res.data.length > 0) {
          for (var i in res.data) {
            this.movieList.push(res.data[i]);
          }
        } else {
          this.contentShow = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getMovList();
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
</style>
