<template>
  <div>
    <img
      src="like.png"
      alt="like"
      @mouseover="changeColor"
      @mouseleave="changeColor"
      :style="{ color: color }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "black",
    };
  },
  methods: {
    changeColor() {
      this.color = this.color === "black" ? "red" : "black";
    },
  },
};
</script>
