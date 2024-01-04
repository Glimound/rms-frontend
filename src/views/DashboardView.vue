<template>
  <div class="page">
    <the-toolbar/>
    <div class="main-container">
      <the-nav-menu/>
      <div class="content-area">
        <the-breadcrumb/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import TheToolbar from '@/components/TheToolbar'
  import TheNavMenu from '@/components/TheNavMenu'
  import TheBreadcrumb from '@/components/TheBreadcrumb'

  export default {
    name: 'DashboardView',
    components: {
      TheToolbar,
      TheNavMenu,
      TheBreadcrumb
    }
  }
</script>

<style lang="scss">
  .page {
    height: 100vh;
    box-sizing: border-box;

    .main-container {
      padding-top: 50px;
      height: calc(100% - 50px);
      width: 100%;

      .content-area {
        width: calc(100% - 200px);
        padding-left: 200px;
        overflow-y: auto;
        height: auto;
      }
    }
  }
</style>