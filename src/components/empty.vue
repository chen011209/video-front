<template>
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

<script lang="ts" setup>
import { ref } from "vue";
const value2 = ref(null);

const handleRateChange = (value: number) => {
  console.log(`The rating has been changed to ${value}`);
};
</script>

<style scoped></style>
