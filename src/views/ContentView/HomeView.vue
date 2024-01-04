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
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7;
  }
</style>