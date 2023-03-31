<template>
  <video
    controls
    autoplay
    :src="videoPath"
    style="width: 50%"
    height="50%"
  ></video>

  <el-text class="mx-1" style="font-size: 20px">视频标题：{{ title }}</el-text>
  <div>
    <el-text class="mx-1">简介：</el-text>
    <el-text class="mx-1">{{ introduction }}</el-text>
  </div>

  <div style="display: flex; gap: 20px">
    <el-input
      v-model="reason"
      placeholder="输入审核不通过原因"
      clearable
      :rows="2"
      type="textarea"
      style="width: 40%"
    />

    <div style="display: flex; flex-flow: column">
      <el-button type="success" @click="pass" plain>审核通过</el-button>
      <el-button type="success" @click="pass" plain>审核通过</el-button>
      <el-button type="danger" @click="fail" plain>审核不通过</el-button>
    </div>
  </div>

  <!-- <el-button type="danger" @click="next" plain>查看下个视频</el-button> -->
</template>

<script>
import { checkVideo, getCheckVideoInfo } from "../services/video.js";
import { ElMessage } from "element-plus";
import { getCheckVideoList } from "../services/video";
export default {
  async mounted() {
    try {
      const res = await getCheckVideoInfo(this.videoId);

      console.log(res.data);

      this.videoPath = res.data.videoPath;
      this.title = res.data.checkVideoTitle;
      this.introduction = res.data.checkVideoIntroduction;
    } catch (error) {
      console.log(error);
    }

    console.log();
  },

  data() {
    return {
      videoId: this.$route.query.checkVideoId,
      videoPath: "",
      reason: "",
      len: 1,
      title: "",
      introduction: "",
    };
  },
  methods: {
    async pass() {
      try {
        const res = await checkVideo(this.videoId, 1, this.reason);

        if (res.success == true) {
          ElMessage({
            showClose: true,
            message: "审核通过成功",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fail() {
      try {
        const res = await checkVideo(this.videoId, 2, this.reason);

        if (res.success == true) {
          ElMessage({
            showClose: true,
            message: "审核不通过成功",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async next() {
      try {
        const res = await getCheckVideoList(this.len);
        console.log(res);
        console.log(res.data);

        this.$router.push({
          path: "/checkVideo",
          query: {
            checkVideoId: res.data[0].checkVideoId,
            videoPath: res.data[0].videoPath,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
