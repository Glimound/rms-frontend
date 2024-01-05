<template>
  <div v-if="isBriefInfo" class="table-wrapper">
    <div class="table">
      <el-table
        :data="researchProjects"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="projectId"
          label="项目号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="projectContent"
          label="项目内容">
        </el-table-column>
        <el-table-column
          prop="funding"
          label="预算"
          width="100">
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="开始日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="completeDate"
          label="结束日期"
          width="150">
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
      <the-pagination :handlePageChange="getAllResearchLaboratories" :recordCounts="recordCounts"/>
    </div>
  </div>
  <div v-else class="form-wrapper">

    <!-- 基本信息模块 -->
    <el-form :model="newResearchProject" label-position="left" label-width="100px" :rules="rules" ref="basicForm">
      <el-form-item label="项目号" prop="projectId">
        <el-input v-model="newResearchProject.projectId" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="newResearchProject.projectName" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="项目内容" prop="projectContent">
        <el-input v-model="newResearchProject.projectContent" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="预算" prop="funding">
        <el-input v-model="newResearchProject.funding" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="startDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="newResearchProject.startDate"
          :disabled="toggle==='examine'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="completeDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="newResearchProject.completeDate"
          :disabled="toggle==='examine'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <!-- 负责人模块 -->
    <el-form :model="newResearchProject.superintendent" label-position="left" label-width="100px" :rules="rules" ref="superintendentForm">
      <p>负责人信息</p>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="newResearchProject.superintendent.name" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="办公电话" prop="officePhone">
        <el-input v-model="newResearchProject.superintendent.officePhone" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="移动电话" prop="mobilePhone">
        <el-input v-model="newResearchProject.superintendent.mobilePhone" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="newResearchProject.superintendent.email" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
    </el-form>

    <!-- 委托方模块 -->
    <el-form :model="newResearchProject.client" label-position="left" label-width="100px" :rules="rules" ref="clientForm">
      <p>委托方信息</p>
      <el-form-item label="委托方名称" prop="clientName">
        <el-select
          v-model="newResearchProject.client.clientName"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getClientOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="setCurrentClient"
        >
          <el-option
            v-for="item in clientOptions"
            :key="item.clientName"
            :label="item.clientName"
            :value="item.clientName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="newResearchProject.client.address" :disabled="true"></el-input>
      </el-form-item>
    </el-form>

    <!-- 质量监测方模块 -->
    <el-form :model="newResearchProject.qualityMonitor" label-position="left" label-width="100px" :rules="rules" ref="qualityMonitorForm">
      <p>质量监测方信息</p>
      <el-form-item label="质量监测方名称" prop="qualityMonitorName">
        <el-select
          v-model="newResearchProject.qualityMonitor.qualityMonitorName"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getQualityMonitorOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="setCurrentQualityMonitor"
        >
          <el-option
            v-for="item in qualityMonitorOptions"
            :key="item.qualityMonitorName"
            :label="item.qualityMonitorName"
            :value="item.qualityMonitorName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="newResearchProject.qualityMonitor.address" :disabled="true"></el-input>
      </el-form-item>
    </el-form>

    <!-- 合作方模块 -->
    <div>
      <p style="margin-left: 50px; margin-top: 20px; margin-bottom:0px; display: inline-block">合作方信息</p>
      <el-button
        type="primary"
        plain size="small"
        style="margin-left: 20px;"
        :disabled="toggle==='examine'"
        @click="addCollaborator"
      >新增</el-button>
    </div>
    <el-form
      v-for="(collaborator, index) in newResearchProject.collaboratorList"
      :key=index
      :model="collaborator"
      label-position="left"
      label-width="100px"
      :rules="rules"
      ref="collaboratorsForm"
    >
      <div>
        <p style="display: inline-block; margin-top: 0px;">合作方{{index + 1}}</p>
        <el-button
          type="danger"
          plain size="small"
          style="margin-left: 20px;"
          :disabled="toggle==='examine'"
          @click="deleteCollaborator(index)"
        >删除</el-button>
      </div>
      <el-form-item label="合作方名称" prop="collaboratorName">
        <el-select
          v-model="collaborator.collaboratorName"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getCollaboratorOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="(value) => setCurrentCollaborator(value, index)"
          >
          <el-option
            v-for="item in collaboratorOptions"
            :key="item.collaboratorName"
            :label="item.collaboratorName"
            :value="item.collaboratorName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="collaborator.address" :disabled="true"></el-input>
      </el-form-item>
    </el-form>

    <!-- 科研人员模块 -->
    <div>
      <p style="margin-left: 50px; margin-top: 20px; margin-bottom:0px; display: inline-block">科研人员信息</p>
      <el-button
        type="primary"
        plain size="small"
        style="margin-left: 20px;"
        :disabled="toggle==='examine'"
        @click="addScientificResearcher"
      >新增</el-button>
    </div>
    <el-form
      v-for="(scientificResearcher, index) in newResearchProject.researcherList"
      :key=index
      :model="scientificResearcher"
      label-position="left"
      label-width="100px"
      :rules="rules"
      ref="scientificResearchersForm"
    >
      <div>
        <p style="display: inline-block; margin-top: 0px;">科研人员{{index + 1}}</p>
        <el-button
          type="danger"
          plain size="small"
          style="margin-left: 20px;"
          :disabled="toggle==='examine'"
          @click="deleteScientificResearcher(index)"
        >删除</el-button>
      </div>
      <el-form-item label="工号" prop="researcherId">
        <el-select
          v-model="scientificResearcher.researcherId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getResearcherOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="(value) => setCurrentResearcher(value, index)"
          >
          <el-option
            v-for="item in researcherOptions"
            :key="item.researcherId"
            :label="item.researcherId"
            :value="item.researcherId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="researcherName">
        <el-input v-model="scientificResearcher.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="scientificResearcher.gender" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="title">
        <el-input v-model="scientificResearcher.title" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="研究方向" prop="researcherResearchDirection">
        <el-input v-model="scientificResearcher.researchDirection" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="参加时间" prop="joinDate">
        <el-input v-model="scientificResearcher.joinDate" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="工作时长" prop="workHour">
        <el-input v-model="scientificResearcher.workHour" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="可支配预算" prop="availableFunding">
        <el-input v-model="scientificResearcher.availableFunding" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
    </el-form>

    <!-- 子课题模块 -->
    <div>
      <p style="margin-left: 50px; margin-top: 20px; margin-bottom:0px; display: inline-block">子课题信息</p>
      <el-button
        type="primary"
        plain size="small"
        style="margin-left: 20px;"
        :disabled="toggle==='examine'"
        @click="addSubtopic"
      >新增</el-button>
    </div>
    <el-form
      v-for="(subtopic, index) in newResearchProject.subtopicList"
      :key=index
      :model="subtopic"
      label-position="left"
      label-width="100px"
      :rules="rules"
      ref="subtopicsForm"
    >
      <div>
        <p style="display: inline-block; margin-top: 0px;">子课题{{index + 1}}</p>
        <el-button
          type="danger"
          plain size="small"
          style="margin-left: 20px;"
          :disabled="toggle==='examine'"
          @click="deleteSubtopic(index)"
        >删除</el-button>
      </div>
      <el-form-item label="子课题序号" prop="subtopicNum">
        <el-input v-model="subtopic.subtopicNum" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="子课题内容" prop="subtopicContent">
        <el-input v-model="subtopic.subtopicContent" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="可用预算" prop="availableFunding">
        <el-input v-model="subtopic.availableFunding" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="完成期限" prop="completeDeadlineDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="subtopic.completeDeadlineDate"
          :disabled="toggle==='examine'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="负责人姓名" prop="subtopicName">
        <el-input v-model="subtopic.superintendent.name" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="负责人办公电话" prop="subtopicOfficePhone">
        <el-input v-model="subtopic.superintendent.officePhone" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="负责人移动电话" prop="subtopicMobilePhone">
        <el-input v-model="subtopic.superintendent.mobilePhone" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="负责人邮箱" prop="subtopicEmail">
        <el-input v-model="subtopic.superintendent.email" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="参与科研人员" prop="joinedResearcherIdList">
        <el-select
          v-model="subtopic.joinedResearcherIdList"
          filterable
          remote
          multiple
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="getSubtopicResearcherOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="(value) => setCurrentSubtopicResearcher(value, index)"
          >
          <el-option
            v-for="item in subtopicResearcherOptions"
            :key="item.researcherId"
            :label="item.researcherId"
            :value="item.researcherId"
          >
          </el-option>
        </el-select>
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
  import { researchProjectsService } from '@/services/apiServices'

  export default {
    components: { ThePagination },
    name: 'ResearchProjectView',
    data() {
      return {
        // isBriefInfo为true时为简略信息（表格界面），为false时为详细信息（表单界面）
        isBriefInfo: true,
        // toggle表示当前操作模式，域：examine, add, edit（查看、新增、编辑）
        toggle: 'examine',
        newResearchProject: {},
        loading: false,
        subtopicResearcherList: [],
        rules: {
          projectId: [
            { required: true, message: '请输入项目号', trigger: 'blur' }
          ],
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          projectContent: [
            { required: true, message: '请输入项目内容', trigger: 'blur' }
          ],
          funding: [
            { required: true, message: '请输入预算', trigger: 'blur' }
          ],
          startDate: [
            { required: true, message: '请输入开始日期', trigger: 'blur' }
          ],
          clientName: [
            { required: true, message: '请选择委托方', trigger: 'blur' }
          ],
          qualityMonitorName: [
            { required: true, message: '请选择质量监测方', trigger: 'blur' }
          ],
          collaboratorName: [
            { required: true, message: '请选择合作方', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          officePhone: [
            { required: true, message: '请输入办公电话', trigger: 'blur' }
          ],
          mobilePhone: [
            { required: true, message: '请输入移动电话', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          workHour: [
            { required: true, message: '请输入工作时长', trigger: 'blur' }
          ],
          availableFunding: [
            { required: true, message: '请输入可支配预算', trigger: 'blur' }
          ],
          researcherId: [
            { required: true, message: '请选择工号', trigger: 'blur' }
          ],
          subtopicNum: [
            { required: true, message: '请输入子课题序号', trigger: 'blur' }
          ],
          subtopicContent: [
            { required: true, message: '请输入子课题内容', trigger: 'blur' }
          ],
          completeDeadlineDate: [
            { required: true, message: '请输入完成期限', trigger: 'blur' }
          ],
        },
        error: false
      };
    },
    computed: {
      ...mapState([
        'researchProjects',
        'researchProject',
        'recordCounts',
        'tmpPage',
        'tmpPageSize',
        'clientOptions',
        'qualityMonitorOptions',
        'collaboratorOptions',
        'researcherOptions',
        'subtopicResearcherOptions'
      ])
    },
    methods: {
      // 各选择器的远程搜索方法
      getClientOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getClientOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setClientOptions', [])
        }
      },
      getQualityMonitorOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getQualityMonitorOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setQualityMonitorOptions', [])
        }
      },
      getCollaboratorOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getCollaboratorOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setCollaboratorOptions', [])
        }
      },
      getResearcherOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getResearcherOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setResearcherOptions', [])
        }
      },
      getSubtopicResearcherOptions(query) {
        if (query !== '') {
          this.loading = true
          // 只从本地拿取，防止新增时添加不上
          setTimeout(() => {
            let researcherOptions = []
            for (let i = 0; i < this.newResearchProject.researcherList.length; i++) {
              if (this.newResearchProject.researcherList[i].researcherId == null) {
                continue
              }
              if (this.newResearchProject.researcherList[i].researcherId.includes(query)) {
                researcherOptions.push(this.newResearchProject.researcherList[i])
              }
            }
            this.$store.commit('setSubtopicResearcherOptions', researcherOptions)
            this.loading = false
          }, 200)
        } else {
          this.$store.commit('setSubtopicResearcherOptions', [])
        }
      },

      // 用于el-select的change事件，设置当前的值
      setCurrentClient(value) {
        for (let i = 0; i < this.clientOptions.length; i++) {
          if (this.clientOptions[i].clientName === value) {
            this.newResearchProject.client = this.clientOptions[i]
            break
          }
        }
      },
      setCurrentQualityMonitor(value) {
        for (let i = 0; i < this.qualityMonitorOptions.length; i++) {
          if (this.qualityMonitorOptions[i].qualityMonitorName === value) {
            this.newResearchProject.qualityMonitor = this.qualityMonitorOptions[i]
            break
          }
        }
      },
      setCurrentCollaborator(value, index) {
        for (let i = 0; i < this.collaboratorOptions.length; i++) {
          if (this.collaboratorOptions[i].collaboratorName === value) {
            this.newResearchProject.collaboratorList[index] = this.collaboratorOptions[i]
            break
          }
        }
      },
      setCurrentSubtopicResearcher(value, index) {
        for (let i = 0; i < this.subtopicResearcherOptions.length; i++) {
          if (this.subtopicResearcherOptions[i].researcherId === value) {
            this.newResearchProject.subtopicList[index].joinedResearcherIdList.push(this.subtopicResearcherOptions[i])
            break
          }
        }
      },
      setCurrentResearcher(value, index) {
        for (let i = 0; i < this.researcherOptions.length; i++) {
          if (this.researcherOptions[i].researcherId === value) {
            this.newResearchProject.researcherList[index] = this.researcherOptions[i]
            break
          }
        }
      },

      // 用于pagination组件的回调函数
      getAllResearchLaboratories(page, pageSize) {
        this.$store.dispatch('getAllResearchLaboratories', {
          page,
          pageSize
        })
      },
      handleAdd() {
        // 创建具有结构的researchProject对象
        this.newResearchProject = {
          projectId: null,
          projectName: null,
          projectContent: null,
          funding: null,
          startDate: null,
          completeDate: null,
          superintendent: {
            superintendentId: null,
            name: null,
            officePhone: null,
            mobilePhone: null,
            email: null
          },
          client: {
            clientName: null,
            address: null,
            superintendentId: null
          },
          qualityMonitor: {
            qualityMonitorName: null,
            address: null,
            superintendentId: null
          },
          collaboratorList: [
            {
              collaboratorName: null,
              address: null,
              superintendentId: null
            }
          ],
          researcherList: [
            {
              researcherId: null,
              name: null,
              title: null,
              labName: null,
              joinDate: null,
              workHour: null,
              availableFunding: null
            }
          ],
          subtopicList: [
            {
              subtopicNum: null,
              subtopicContent: null,
              availableFunding: null,
              completeDeadlineDate: null,
              technicalIndicator: null,
              superintendent: {
                superintendentId: null,
                name: null,
                officePhone: null,
                mobilePhone: null,
                email: null
              },
              joinedResearcherIdList: []
            }
          ]
        }
        this.toggle = 'add'
        // 切换为表单界面
        this.isBriefInfo = false
      },
      handleExamine({projectId}) {
        // 从远程获取researchProject对象
        this.$store.dispatch('getResearchProject', projectId).then(() => {
          this.newResearchProject = deepCopy(this.researchProject)
          this.toggle = 'examine'
          this.isBriefInfo = false
        })
      },
      handleEdit({projectId}) {
        // 从远程获取researchProject对象
        this.$store.dispatch('getResearchProject', projectId).then(() => {
          this.newResearchProject = deepCopy(this.researchProject)
          this.toggle = 'edit'
          this.isBriefInfo = false
        })
      },
      handleDelete({projectId}) {
        // 从远程删除researchProject对象
        researchProjectsService.deleteResearchProject(projectId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getAllResearchLaboratories(this.tmpPage, this.tmpPageSize)
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
        this.$refs['superintendentForm'].validate((valid) => {
          if (!valid) {
            this.error = true
            return false
          }
        });
        this.$refs['clientForm'].validate((valid) => {
          if (!valid) {
            this.error = true
            return false
          }
        });
        this.$refs['qualityMonitorForm'].validate((valid) => {
          if (!valid) {
            this.error = true
            return false
          }
        });
        for (let i = 0; i < this.newResearchProject.collaboratorList.length; i++) {
          this.$refs['collaboratorsForm'][i].validate((valid) => {
            if (!valid) {
              this.error = true
              return false
            }
          });
        }
        for (let i = 0; i < this.newResearchProject.subtopicList.length; i++) {
          this.$refs['subtopicsForm'][i].validate((valid) => {
            if (!valid) {
              this.error = true
              return false
            }
          });
        }
        for (let i = 0; i < this.newResearchProject.researcherList.length; i++) {
          this.$refs['scientificResearchersForm'][i].validate((valid) => {
            if (!valid) {
              this.error = true
              return false
            }
          });
        }
        if (this.error) {
          return
        }

        // 修改提交对象，使其符合dto的结构
        delete this.newResearchProject.superintendent.superintendentId
        this.newResearchProject.clientName = this.newResearchProject.client.clientName

        delete this.newResearchProject.client
        this.newResearchProject.qualityMonitorName = this.newResearchProject.qualityMonitor.qualityMonitorName

        delete this.newResearchProject.qualityMonitor
        this.newResearchProject.collaboratorNameList = []

        for (let i = 0; i < this.newResearchProject.collaboratorList.length; i++) {
          this.newResearchProject.collaboratorNameList.push(this.newResearchProject.collaboratorList[i].collaboratorName)
        }
        delete this.newResearchProject.collaboratorList

        for (let i = 0; i < this.newResearchProject.researcherList.length; i++) {
          delete this.newResearchProject.researcherList[i].name
          delete this.newResearchProject.researcherList[i].title
          delete this.newResearchProject.researcherList[i].labName
        }

        for (let i = 0; i < this.newResearchProject.subtopicList.length; i++) {
          delete this.newResearchProject.subtopicList[i].superintendent.superintendentId
        }

        if (this.newResearchProject.subtopicList.length === 0) {
          this.newResearchProject.subtopicList = null
        }

        // 提交逻辑，根据toggle的值判断是新增还是编辑
        if (this.toggle === 'add') {
          researchProjectsService.createResearchProject(this.newResearchProject).then(() => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            // 使用缓存的page和pageSize，刷新表格
            this.getAllResearchLaboratories(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        } else if (this.toggle === 'edit'){
          researchProjectsService.updateResearchProject(this.researchProject.projectId, this.newResearchProject).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getAllResearchLaboratories(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        }
      },
      cancel() {
        this.isBriefInfo = true
      },
      addCollaborator() {
        this.newResearchProject.collaboratorList.push({
          collaboratorName: null,
          address: null,
          superintendentId: null
        })
      },
      deleteCollaborator(index) {
        this.newResearchProject.collaboratorList.splice(index, 1)
      },
      addScientificResearcher() {
        this.newResearchProject.researcherList.push({
          researcherId: null,
          name: null,
          title: null,
          labName: null,
          joinDate: null,
          workHour: null,
          availableFunding: null
        })
      },
      deleteScientificResearcher(index) {
        this.newResearchProject.researcherList.splice(index, 1)
      },
      addSubtopic() {
        this.newResearchProject.subtopicList.push({
          subtopicNum: null,
          subtopicContent: null,
          availableFunding: null,
          completeDeadlineDate: null,
          technicalIndicator: null,
          superintendent: {
            superintendentId: null,
            name: null,
            officePhone: null,
            mobilePhone: null,
            email: null
          },
          joinedResearcherIdList: []
        })
      },
      deleteSubtopic(index) {
        this.newResearchProject.subtopicList.splice(index, 1)
      }
    },
    beforeRouteEnter(to, from, next) {
      store.commit('setTmpPage', 1)
      store.commit('setTmpPageSize', 10)
      store.dispatch('getAllResearchProjects', {
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