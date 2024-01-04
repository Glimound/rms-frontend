<template>
  <div v-if="isBriefInfo" class="table-wrapper">
    <div class="table">
      <el-table
        :data="secretaries"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="secretaryId"
          label="工号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          label="性别"
          width="100">
          <template slot-scope="scope">
            <div>{{genderFilter(scope.row.gender)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="年龄"
          width="100">
          <template slot-scope="scope">
            <div>{{ageFilter(scope.row.birth)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="employDate"
          label="任职日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="remit"
          label="职责">
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
      <the-pagination :handlePageChange="getAllSecretaries" :recordCounts="recordCounts"/>
    </div>
  </div>
  <div v-else class="form-wrapper">
    <el-form :model="newSecretary" label-position="left" label-width="100px" :rules="rules" ref="basicForm">
      <el-form-item label="工号" prop="secretaryId">
        <el-input v-model="newSecretary.secretaryId" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="newSecretary.name" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="newSecretary.gender" :disabled="toggle==='examine'">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="newSecretary.birth"
          :disabled="toggle==='examine'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="任职日期" prop="employDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="newSecretary.employDate"
          :disabled="toggle==='examine'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="职责" prop="remit">
        <el-input type="textarea" v-model="newSecretary.remit" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="所属研究室" prop="labNameList">
        <el-select
          v-model="newLabNameList"
          filterable
          remote
          multiple
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="getLabNameWithNoSecretaryOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          >
          <el-option
            v-for="item in labNameWithNoSecretaryOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submit()" :disabled="toggle==='examine'">提交</el-button>
        <el-button plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import parseDate from '@/utils/date'
  import store from '@/store'
  import { mapState } from 'vuex'
  import ThePagination from '@/components/ThePagination.vue'
  import { secretariesService } from '@/services/apiServices'
  import deepCopy from '@/utils/copy'

  export default {
    name: 'SecretaryView',
    components: { ThePagination },
    data() {
      return {
        // isBriefInfo为true时为简略信息（表格界面），为false时为详细信息（表单界面）
        isBriefInfo: true,
        // toggle表示当前操作模式，域：examine, add, edit（查看、新增、编辑）
        toggle: 'examine',
        newSecretary: {},
        newLabNameList: [],
        loading: false,
        rules: {
          secretaryId: [
            { required: true, message: '请输入秘书工号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          birth: [
            { required: true, message: '请选择出生日期', trigger: 'blur' }
          ],
          employDate: [
            { required: true, message: '请选择任职日期', trigger: 'blur' }
          ],
          remit: [
            { required: true, message: '请输入职责', trigger: 'blur' }
          ]
        },
        error: false
      };
    },
    computed: {
      ...mapState(['secretaries', 'secretary', 'recordCounts', 'tmpPage', 'tmpPageSize', 'labNameWithNoSecretaryOptions'])
    },
    methods: {
      genderFilter(value) {
        if (value === 1) {
          return '男'
        } else if (value === 2) {
          return '女'
        }
      },
      ageFilter(value) {
        return parseDate(value)
      },
      // 用于pagination组件的回调函数
      getAllSecretaries(page, pageSize) {
        this.$store.dispatch('getAllSecretaries', {
          page,
          pageSize
        })
      },
      handleAdd() {
        // 创建具有结构的secretary对象
        this.newSecretary = {
          secretaryId: null,
          name: null,
          gender: null,
          birth: null,
          employDate: null,
          remit: null
        },
        this.newLabNameList = []
        this.toggle = 'add'
        // 切换为表单界面
        this.isBriefInfo = false
      },
      handleExamine({secretaryId}) {
        // 从远程获取secretary对象
        this.$store.dispatch('getSecretary', secretaryId).then(() => {
          this.newSecretary = deepCopy(this.secretary)
          delete this.newSecretary.labNameList
          this.newlabNameList = deepCopy(this.secretary.labNameList)
          this.toggle = 'examine'
          this.isBriefInfo = false
        })
      },
      handleEdit({secretaryId}) {
        // 从远程获取secretary对象
        this.$store.dispatch('getSecretary', secretaryId).then(() => {
          this.newSecretary = deepCopy(this.secretary)
          delete this.newSecretary.labNameList
          this.newlabNameList = deepCopy(this.secretary.labNameList)
          this.toggle = 'edit'
          this.isBriefInfo = false
        })
      },
      handleDelete({secretaryId}) {
        // 从远程删除secretary对象
        secretariesService.deleteSecretary(secretaryId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getAllSecretaries(this.tmpPage, this.tmpPageSize)
        })
      },
      submit() {
        // 字段校验逻辑
        this.error = false
        this.$refs["basicForm"].validate((valid) => {
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
          secretariesService.createSecretary({
            secretary: this.newSecretary,
            labNameList: this.newLabNameList
          }).then(() => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            // 使用缓存的page和pageSize，刷新表格
            this.getAllSecretaries(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        } else if (this.toggle === 'edit') {
          secretariesService.updateSecretary(this.secretary.secretaryId, {
            secretary: this.newSecretary,
            labNameList: this.newLabNameList
          }).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getAllSecretaries(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        }
      },
      cancel() {
        this.isBriefInfo = true
      },
      getLabNameWithNoSecretaryOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getLabNameWithNoSecretaryOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setLabNameWithNoSecretaryOptions', [])
        }
      },
    },
    beforeRouteEnter(to, from, next) {
      store.commit('setTmpPage', 1)
      store.commit('setTmpPageSize', 10)
      store.dispatch('getAllSecretaries', {
        page: 1,
        pageSize: 10
      }).then(() => {
        next()
      })
    },
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