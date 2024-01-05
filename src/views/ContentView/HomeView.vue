<template>
    <div class="empty-wrapper">
      <el-empty description="暂无数据"></el-empty>
    </div>
</template>

<script>
  export default {
    name: 'HomeView'
  }
</script>

<style lang="scss">
  .empty-wrapper {
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #f7f7f7;
  }
</style>