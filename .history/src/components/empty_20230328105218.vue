<template>
  <div class="container">
    <div class="item" v-for="item in items" :key="item.id">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Item 1",
        },
        {
          id: 2,
          name: "Item 2",
        },
        {
          id: 3,
          name: "Item 3",
        },
        {
          id: 4,
          name: "Item 4",
        },
        {
          id: 5,
          name: "Item 5",
        },
      ],
    };
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: calc(33.33% - 10px);
  margin-bottom: 10px;
  background-color: #ccc;
  padding: 10px;
  box-sizing: border-box;
}
</style>
