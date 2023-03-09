<script setup>
import Menu from "./components/Menu.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><Menu></Menu></el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition> </router-view
      ></el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>

  <!-- <div class="flex items-center justify-center h-full">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div> -->
</template>

<style></style>
