<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="currentPageSize"
      layout="total, prev, pager, next, sizes"
      :total="recordCounts">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'ThePagination',
    props: {
      recordCounts: {
        type: Number,
        required: true
      },
      handlePageChange: {
        type: Function,
        required: true
      },
    },
    data() {
      return {
        currentPage: 1,
        currentPageSize: 10
      }
    },
    methods: {
      handleSizeChange(val) {
        // 重新提交请求，获取数据，且页码置1
        this.currentPage = 1
        this.currentPageSize = val
        this.$store.commit('setTmpPageSize', val)
        this.handlePageChange(this.currentPage, this.currentPageSize)
      },
      handleCurrentChange(val) {
        // 重新提交请求，获取数据
        this.currentPage = val
        this.$store.commit('setTmpPage', val)
        this.handlePageChange(this.currentPage, this.currentPageSize)
      }
    }
  }
</script>

<style>
  .pagination {
    height: 50px;
    display: flex;
    align-items: center;
  }
</style>