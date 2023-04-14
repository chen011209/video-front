<template>
  <div class="parent">
    <div class="child"></div>
  </div>
</template>

<style>
.parent {
  position: relative;
  height: 200px;
  margin: 0 auto;
}

.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 100px;
  width: 100px;
  background-color: blue;
}
</style>
