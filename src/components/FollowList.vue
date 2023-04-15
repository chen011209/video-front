<template>
  <div class="max-container">
    <div style="width: 80%">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div style="text-align: center">
              <span>关注列表</span>
            </div>
          </div>
        </template>
        <div
          v-for="o in userList"
          :key="o"
          class="text item"
          style="width: 550px; margin-bottom: 20px"
        >
          <el-avatar
            :icon="UserFilled"
            v-if="o.avatarPath == null"
            @click="userInfoPage(o.userId)"
          />
          <el-avatar
            :src="o.avatarPath"
            v-if="o.avatarPath != null"
            @click="userInfoPage(o.userId)"
          />

          <div style="display: inline-block" v-if="o.avatarPath == null">
            <el-text class="mx-1 label" size="large"
              >姓名:{{ o.userName }}</el-text
            >
            <el-text class="mx-1 label" size="large"
              >等级:{{ o.userLevel }}</el-text
            >
            <el-text class="mx-1 label" size="large"
              >签名:{{ o.signature }}</el-text
            >
          </div>

          <div style="display: inline-block" v-if="o.avatarPath != null">
            <el-text
              class="mx-1 label"
              size="large"
              style="bottom: 10px; position: relative"
              >姓名:{{ o.userName }}</el-text
            >
            <el-text
              class="mx-1 label"
              size="large"
              style="bottom: 10px; position: relative"
              >签名:{{ o.signature }}</el-text
            >
            <el-text
              class="mx-1 label"
              size="large"
              style="bottom: 10px; position: relative"
              >签名:{{ o.signature }}</el-text
            >
          </div>
        </div>
      </el-card>
      <div class="container">
        <el-pagination
          :page-size="this.pageSize"
          :pager-count="11"
          layout="prev, pager, next"
          :total="this.pageSize * this.pagerCount"
          v-model:current-page="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getFollowList } from "../services/user.js";
import { UserFilled } from "@element-plus/icons-vue";
import router from "../router/router.js";
export default {
  data() {
    return {
      userList: [],
      pageNum: 1,

      currentPage: 1,
      pagerCount: 0,
      pageSize: 6,

      UserFilled,
    };
  },
  methods: {
    userInfoPage(userId) {
      location.reload();
      location.href = "http://localhost:3000/userInfo?userId=" + userId;
      //   router.push({
      //     path: "/userInfo",
      //     query: { userId: userId },
      //   });
    },
  },

  async created() {
    this.$watch("currentPage", async (newValue, oldValue) => {
      this.currentPage = newValue;

      try {
        const res = await getFollowList(this.currentPage, this.pageSize);

        this.pagerCount = res.pages;

        this.userList = [];

        if (res.list.length > 0) {
          for (var i in res.list) {
            this.userList.push(res.list[i]);
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

    try {
      const res = await getFollowList(this.pageNum, this.pageSize);

      console.log(res);

      this.pagerCount = res.pages;

      if (res.list.length > 0) {
        for (var i in res.list) {
          this.userList.push(res.list[i]);
        }
      } else {
        this.contentShow = false;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin-bottom: 0%;
}
.max-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
