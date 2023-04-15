<template>
  <el-menu
    :default-active="activeIndex"
    background-color="white"
    text-color="black"
    active-text-color="#24b8f2"
    :router="true"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="true"
    @select="handleSelect"
  >
    <el-menu-item index="/home" style="font-size: larger; color: #409eff"
      >首页</el-menu-item
    >
    <el-menu-item index="/popularList">热门视频</el-menu-item>

    <el-menu-item index="/upload">上传</el-menu-item>

    <el-menu-item index="/follow">关注</el-menu-item>

    <el-menu-item index="/collect">收藏</el-menu-item>

    <el-menu-item index="/history">历史</el-menu-item>

    <el-menu-item v-if="isShow" index="/checklist">审核</el-menu-item>

    <div class="menu-input" style="width: 350px">
      <el-input
        v-model="search"
        placeholder="Search"
        style="margin-left: 20%; width: 60%; margin-top: 5%"
        @keyup.enter="onSearch"
      />

      <el-button
        style="display: inline-block; margin-top: 5%"
        @click="onSearch()"
        >搜索</el-button
      >
    </div>

    <!-- <el-menu-item index="/movtype/5">社区</el-menu-item> -->

    <el-menu-item
      index="/login"
      @click="click"
      style="position: absolute; right: 0px"
      >登出</el-menu-item
    >

    <el-menu-item index="/login" style="position: absolute; right: 50px"
      >登录</el-menu-item
    >
    <el-menu-item index="/register" style="position: absolute; right: 100px"
      >注册</el-menu-item
    >

    <el-menu-item index="/user" style="position: absolute; right: 150px"
      >个人主页</el-menu-item
    >
  </el-menu>
</template>

<script>
import { defineComponent } from "vue";
import { logOut } from "../services/user.js";
import { getSearchList } from "../services/video.js";
import router from "../router/router.js";
export default defineComponent({
  name: "ComponentWithIf",
  data() {
    return {
      search: "",
      pageNum: 0,
      pageSize: 12,
    };
  },
  methods: {
    async onSearch() {
      if (this.search == "") {
        this.$message({
          message: "请输入搜索内容",
          type: "warning",
        });
        return;
      }
      location.reload();
      location.href = "http://localhost:3000/search?content=" + this.search;
      router.push({ path: "/search", query: { content: this.search } });

      // this.search = "";
    },
  },
  setup() {
    //如果为管理员显示审核页面
    const isShow = localStorage.getItem("userType") == 0 ? true : false;

    async function click() {
      const res = await logOut();

      console.log(res);
      localStorage.clear();

      location.reload();
      location.href = "http://localhost:3000/login";
    }
    return {
      isShow,
      click,
    };
  },
});
</script>

<style scoped>
/* 取消过渡效果 */

.el-menu-item.is-active {
  background-color: white !important;
  border-bottom: 0 !important;
}

.el-menu-item:focus {
  background-color: white !important;
}

.el-menu-item:hover {
  background-color: white !important;
  color: #24b8f2 !important;
}
.el-menu {
  border: none !important;
  height: 100%;
  position: relative;
}
</style>
