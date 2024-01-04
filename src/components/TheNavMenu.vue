<template>
  <div class="navigation">
    <el-menu :default-active="currentRoute" :router="true">
      <el-menu-item index="/">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/scientific-researcher">
        <i class="el-icon-user"></i>
        <span slot="title">科研人员管理</span>
      </el-menu-item>
      <el-menu-item index="/research-laboratory">
        <i class="el-icon-reading"></i>
        <span slot="title">研究室管理</span>
      </el-menu-item>
      <el-menu-item index="/research-project">
        <i class="el-icon-data-analysis"></i>
        <span slot="title">研究项目管理</span>
      </el-menu-item>
      <el-menu-item index="/research-achievement">
        <i class="el-icon-medal"></i>
        <span slot="title">研究成果管理</span>
      </el-menu-item>
      <el-menu-item index="/office-space">
        <i class="el-icon-office-building"></i>
        <span slot="title">办公场地管理</span>
      </el-menu-item>
      <el-submenu index="worker">
        <template slot="title">
          <i class="el-icon-suitcase"></i>
          <span>职工管理</span>
        </template>
          <el-menu-item index="/secretary">秘书管理</el-menu-item>
      </el-submenu>
      <el-submenu index="thirdParty">
        <template slot="title">
          <i class="el-icon-collection"></i>
          <span>第三方管理</span>
        </template>
          <el-menu-item index="/client">委托方管理</el-menu-item>
          <el-menu-item index="/collaborator">合作方管理</el-menu-item>
          <el-menu-item index="/quality-monitor">质量监测方管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'TheNavMenu',
    computed: {
      currentRoute() {
        return this.$route.path
      }
    }
  }
</script>

<style lang="scss">
  .navigation {
    width: 200px;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 50px;

    .el-menu {
      height: 100%;
    }

    .el-menu-item {
      i {
        margin-right: 10px;
      }
    }

    .el-submenu {
      i {
        margin-right: 10px;
      }

      .el-menu-item {
        margin-left: 10px;
      }
    }
  }
  
</style>