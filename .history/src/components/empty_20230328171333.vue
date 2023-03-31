<template>
  <el-pagination
    align="center"
    style="margin: 8px"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="all"
  >
  </el-pagination>
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
  font-size: 0; /* 移除空格间距 */
}

.item {
  display: inline-block;
  width: 50%;
  font-size: 16px; /* 还原字体大小 */
  box-sizing: border-box; /* 避免宽度超出容器 */
  border: 1px solid #ccc; /* 调试用，可省略 */
}
</style>
