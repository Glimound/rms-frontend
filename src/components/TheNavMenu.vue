<template>
  <div class="navigation">
    <el-menu @select="handleSelect">
      <el-menu-item index="1">
        <i class="el-icon-user"></i>
        <span slot="title">科研人员管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-reading"></i>
        <span slot="title">研究室管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-data-analysis"></i>
        <span slot="title">研究项目管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-medal"></i>
        <span slot="title">研究成果管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-office-building"></i>
        <span slot="title">办公场地管理</span>
      </el-menu-item>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-suitcase"></i>
          <span>职工管理</span>
        </template>
          <el-menu-item index="6-1">秘书管理</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-collection"></i>
          <span>第三方管理</span>
        </template>
          <el-menu-item index="7-1">委托方管理</el-menu-item>
          <el-menu-item index="7-2">合作方管理</el-menu-item>
          <el-menu-item index="7-3">质量监测方管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'TheNavMenu',
    methods: {
      handleSelect(index) {
        switch (index) {
          case '1':
            this.$router.push('/scientific-researcher')
            break
          case '2':
            this.$router.push('/research-laboratory')
            break
          case '3':
            this.$router.push('/research-project')
            break
          case '4':
            this.$router.push('/research-achievement')
            break
          case '5':
            this.$router.push('/office-space')
            break
          case '6-1':
            this.$router.push('/secretary')
            break
          case '7-1':
            this.$router.push('/client')
            break
          case '7-2':
            this.$router.push('/collaborator')
            break
          case '7-3':
            this.$router.push('/quality-monitor')
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  .navigation {
    width: 200px;
    height: 100%;

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