<template>
  <div style="display: flex">
    <div class="video">
      <div>
        <el-text class="mx-1" style="font-size: 20px">{{ title }}</el-text>
      </div>

      <div>
        <img
          src="../assets/viewNum.jpg"
          alt=""
          style="
            width: 20px;
            height: 20px;
            display: inline-block;
            padding-bottom: 3px;
          "
        />
        <el-text class="mx-1">{{ viewNum }}</el-text>

        <img
          src="../assets/time.jpg"
          alt=""
          style="
            width: 20px;
            height: 20px;
            display: inline-block;
            margin-left: 50px;
            padding-bottom: 3px;
          "
        />

        <el-text class="mx-1">{{ formatDate(releaseTime) }}</el-text>
      </div>

      <video
        controls
        autoplay
        :src="videoPath"
        style="width: 95%"
        height="95%"
      ></video>

      <div class="demo-rate-block" style="display: inline-block">
        <span class="demonstration">评分：</span>
        <el-rate v-model="value2" @change="handleRateChange" />
      </div>

      <el-button
        style="margin-left: 60%"
        type="primary"
        round
        @click="collect()"
        >收藏视频</el-button
      >
    </div>

    <div class="right-container">
      <div class="user">
        <div>
          <el-avatar :icon="UserFilled" v-if="this.avatarPath == null" />
          <el-avatar :src="avatarPath" v-if="this.avatarPath != null" />

          <div v-if="this.avatarPath == null" style="display: inline-block">
            <el-text class="mx-1">{{ userName }}</el-text>

            <el-text class="mx-1 label" size="large">等级:</el-text>
            <el-text class="mx-1 label" size="large">{{ userLevel }}</el-text>
          </div>

          <div
            v-if="this.avatarPath != null"
            style="display: inline-block; position: relative; top: -10px"
          >
            <el-text class="mx-1">{{ userName }}</el-text>

            <el-text class="mx-1 label" size="large">等级:</el-text>
            <el-text class="mx-1 label" size="large">{{ userLevel }}</el-text>
          </div>

          <div>
            <el-text class="mx-1 label" size="large">签名:</el-text>
            <el-text class="mx-1 label" size="large">{{ signature }}</el-text>
          </div>
        </div>
      </div>
      <div class="recommend" style="display: flex; flex-direction: column">
        <div class="recommend-item" v-for="o in recommendList">
          <img
            :src="o.picturePath"
            alt=""
            style="display: inline-block; width: 140px; height: 120px"
          />
          <el-text class="mx-1" style="display: inline-block">{{
            o.videoTitle
          }}</el-text>
        </div>
      </div>
    </div>
  </div>

  <div class="videoInfo">
    <div>
      <el-text class="mx-1">简介：</el-text>
      <el-text class="mx-1">{{ introduction }}</el-text>
    </div>
  </div>

  <div class="comment">
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
  </div>
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
import { getRecommendList } from "../services/video.js";
import { ElMessage } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";
export default {
  async mounted() {},

  data() {
    return {
      textarea: "",
      UserFilled,
      commentList: [],
      recommendList: [],

      videoId: this.$route.query.videoId,
      videoPath: "",
      title: "",
      introduction: "",
      viewNum: "",
      value2: null,
      userId: null,
      userName: null,
      releaseTime: null,

      avatarPath: null,
      signature: null,
      userLevel: null,
      userLevelPoints: null,
      currentPage: 1,
      pagerCount: 0,
      pageSize: 16,

      num: 0,
      max: 0,
      percentage: 0,
    };
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
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
      this.releaseTime = res.data.releaseTime;
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
      this.avatarPath = res.data.avatarPath;
      this.signature = res.data.signature;
      this.userLevel = res.data.userLevel;
      this.userLevelPoints = res.data.userLevelPoints;

      this.num = res.data.userLevelPoints;
      this.max = res.data.maxLevelPoints;

      this.percentage = (this.num / this.max) * 100;

      console.log(res);
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await getRecommendList();

      for (var i = 0; i < 4; i++) {
        this.recommendList.push(res.data[i]);
      }

      // if (res.data.length > 0) {
      //   for (var i = 5; i < 17; i++) {
      //     this.movieList.push(res.data[i]);
      //   }
      // } else {
      //   this.contentShow = false;
      // }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.right-container {
  width: 30%;
}
.recommend {
  background-color: red;
  height: 80%;
}
.video {
  width: 70%;
}
.user {
  width: 100%;
}
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
