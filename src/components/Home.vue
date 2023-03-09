<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>成功登录</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>
import Menu from "./Menu.vue";

const a = "20px";
</script>

<style>
.box {
  width: v-bind(a);
  height: 100px;
  background-color: #d22525;
}
</style>
