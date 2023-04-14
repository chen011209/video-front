<template>
  <div class="flex main-body">
    <div
      style="border: 2px solid black; width: 35%"
      class="lg:bg-white lg:w-1/2 lg:p-8 lg:py-16 lg:px-12 space-y-7 marlene-rounded-l-lg shadow-sm w-max p-8 marlene-bg-glass-ex"
    >
      <div class="box">
        <el-avatar :icon="UserFilled" v-if="this.avatarPath == null" />
        <el-avatar :src="avatarPath" v-if="this.avatarPath != null" />
        <el-upload
          :http-request="uploadPicture"
          :limit="1"
          accept="image/*"
          ref="videoRef"
          v-model="uploadAvatar"
          style="display: flex; align-items: center"
        >
          <el-button slot="trigger">选择头像</el-button>
        </el-upload>
        <el-button type="primary" @click="changeAvatar()"> 确认更换 </el-button>
      </div>

      <form class="space-y-8">
        <div class="space-y-6">
          <el-form status-icon class="demo-ruleForm">
            <el-form-item>
              <div class="flex flex-row">
                <el-text class="mx-1 label" size="large">邮箱:</el-text>
                <el-text class="mx-1 label" size="large">{{
                  this.mail
                }}</el-text>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="flex flex-row">
                <el-text class="mx-1 label" size="large">姓名:</el-text>
                <input
                  type="text"
                  v-model="this.name"
                  style="border: 2px solid black"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="flex flex-row">
                <el-text class="mx-1 label" size="large">签名:</el-text>
                <input
                  type="text"
                  v-model="this.signature"
                  style="border: 2px solid black"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="flex flex-row">
                <el-text class="mx-1 label" size="large">用户创建时间:</el-text>
                <el-text class="mx-1 label" size="large">{{
                  formatDate(this.creTime)
                }}</el-text>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="flex flex-row">
                <el-text class="mx-1 label" size="large">等级:</el-text>
                <el-text class="mx-1 label" size="large">{{
                  this.level
                }}</el-text>
              </div>
            </el-form-item>
            <el-form-item>
              <div>
                <el-progress :percentage="percentage" style="width: 300px">
                  <span>{{ num }}/{{ max }}</span></el-progress
                >
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="block text-center">
          <el-button
            type="primary"
            @click="edit()"
            class="tracking-widest bg-primary min-w-full h-12 focus:bg-secondary hover:bg-secondary text-white rounded-lg text-2xl marlene-btn"
          >
            编辑信息
          </el-button>
        </div>
      </form>
    </div>
    <div class="myList" style="text-align: center">
      <p style="font-size: 24px">个人上传视频列表</p>

      <div class="container">
        <div class="row" style="margin-left: 5px">
          <div
            class="col-3"
            v-for="o in videoList"
            style="display: inline-block; margin-right: 25px"
          >
            <!-- 在这里编写每个div的内容 -->
            <div style="height: 150px; width: 150px" @click="toVideo(o)">
              <img
                :src="o.picturePath"
                class="card-image"
                style="width: 100%; height: 100%"
              />
              <div>
                <p v-text="truncatedText(o.videoTitle)"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <el-pagination
          :page-size="this.pageSize"
          :pager-count="11"
          layout="prev, pager, next"
          :total="this.pageSize * this.pagerCount"
          v-model:current-page="currentPage"
          style="position: absolute; bottom: 10px"
        />
      </div>

      <!-- 
      <div style="background-color: red; height: 85%">fs</div> -->
    </div>
  </div>
</template>

<script>
import { UserFilled } from "@element-plus/icons-vue";
import { getMyInfo, uoloadAvatar, editUser } from "../services/user";
import { uploadFile, getMyVideoList } from "../services/video.js";
export default {
  data() {
    return {
      num: 0,
      max: 0,
      percentage: 0,
      avatarPath: null,
      uploadAvatar: "",
      name: "",
      signature: "",
      mail: "",
      level: null,
      experience: null,
      creTime: null,
      UserFilled,

      pageNum: 1,

      currentPage: 1,
      pagerCount: 0,
      pageSize: 12,

      items: [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8",
      ],

      videoList: [],

      maxLength: 12,
    };
  },
  methods: {
    toVideo(o) {
      let routeData = this.$router.resolve({
        path: "/video",
        query: { videoId: o.videoId },
      });

      window.open(routeData.href, "_blank");
    },
    truncatedText(text) {
      if (text.length > this.maxLength) {
        return text.substring(0, this.maxLength) + "...";
      } else {
        return text;
      }
    },

    formatDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
    },
    async changeAvatar() {
      if (this.uploadAvatar == "") {
        this.$message({
          message: "请先选择头像",
          type: "warning",
        });
        return;
      }

      const res = await uoloadAvatar(this.uploadAvatar);

      if (res.success == true) {
        this.$message({
          message: "更换头像成功",
          type: "success",
        });
        this.avatarPath = res.data;
      }

      this.$refs.videoRef.clearFiles(); //调用clearFiles方法清空已选择的文件
      this.uploadAvatar = "";

      console.log(res);
    },
    async edit() {
      // 编辑逻辑
      try {
        const res = await editUser(this.name, this.signature);
        console.log(res);

        if (res.success == true) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }

      console.log("edit");
    },
    async uploadPicture(options) {
      const res = await uploadFile(options.file);

      console.log(res);

      if (res.success) {
        this.uploadAvatar = res.data;
      }
    },
  },
  async created() {
    this.$watch("currentPage", async (newValue, oldValue) => {
      this.currentPage = newValue;

      try {
        const res = await getMyVideoList(this.currentPage, this.pageSize);

        this.pagerCount = res.pages;

        this.videoList = [];

        if (res.list.length > 0) {
          for (var i in res.list) {
            this.videoList.push(res.list[i]);
          }
        } else {
        }

        console.log(res);
      } catch (error) {
        console.log(error);
      }

      console.log(`message的值从"${oldValue}"变成了"${newValue}"`);
    });

    try {
      const res = await getMyInfo();
      console.log(res);

      if (res.success == true) {
        this.name = res.data.userName;
        this.signature = res.data.signature;
        this.level = res.data.userLevel;
        this.experience = res.data.userLevelPoints;
        this.mail = res.data.userEmail;
        this.creTime = res.data.creTime;

        this.avatarPath = res.data.avatarPath;
        // this.avatarPath =
        //   "http://127.0.0.1:8080/video/picture?picturePath=D:/bishe/video-repository/picture/1/1679570575410.jpg";

        this.num = res.data.userLevelPoints;
        this.max = res.data.maxLevelPoints;

        this.percentage = (this.num / this.max) * 100;
        // this.registrationDate = res.data.registrationDate;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await getMyVideoList(this.pageNum, this.pageSize);

      this.pagerCount = res.pages;

      console.log(res);

      if (res.list.length > 0) {
        for (var i in res.list) {
          this.videoList.push(res.list[i]);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #ddd;
  margin-bottom: 10px;
}

.progress {
  height: 100%;
  background-color: #4caf50;
}
.main-body {
  margin: 0 auto;
}
.label {
  display: flex;
  align-items: center;
}
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px; /* 设置间隔为20像素 */
}

.myList {
  border: 2px solid black;

  width: 63%;
  margin-left: 2%;
}

.container {
  margin: 0 auto;
  padding: 0 15px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col-3 {
  flex: 0 0 calc(25% - 30px);
  max-width: calc(25% - 30px);
  padding: 0 15px;
  margin-bottom: 30px;
}

.item {
  margin-left: 50px;
  text-align: center;
  width: 180px;
}

.container {
  display: flex;
  justify-content: center;
}
</style>
