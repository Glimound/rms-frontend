<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item v-if="!isRootPath"><a :href=currentPath>{{currentTitle}}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'TheBreadcrumb',
    computed: {
      currentTitle() {
        return this.$route.meta.title
      },
      currentPath() {
        return this.$route.path
      },
      isRootPath() {
        return this.$route.path === '/'
      }
    }
  }
</script>

<style lang="scss">
  .breadcrumb {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;

    .el-breadcrumb {
      margin-left: 20px;
    }
  }
</style>