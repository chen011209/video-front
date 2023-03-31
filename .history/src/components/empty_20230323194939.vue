<template>
  <div>
    <input type="text" v-model="inputText" />
    <p>已输入的文字：{{ inputText }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: "已输入的文字",
    };
  },
};
</script>
