<template>
  <div v-if="isBriefInfo" class="table-wrapper">
    <div class="table">
      <el-table
        :data="researchAchievements"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="achievementName"
          label="科研成果名称">
        </el-table-column>
        <el-table-column
          prop="acquisitionDate"
          label="取得时间"
          width="200">
        </el-table-column>
        <el-table-column
          label="成果类型"
          width="200">
          <template slot-scope="scope">
            <div>{{achievementTypeFilter(scope.row.achievementType)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="专利类型"
          width="200">
          <template slot-scope="scope">
            <div>{{patentTypeFilter(scope.row.patentType)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="projectId"
          label="归属项目ID"
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
      <the-pagination :handlePageChange="getAllResearchAchievements" :recordCounts="recordCounts"/>
    </div>
  </div>
  <div v-else class="form-wrapper">

    <!-- 基本信息模块 -->
    <el-form :model="newResearchAchievement" label-position="left" label-width="100px" :rules="rules" ref="basicForm">
      <el-form-item label="成果名称" prop="achievementName">
        <el-input v-model="newResearchAchievement.achievementName"  :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="取得时间" prop="acquisitionDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="newResearchAchievement.acquisitionDate"
          :disabled="toggle==='examine'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="成果类型" prop="achievementType">
        <el-radio-group v-model="newResearchAchievement.achievementType" :disabled="toggle==='examine'" @input="clearPatent">
          <el-radio :label="1">专利</el-radio>
          <el-radio :label="2">论文</el-radio>
          <el-radio :label="3">软件著作权</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专利类型" prop="patentType">
        <el-radio-group
          v-model="newResearchAchievement.patentType"
          :disabled="toggle==='examine' || newResearchAchievement.achievementType !== 1"
        >
          <el-radio :label="1">发明专利</el-radio>
          <el-radio :label="2">实用新型专利</el-radio>
          <el-radio :label="3">外观专利</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <!-- 归属项目模块 -->
    <el-form :model="newResearchAchievement" label-position="left" label-width="100px" :rules="rules" ref="projectForm">
      <p>归属项目信息</p>
      <el-form-item label="归属项目ID" prop="projectId">
        <el-select
          v-model="newResearchAchievement.projectId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getProjectOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="setCurrentProject"
          >
          <el-option
            v-for="item in projectOptions"
            :key="item.projectId"
            :label="item.projectId"
            :value="item.projectId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属项目名称" prop="projectName">
        <el-input v-model="newResearchAchievement.projectName" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <p style="margin-left: 50px; margin-top: 20px; margin-bottom:0px; display: inline-block">项目贡献人信息</p>
      <el-button
        type="primary"
        plain size="small"
        style="margin-left: 20px;"
        :disabled="toggle==='examine'"
        @click="addContributor"
      >新增</el-button>
    </div>

    <!-- 贡献人模块 -->
    <el-form
      v-for="(contributor, index) in newResearchAchievement.contributors"
      :key=index
      :model="contributor"
      label-position="left"
      label-width="100px"
      :rules="rules"
      ref="contributorsForm"
    >
      <div>
        <p style="display: inline-block; margin-top: 0px;">贡献人{{index + 1}}</p>
        <el-button
          type="danger"
          plain size="small"
          style="margin-left: 20px;"
          :disabled="toggle==='examine'"
          @click="deleteContributor(index)"
        >删除</el-button>
      </div>
      <el-form-item label="科研人员ID" prop="researcherId">
        <el-select
          v-model="contributor.researcherId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getOwnResearcherOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="(value) => setCurrentResearcher(value, index)"
          >
          <el-option
            v-for="item in ownResearcherOptions"
            :key="item.researcherId"
            :label="item.researcherId"
            :value="item.researcherId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="contributor.name"  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="贡献排名" prop="rank">
        <el-input v-model="contributor.rank"  :disabled="toggle==='examine'"></el-input>
      </el-form-item>
    </el-form>
    <el-form label-width="100px">
      <el-form-item>
        <el-button type="primary" plain @click="submit()" :disabled="toggle==='examine'">提交</el-button>
        <el-button plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapState } from 'vuex'
  import ThePagination from '@/components/ThePagination.vue'
  import deepCopy from '@/utils/copy'
  import { researchAchievementsService } from '@/services/apiServices'

  export default {
    components: { ThePagination },
    name: 'ResearchAchievementView',
    data() {
      return {
        // isBriefInfo为true时为简略信息（表格界面），为false时为详细信息（表单界面）
        isBriefInfo: true,
        // toggle表示当前操作模式，域：examine, add, edit（查看、新增、编辑）
        toggle: 'examine',
        newResearchAchievement: {},
        loading: false,
        rules: {
          achievementName: [
            { required: true, message: '请输入成果名称', trigger: 'blur' }
          ],
          acquisitionDate: [
            { required: true, message: '请输入获得时间', trigger: 'blur' }
          ],
          projectId: [
            { required: true, message: '请选择归属项目ID', trigger: 'blur' }
          ],
          researcherId: [
            { required: true, message: '请选择科研人员ID', trigger: 'blur' }
          ],
          rank: [
            { required: true, message: '请输入贡献排名', trigger: 'blur' }
          ],
          achievementType: [
            { required: true, message: '请选择成果类型', trigger: 'blur' }
          ],
        },
        error: false
      };
    },
    computed: {
      ...mapState([
        'researchAchievements',
        'researchAchievement',
        'recordCounts',
        'tmpPage',
        'tmpPageSize',
        'projectOptions',
        'ownResearcherOptions'
      ])
    },
    methods: {
      achievementTypeFilter(value) {
        if (value === 1) {
          return '专利'
        } else if (value === 2) {
          return '论文'
        } else if (value === 3) {
          return '软件著作权'
        }
      },
      patentTypeFilter(value) {
        if (!value) {
          return null
        } else if (value === 1) {
          return '发明专利'
        } else if (value === 2) {
          return '实用新型专利'
        } else if (value === 3) {
          return '外观专利'
        }
      },
      getProjectOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getProjectOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setProjectOptions', [])
        }
      },
      getOwnResearcherOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getOwnResearcherOptions', {
              str: query,
              projectId: this.newResearchAchievement.projectId
            }).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setOwnResearcherOptions', [])
        }
      },
      // 用于el-select的change事件，根据选中的projectId设置projectName的值
      setCurrentProject(value) {
        this.newResearchAchievement.projectName = this.projectOptions.find(item => item.projectId === value).projectName
      },
      setCurrentResearcher(value, index) {
        this.newResearchAchievement.contributors[index].name = this.ownResearcherOptions.find(item => 
          item.researcherId === value).name
      },
      // 若成果类型不为专利，则清空专利类型的值
      clearPatent(value) {
        if (value !== 1) {
          this.newResearchAchievement.patentType = null
        }
      },
      // 用于pagination组件的回调函数
      getAllResearchAchievements(page, pageSize) {
        this.$store.dispatch('getAllResearchAchievements', {
          page,
          pageSize
        })
      },
      handleAdd() {
        // 创建具有结构的researchAchievement对象
        this.newResearchAchievement = {
          achievementId: null,
          achievementName: null,
          acquisitionDate: null,
          achievementType: null,
          patentType: null,
          projectId: null,
          projectName: null,
          contributors: [
            {
              rank: null,
              researcherId: null,
              name: null
            }
          ]
        }
        this.toggle = 'add'
        // 切换为表单界面
        this.isBriefInfo = false
      },
      handleExamine({achievementId}) {
        // 从远程获取researchAchievement对象
        this.$store.dispatch('getResearchAchievement', achievementId).then(() => {
          this.newResearchAchievement = deepCopy(this.researchAchievement)
          this.toggle = 'examine'
          this.isBriefInfo = false
        })
      },
      handleEdit({achievementId}) {
        // 从远程获取researchAchievement对象
        this.$store.dispatch('getResearchAchievement', achievementId).then(() => {
          this.newResearchAchievement = deepCopy(this.researchAchievement)
          this.toggle = 'edit'
          this.isBriefInfo = false
        })
      },
      handleDelete({achievementId}) {
        // 从远程删除researchAchievement对象
        researchAchievementsService.deleteResearchAchievement(achievementId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getAllResearchAchievements(this.tmpPage, this.tmpPageSize)
        })
      },
      submit() {
        // 字段校验逻辑
        // 表单校验
        this.error = false
        this.$refs['basicForm'].validate((valid) => {
          if (!valid) {
            this.error = true
            return false
          }
        });
        this.$refs['projectForm'].validate((valid) => {
          if (!valid) {
            this.error = true
            return false
          }
        });
        for (let i = 0; i < this.newResearchAchievement.contributors.length; i++) {
          this.$refs['contributorsForm'][i].validate((valid) => {
            if (!valid) {
              this.error = true
              return false
            }
          });
        }
        if (this.error) {
          return
        }
        // 贡献人校验：至少存在一个贡献人
        if (this.newResearchAchievement.contributors.length === 0) {
          this.$message({
            type: 'error',
            message: '请至少添加一个贡献人'
          })
          return
        }
        // 贡献人校验：多个贡献人的ID、排名不能相同
        for (let i = 0; i < this.newResearchAchievement.contributors.length; i++) {
          for (let j = i + 1; j < this.newResearchAchievement.contributors.length; j++) {
            if (this.newResearchAchievement.contributors[i].researcherId === this.newResearchAchievement.contributors[j].researcherId) {
              this.$message({
                type: 'error',
                message: '贡献人ID不能相同'
              })
              return
            }
            if (this.newResearchAchievement.contributors[i].rank === this.newResearchAchievement.contributors[j].rank) {
              this.$message({
                type: 'error',
                message: '贡献人排名不能相同'
              })
              return
            }
          }
        }

        // 修改提交对象，使其符合dto的结构
        delete this.newResearchAchievement.achievementId
        delete this.newResearchAchievement.projectName
        for (let i = 0; i < this.newResearchAchievement.contributors.length; i++) {
          delete this.newResearchAchievement.contributors[i].name
        }

        // 提交逻辑，根据toggle的值判断是新增还是编辑
        if (this.toggle === 'add') {
          researchAchievementsService.createResearchAchievement(this.newResearchAchievement).then(() => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            // 使用缓存的page和pageSize，刷新表格
            this.getAllResearchAchievements(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        } else if (this.toggle === 'edit'){
          researchAchievementsService.updateResearchAchievement(this.researchAchievement.achievementId, this.newResearchAchievement).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getAllResearchAchievements(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        }
      },
      cancel() {
        this.isBriefInfo = true
      },
      addContributor() {
        this.newResearchAchievement.contributors.push({
          name: null,
          rank: null,
          researcherId: null
        })
      },
      deleteContributor(index) {
        this.newResearchAchievement.contributors.splice(index, 1)
      }
    },
    beforeRouteEnter(to, from, next) {
      store.commit('setTmpPage', 1)
      store.commit('setTmpPageSize', 10)
      store.dispatch('getAllResearchAchievements', {
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

    p {
      color: #606266;
      font-size: 16px;
      font-weight: bold;
      margin-top: 30px;
      margin-bottom: 20px;
    }
  }
</style>