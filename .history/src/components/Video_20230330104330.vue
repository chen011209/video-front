<template>
  <div>
    <el-text class="mx-1" style="font-size: 20px">{{ title }}</el-text>
  </div>

  <div>
    <img
      src="../assets/viewNum.jpg"
      alt=""
      style="width: 20px; height: 20px; display: inline-block; width: 50%"
    />

    <img
      src="../assets/time.jpg"
      alt=""
      style="width: 20px; height: 20px; display: inline-block; width: 50%"
    />
  </div>

  <video
    controls
    autoplay
    :src="videoPath"
    style="width: 50%"
    height="50%"
  ></video>

  <div>
    <el-text class="mx-1">简介：</el-text>
    <el-text class="mx-1">{{ introduction }}</el-text>
  </div>
  <div>
    <el-text class="mx-1">播放量</el-text>
    <el-text class="mx-1">{{ viewNum }}</el-text>
  </div>

  <div>
    <el-text class="mx-1">作者</el-text>
    <el-text class="mx-1">{{ userName }}</el-text>
  </div>

  <el-button type="primary" round @click="collect()">收藏视频</el-button>

  <div class="demo-rate-block" style="background-color: aliceblue">
    <span class="demonstration">Color for different levels</span>
    <el-rate
      v-model="value2"
      :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
      show-text
      @change="handleRateChange"
    />
  </div>
  <el-card>
    <template #header>
      <el-input
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="Please input"
      />
      <div class="card-header">
        <span>评论</span>
        <el-button class="button" @click="comment()" text>发表评论</el-button>
      </div>
    </template>
    <div v-for="o in commentList" :key="o.commentId">
      <div class="flex-container">
        <div>
          <div>
            <el-avatar :icon="UserFilled" v-if="o.avatarPath == null" />
            <el-avatar :src="o.avatarPath" v-if="o.avatarPath != null" />
            <!-- <el-avatar :icon="UserFilled" /> -->
          </div>
          {{ "姓名:" + o.userName }}
          {{ "时间:" + formatDate(o.time) }}
          {{ "点赞数:" + o.likes }}
        </div>

        <div class="box">
          <p>{{ o.content }}</p>
        </div>
      </div>
    </div>
  </el-card>
  <el-pagination
    :page-size="this.pageSize"
    :pager-count="11"
    layout="prev, pager, next"
    :total="this.pageSize * this.pagerCount"
    v-model:current-page="currentPage"
  />
</template>

<script>
import {
  getVideoInfo,
  getScore,
  setScore,
  collect,
} from "../services/video.js";
import { getCommenList, addComment } from "../services/comment.js";
import { getUserInfo } from "../services/user.js";
import { ElMessage } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";
export default {
  async mounted() {},

  data() {
    return {
      textarea: "",
      UserFilled,
      commentList: [],

      videoId: this.$route.query.videoId,
      videoPath: "",
      title: "",
      introduction: "",
      viewNum: "",
      value2: null,
      userId: null,
      userName: null,

      currentPage: 1,
      pagerCount: 0,
      pageSize: 16,
    };
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
    },
    async collect() {
      try {
        const res = await collect(this.videoId);

        if (res.success == true) {
          ElMessage({
            showClose: true,
            message: "收藏成功",
            type: "success",
          });
        }

        console.log(res);
      } catch (error) {
        console.log(error);
      }

      console.log("收藏视频");
    },
    async comment() {
      console.log(this.textarea);

      if (this.textarea == "") {
        ElMessage({
          showClose: true,
          message: "评论不能为空",
          type: "error",
        });
        return;
      } else {
        try {
          const res = await addComment(this.videoId, this.textarea);
          console.log(res);

          if (res.success) {
            ElMessage({
              showClose: true,
              message: "评论成功",
              type: "success",
            });

            // 刷新评论区
            try {
              const res = await getCommenList(
                this.currentPage,
                this.pageSize,
                this.videoId
              );

              this.pagerCount = res.pages;

              this.commentList = [];

              if (res.list.length > 0) {
                for (var i in res.list) {
                  this.commentList.push(res.list[i]);
                }
              }

              console.log(res);
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async handleRateChange(value) {
      try {
        const res = await setScore(this.videoId, value);

        if (res != null) {
          ElMessage({
            showClose: true,
            message: "评分成功",
            type: "success",
          });
        } else {
          ElMessage({
            showClose: true,
            message: "评分失败",
            type: "error",
          });
        }

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    //监听分页变化
    this.$watch("currentPage", async (newValue, oldValue) => {
      this.currentPage = newValue;
      try {
        const res = await getCommenList(
          this.currentPage,
          this.pageSize,
          this.videoId
        );

        this.pagerCount = res.pages;

        this.commentList = [];

        if (res.list.length > 0) {
          for (var i in res.list) {
            this.commentList.push(res.list[i]);
          }
        }

        console.log(res);
      } catch (error) {
        console.log(error);
      }

      console.log(`message的值从"${oldValue}"变成了"${newValue}"`);
    });

    //初始化评论列表
    try {
      const res = await getCommenList(
        this.currentPage,
        this.pageSize,
        this.videoId
      );

      this.pagerCount = res.pages;

      if (res.list.length > 0) {
        for (var i in res.list) {
          this.commentList.push(res.list[i]);
        }
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await getVideoInfo(this.videoId);

      console.log(res.data);

      this.videoPath = res.data.videoPath;
      this.title = res.data.videoTitle;
      this.introduction = res.data.videoIntroduction;
      this.viewNum = res.data.viewNum;
      this.userId = res.data.userId;
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await getScore(this.videoId);

      if (res.data.score != null) {
        this.value2 = res.data.score;
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await getUserInfo(this.userId);
      this.userName = res.data.userName;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  overflow-wrap: break-word;
}
.flex-container {
  display: flex;
  flex-direction: row;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
