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
      display: flex;
      height: calc(100% - 50px);
      position: relative;
      z-index: 1;

      .content-area {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>