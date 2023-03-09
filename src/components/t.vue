<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    onInput(e) {
      $cookies.config("1m");
      this.text = e.target.value;
    },
  },
};
</script>

<template>
  <h1>Make me dynamic!</h1>
</template>
