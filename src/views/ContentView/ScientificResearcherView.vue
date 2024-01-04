<template>
  <div v-if="isBriefInfo" class="table-wrapper">
    <div class="table">
      <el-table
        :data="scientificResearchers"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="researcherId"
          label="科研人员工号"
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
          prop="title"
          label="职称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="researchDirection"
          label="研究方向">
        </el-table-column>
        <el-table-column
          prop="labName"
          label="所属研究室"
          width="200">
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
      <the-pagination :handlePageChange="getAllScientificResearchers" :recordCounts="recordCounts"/>
    </div>
  </div>
  <div v-else class="form-wrapper">
    <el-form :model="newScientificResearcher" label-position="left" label-width="100px" :rules="rules" ref="basicForm">
      <el-form-item label="工号" prop="researcherId">
        <el-input v-model="newScientificResearcher.researcherId" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="newScientificResearcher.name" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="newScientificResearcher.gender" :disabled="toggle==='examine'">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="newScientificResearcher.birth"
          :disabled="toggle==='examine'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="职称" prop="title">
        <el-input v-model="newScientificResearcher.title" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="研究方向" prop="researchDirection">
        <el-input type="textarea" v-model="newScientificResearcher.researchDirection" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="所属研究室" prop="labName">
        <el-select
          v-model="newScientificResearcher.labName"
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
        <el-button type="primary" plain @click="submit" :disabled="toggle==='examine'">提交</el-button>
        <el-button plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapState } from 'vuex'
  import ThePagination from '@/components/ThePagination.vue'
  import { scientificResearchersService } from '@/services/apiServices'
  import deepCopy from '@/utils/copy'
  import parseDate from '@/utils/date'

  export default {
    name: 'ScientificResearcherView',
    components: { ThePagination },
    data() {
      return {
        // isBriefInfo为true时为简略信息（表格界面），为false时为详细信息（表单界面）
        isBriefInfo: true,
        // toggle表示当前操作模式，域：examine, add, edit（查看、新增、编辑）
        toggle: 'examine',
        newScientificResearcher: {},
        loading: false,
        rules: {
          researcherId: [
            { required: true, message: '请输入科研人员工号', trigger: 'blur' }
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
          title: [
            { required: true, message: '请输入职称', trigger: 'blur' }
          ],
          researchDirection: [
            { required: true, message: '请输入研究方向', trigger: 'blur' }
          ]
        },
        error: false
      };
    },
    computed: {
      ...mapState(['scientificResearchers', 'scientificResearcher', 'recordCounts', 'tmpPage', 'tmpPageSize', 'labNameOptions'])
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
      getAllScientificResearchers(page, pageSize) {
        this.$store.dispatch('getAllScientificResearchers', {
          page,
          pageSize
        })
      },
      handleAdd() {
        // 创建具有结构的scientificResearcher对象
        this.newScientificResearcher = {
          researcherId: null,
          name: null,
          gender: null,
          birth: null,
          title: null,
          researchDirection: null,
          labName: null
        }
        this.toggle = 'add'
        // 切换为表单界面
        this.isBriefInfo = false
      },
      handleExamine({researcherId}) {
        // 从远程获取scientificResearcher对象
        this.$store.dispatch('getScientificResearcher', researcherId).then(() => {
          this.newScientificResearcher = deepCopy(this.scientificResearcher)
          this.toggle = 'examine'
          this.isBriefInfo = false
        })
      },
      handleEdit({researcherId}) {
        // 从远程获取scientificResearcher对象
        this.$store.dispatch('getScientificResearcher', researcherId).then(() => {
          this.newScientificResearcher = deepCopy(this.scientificResearcher)
          this.toggle = 'edit'
          this.isBriefInfo = false
        })
      },
      handleDelete({researcherId}) {
        // 从远程删除scientificResearcher对象
        scientificResearchersService.deleteScientificResearcher(researcherId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getAllScientificResearchers(this.tmpPage, this.tmpPageSize)
        })
      },
      submit() {
        // 字段校验逻辑
        this.error = false
        this.$refs['basicForm'].validate((valid) => {
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
          scientificResearchersService.createScientificResearcher({
            scientificResearcher: this.newScientificResearcher
          }).then(() => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            // 使用缓存的page和pageSize，刷新表格
            this.getAllScientificResearchers(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        } else if (this.toggle === 'edit'){
          scientificResearchersService.updateScientificResearcher(this.scientificResearcher.researcherId, {
            scientificResearcher: this.newScientificResearcher
          }).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getAllScientificResearchers(this.tmpPage, this.tmpPageSize)
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
      store.dispatch('getAllScientificResearchers', {
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