<template>
  <div v-if="isBriefInfo" class="table-wrapper">
    <div class="table">
      <el-table
        :data="officeSpaces"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="siteId"
          label="场地号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="spaceArea"
          label="办公面积"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="labName"
          label="所属实验室">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleExamine(scope.row)" type="text" size="medium">查看</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="medium">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="medium">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <the-pagination :handlePageChange="getAllOfficeSpaces" :recordCounts="recordCounts"/>
    </div>
  </div>
  <div v-else class="form-wrapper">
    <el-form :model="newOfficeSpace" label-position="left" label-width="100px" :rules="rules" ref="newOfficeSpace">
      <el-form-item label="场地号" prop="siteId">
        <el-input v-model="newOfficeSpace.siteId"  :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="办公面积" prop="spaceArea">
        <el-input v-model="newOfficeSpace.spaceArea" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="newOfficeSpace.address"  :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="所属研究室" prop="labName">
        <el-select
          v-model="newOfficeSpace.labName"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getLabNameOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          >
          <el-option
            v-for="item in labNameOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submit('newOfficeSpace')" :disabled="toggle==='examine'">提交</el-button>
        <el-button plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapState } from 'vuex'
  import ThePagination from '@/components/ThePagination.vue'
  import { officeSpacesService } from '@/services/apiServices'
  import deepCopy from '@/utils/copy'

  export default {
    components: { ThePagination },
    name: 'OfficeSpaceView',
    data() {
      return {
        // isBriefInfo为true时为简略信息（表格界面），为false时为详细信息（表单界面）
        isBriefInfo: true,
        // toggle表示当前操作模式，域：examine, add, edit（查看、新增、编辑）
        toggle: 'examine',
        newOfficeSpace: {},
        loading: false,
        rules: {
          siteId: [
            { required: true, message: '请输入场地号', trigger: 'blur' }
          ],
          spaceArea: [
            { required: true, message: '请输入办公面积', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ]
        },
        error: false
      };
    },
    computed: {
      ...mapState(['officeSpaces', 'officeSpace', 'recordCounts', 'tmpPage', 'tmpPageSize', 'labNameOptions'])
    },
    methods: {
      // 用于pagination组件的回调函数
      getAllOfficeSpaces(page, pageSize) {
        this.$store.dispatch('getAllOfficeSpaces', {
          page,
          pageSize
        })
      },
      handleAdd() {
        // 创建具有结构的officeSpace对象
        this.newOfficeSpace = {
          siteId: null,
          spaceArea: null,
          address: null,
          labName: null
        }
        this.toggle = 'add'
        // 切换为表单界面
        this.isBriefInfo = false
      },
      handleExamine({siteId}) {
        // 从远程获取officeSpace对象
        this.$store.dispatch('getOfficeSpace', siteId).then(() => {
          this.newOfficeSpace = deepCopy(this.officeSpace)
          this.toggle = 'examine'
          this.isBriefInfo = false
        })
      },
      handleEdit({siteId}) {
        // 从远程获取officeSpace对象
        this.$store.dispatch('getOfficeSpace', siteId).then(() => {
          this.newOfficeSpace = deepCopy(this.officeSpace)
          this.toggle = 'edit'
          this.isBriefInfo = false
        })
      },
      handleDelete({siteId}) {
        // 从远程删除officeSpace对象
        officeSpacesService.deleteOfficeSpace(siteId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getAllOfficeSpaces(this.tmpPage, this.tmpPageSize)
        })
      },
      submit(formName) {
        // 字段校验逻辑
        this.error = false
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.error = true
            return false
          }
        });
        if (this.error) {
          return
        }
        // 提交逻辑
        if (this.toggle === 'add') {
          officeSpacesService.createOfficeSpace({
            officeSpace: this.newOfficeSpace
          }).then(() => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            // 使用缓存的page和pageSize，刷新表格
            this.getAllOfficeSpaces(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        } else if (this.toggle === 'edit'){
          officeSpacesService.updateOfficeSpace(this.officeSpace.siteId, {
            officeSpace: this.newOfficeSpace
          }).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getAllOfficeSpaces(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        }
      },
      cancel() {
        this.isBriefInfo = true
      },
      getLabNameOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getLabNameOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setLabNameOptions', [])
        }
      },
    },
    beforeRouteEnter(to, from, next) {
      store.commit('setTmpPage', 1)
      store.commit('setTmpPageSize', 10)
      store.dispatch('getAllOfficeSpaces', {
        page: 1,
        pageSize: 10
      }).then(() => {
        next()
      })
    }
  }
</script>

<style lang="scss">
  .table-wrapper {
    width: 100%;
    height: 100%;
    padding-top: 50px;
  
    .table {
      width: calc(100% - 40px);
      padding: 0px 20px 0px 20px;
    }

    .pagination-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 10px;

      .el-button {
        margin-right: 20px;
      }
    }
  }

  .form-wrapper {
    width: 100%;
    height: 100%;
    padding-top: 50px;

    .el-form {
      margin-left: 50px;
      margin-top: 30px;
      width: 700px;
    }
  }
</style>