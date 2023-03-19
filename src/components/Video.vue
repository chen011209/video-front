<template>
  <div>
    <el-text class="mx-1" style="font-size: 20px">{{ title }}</el-text>
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

  <div class="demo-rate-block" style="background-color: aliceblue">
    <span class="demonstration">Color for different levels</span>
    <el-rate
      v-model="value2"
      :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
      show-text
      @change="handleRateChange"
    />
  </div>
</template>

<script>
import { getVideoInfo } from "../services/video.js";
import { ElMessage } from "element-plus";

export default {
  async mounted() {
    try {
      const res = await getVideoInfo(this.videoId);

      console.log(res.data);

      this.videoPath = res.data.videoPath;
      this.title = res.data.videoTitle;
      this.introduction = res.data.videoIntroduction;
      this.viewNum = res.data.viewNum;
    } catch (error) {
      console.log(error);
    }

    try {
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      videoId: this.$route.query.videoId,
      videoPath: "",
      title: "",
      introduction: "",
      viewNum: "",
      value2: null,
    };
  },
  methods: {
    handleRateChange(value) {
      console.log(`The rating has been changed to ${value}`);
    },
  },
};
</script>

<style></style>
