<template>
  <div class="toolbar">
    <p>科研管理系统</p>
  </div>
</template>

<script>
  export default {
    name: 'TheToolbar'
  }
</script>

<style lang="scss">
  .toolbar {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    z-index: 2;
    position: relative;

    p {
      font-family: 'Arial', sans-serif;
      font-size: 22px;
      letter-spacing: 2px;
      color: #666666;
      font-weight: bold;
    }
  }
</style>