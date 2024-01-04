<template>
  <div v-if="isBriefInfo" class="table-wrapper">
    <div class="table">
      <el-table
        :data="researchLaboratories"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="labName"
          label="研究室名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="researchDirection"
          label="研究方向">
        </el-table-column>
        <el-table-column
          prop="secretaryId"
          label="任职秘书工号"
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
    <el-form :model="newResearchLaboratory" label-position="left" label-width="100px" :rules="rules" ref="basicForm">
      <el-form-item label="研究室名称" prop="labName">
        <el-input v-model="newResearchLaboratory.labName" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="研究方向" prop="researchDirection">
        <el-input v-model="newResearchLaboratory.researchDirection" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
    </el-form>

    <!-- 秘书模块 -->
    <el-form :model="newResearchLaboratory.secretary" label-position="left" label-width="100px" :rules="rules" ref="secretaryForm">
      <p>任职秘书信息</p>
      <el-form-item label="秘书工号" prop="secretaryId">
        <el-select
          v-model="newResearchLaboratory.secretary.secretaryId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getSecretaryOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="setCurrentSecretary"
          >
          <el-option
            v-for="item in secretaryOptions"
            :key="item.secretaryId"
            :label="item.secretaryId"
            :value="item.secretaryId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="newResearchLaboratory.secretary.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="newResearchLaboratory.secretary.gender" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="职责" prop="remit">
        <el-input v-model="newResearchLaboratory.secretary.remit" :disabled="true"></el-input>
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
      v-for="(scientificResearcher, index) in newResearchLaboratory.scientificResearcherList"
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
          :remote-method="getFreeResearcherOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="(value) => setCurrentResearcher(value, index)"
          >
          <el-option
            v-for="item in freeResearcherOptions"
            :key="item.researcherId"
            :label="item.researcherId"
            :value="item.researcherId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
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
    </el-form>

    <!-- 主任模块 -->
    <el-form :model="newResearchLaboratory.director" label-position="left" label-width="100px" :rules="rules" ref="directorForm">
      <p>主任信息</p>
      <el-form-item label="工号" prop="directorId">
        <el-select
          v-model="newResearchLaboratory.director.researcherId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getOwnResearcherOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="setCurrentDirector"
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
      <el-form-item label="上任时间" prop="appointmentDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="newResearchLaboratory.director.appointmentDate"
          :disabled="toggle==='examine'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="任期" prop="termDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="newResearchLaboratory.director.termDate"
          :disabled="toggle==='examine'"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <!-- 办公场地模块 -->
    <div>
      <p style="margin-left: 50px; margin-top: 20px; margin-bottom:0px; display: inline-block">办公场地信息</p>
      <el-button
        type="primary"
        plain size="small"
        style="margin-left: 20px;"
        :disabled="toggle==='examine'"
        @click="addOfficeSpace"
      >新增</el-button>
    </div>
    <el-form
      v-for="(officeSpace, index) in newResearchLaboratory.officeSpaceList"
      :key=index
      :model="officeSpace"
      label-position="left"
      label-width="100px"
      :rules="rules"
      ref="officeSpacesForm"
    >
      <div>
        <p style="display: inline-block; margin-top: 0px;">办公场地{{index + 1}}</p>
        <el-button
          type="danger"
          plain size="small"
          style="margin-left: 20px;"
          :disabled="toggle==='examine'"
          @click="deleteOfficeSpace(index)"
        >删除</el-button>
      </div>
      <el-form-item label="场地号" prop="siteId">
        <el-select
          v-model="officeSpace.siteId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="getOfficeSpaceOptions"
          :loading="loading"
          style="width: 600px;"
          :disabled="toggle==='examine'"
          @change="(value) => setCurrentOfficeSpace(value, index)"
          >
          <el-option
            v-for="item in officeSpaceOptions"
            :key="item.siteId"
            :label="item.siteId"
            :value="item.siteId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办公面积" prop="spaceArea">
        <el-input v-model="officeSpace.spaceArea" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="officeSpace.address" :disabled="true"></el-input>
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
  import { researchLaboratoriesService } from '@/services/apiServices'

  export default {
    components: { ThePagination },
    name: 'ResearchLaboratoryView',
    data() {
      return {
        // isBriefInfo为true时为简略信息（表格界面），为false时为详细信息（表单界面）
        isBriefInfo: true,
        // toggle表示当前操作模式，域：examine, add, edit（查看、新增、编辑）
        toggle: 'examine',
        newResearchLaboratory: {},
        loading: false,
        rules: {
          labName: [
            { required: true, message: '请输入研究室名称', trigger: 'blur' }
          ],
          researchDirection: [
            { required: true, message: '请输入研究方向', trigger: 'blur' }
          ],
          secretaryId: [
            { required: true, message: '请选择秘书ID', trigger: 'blur' }
          ],
          appointmentDate: [
            { required: true, message: '请输入上任时间', trigger: 'blur' }
          ],
          termDate: [
            { required: true, message: '请输入任期', trigger: 'blur' }
          ],
          siteId: [
            { required: true, message: '请输入场地号', trigger: 'blur' }
          ],
          researcherId: [
            { required: true, message: '请选择科研人员ID', trigger: 'blur' }
          ]
        },
        error: false
      };
    },
    computed: {
      ...mapState([
        'researchLaboratories',
        'researchLaboratory',
        'recordCounts',
        'tmpPage',
        'tmpPageSize',
        'secretaryOptions',
        'ownResearcherOptions',
        'officeSpaceOptions',
        'freeResearcherOptions'
      ])
    },
    methods: {
      // 各选择器的远程搜索方法
      getSecretaryOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getSecretaryOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setSecretaryOptions', [])
        }
      },
      getOwnResearcherOptions(query) {
        if (query !== '') {
          this.loading = true
          // setTimeout(() => {
          //   this.$store.dispatch('getLabOwnResearcherOptions', {
          //     str: query,
          //     labName: this.newResearchLaboratory.labName
          //   }).then(() => {
          //     this.loading = false
          //   })
          // }, 200)

          // 只从本地拿取，防止新增时添加不上
          setTimeout(() => {
            let researcherOptions = []
            for (let i = 0; i < this.newResearchLaboratory.scientificResearcherList.length; i++) {
              if (this.newResearchLaboratory.scientificResearcherList[i].researcherId == null) {
                continue
              }
              if (this.newResearchLaboratory.scientificResearcherList[i].researcherId.includes(query)) {
                researcherOptions.push(this.newResearchLaboratory.scientificResearcherList[i])
              }
            }
            this.$store.commit('setOwnResearcherOptions', researcherOptions)
            this.loading = false
          }, 200)
        } else {
          this.$store.commit('setOwnResearcherOptions', [])
        }
      },
      getOfficeSpaceOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getOfficeSpaceOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setOfficeSpaceOptions', [])
        }
      },
      getFreeResearcherOptions(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.$store.dispatch('getFreeResearcherOptions', query).then(() => {
              this.loading = false
            })
          }, 200)
        } else {
          this.$store.commit('setFreeResearcherOptions', [])
        }
      },

      // 用于el-select的change事件，设置当前的值
      setCurrentSecretary(value) {
        for (let i = 0; i < this.secretaryOptions.length; i++) {
          if (this.secretaryOptions[i].secretaryId === value) {
            this.newResearchLaboratory.secretary = this.secretaryOptions[i]
            break
          }
        }
      },
      setCurrentDirector(value) {
        this.newResearchLaboratory.director.researcherId = value
      },
      setCurrentOfficeSpace(value, index) {
        for (let i = 0; i < this.officeSpaceOptions.length; i++) {
          if (this.officeSpaceOptions[i].siteId === value) {
            this.newResearchLaboratory.officeSpaceList[index] = this.officeSpaceOptions[i]
            break
          }
        }
      },
      setCurrentResearcher(value, index) {
        for (let i = 0; i < this.freeResearcherOptions.length; i++) {
          if (this.freeResearcherOptions[i].researcherId === value) {
            this.newResearchLaboratory.scientificResearcherList[index] = this.freeResearcherOptions[i]
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
        // 创建具有结构的researchLaboratory对象
        this.newResearchLaboratory = {
          labName: null,
          researchDirection: null,
          secretary: {
            secretaryId: null,
            name: null,
            gender: null,
            birth: null,
            employDate: null,
            remit: null
          },
          director: {
            labName: null,
            researcherId: null,
            appointmentDate: null,
            termDate: null
          },
          officeSpaceList: [
            {
              siteId: null,
              spaceArea: null,
              address: null,
              labName: null
            }
          ],
          scientificResearcherList: [
            {
              researcherId: null,
              name: null,
              gender: null,
              birth: null,
              title: null,
              researchDirection: null,
              labName: null
            }
          ]
        }
        this.toggle = 'add'
        // 切换为表单界面
        this.isBriefInfo = false
      },
      handleExamine({labName}) {
        // 从远程获取researchLaboratory对象
        this.$store.dispatch('getResearchLaboratory', labName).then(() => {
          this.newResearchLaboratory = deepCopy(this.researchLaboratory)
          this.toggle = 'examine'
          this.isBriefInfo = false
          // 为空的属性为其补齐结构
          if (this.newResearchLaboratory.director === null) {
            this.newResearchLaboratory.director = {
              labName: null,
              researcherId: null,
              appointmentDate: null,
              termDate: null
            }
          }
        })
      },
      handleEdit({labName}) {
        // 从远程获取researchLaboratory对象
        this.$store.dispatch('getResearchLaboratory', labName).then(() => {
          this.newResearchLaboratory = deepCopy(this.researchLaboratory)
          this.toggle = 'edit'
          this.isBriefInfo = false
          // 为空的属性为其补齐结构
          if (this.newResearchLaboratory.director === null) {
            this.newResearchLaboratory.director = {
              labName: null,
              researcherId: null,
              appointmentDate: null,
              termDate: null
            }
          }
        })
      },
      handleDelete({labName}) {
        // 从远程删除researchLaboratory对象
        researchLaboratoriesService.deleteResearchLaboratory(labName).then(() => {
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
        this.$refs['secretaryForm'].validate((valid) => {
          if (!valid) {
            this.error = true
            return false
          }
        });
        this.$refs['directorForm'].validate((valid) => {
          if (!valid) {
            this.error = true
            return false
          }
        });
        for (let i = 0; i < this.newResearchLaboratory.officeSpaceList.length; i++) {
          this.$refs['officeSpacesForm'][i].validate((valid) => {
            if (!valid) {
              this.error = true
              return false
            }
          });
        }
        for (let i = 0; i < this.newResearchLaboratory.scientificResearcherList.length; i++) {
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

        // 办公场地校验（至少存在一个办公场地）
        if (this.newResearchLaboratory.officeSpaceList.length === 0) {
          this.$message({
            type: 'error',
            message: '请至少添加一个办公场地'
          })
          return
        }

        // 修改提交对象，使其符合dto的结构
        this.newResearchLaboratory.researchLaboratory = {}
        this.newResearchLaboratory.researchLaboratory.labName = this.newResearchLaboratory.labName
        this.newResearchLaboratory.researchLaboratory.researchDirection = this.newResearchLaboratory.researchDirection
        delete this.newResearchLaboratory.labName
        delete this.newResearchLaboratory.researchDirection

        this.newResearchLaboratory.researchLaboratory.secretaryId = this.newResearchLaboratory.secretary.secretaryId 
        delete this.newResearchLaboratory.secretary

        this.siteIdList = []
        for (let i = 0; i < this.newResearchLaboratory.officeSpaceList.length; i++) {
          this.siteIdList.push(this.newResearchLaboratory.officeSpaceList[i].siteId)
        }
        this.newResearchLaboratory.siteIdList = this.siteIdList
        delete this.newResearchLaboratory.officeSpaceList

        this.researcherIdList = []
        for (let i = 0; i < this.newResearchLaboratory.scientificResearcherList.length; i++) {
          this.researcherIdList.push(this.newResearchLaboratory.scientificResearcherList[i].researcherId)
        }
        this.newResearchLaboratory.researcherIdList = this.researcherIdList
        delete this.newResearchLaboratory.scientificResearcherList

        if (this.newResearchLaboratory.director.researcherId === null) {
          this.newResearchLaboratory.director = null
        } else {
          this.newResearchLaboratory.director.labName = this.newResearchLaboratory.researchLaboratory.labName
        }

        // 提交逻辑，根据toggle的值判断是新增还是编辑
        if (this.toggle === 'add') {
          researchLaboratoriesService.createResearchLaboratory(this.newResearchLaboratory).then(() => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            // 使用缓存的page和pageSize，刷新表格
            this.getAllResearchLaboratories(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        } else if (this.toggle === 'edit'){
          researchLaboratoriesService.updateResearchLaboratory(this.researchLaboratory.labName, this.newResearchLaboratory).then(() => {
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
      addOfficeSpace() {
        this.newResearchLaboratory.officeSpaceList.push({
          siteId: null,
          spaceArea: null,
          address: null,
          labName: null
        })
      },
      deleteOfficeSpace(index) {
        this.newResearchLaboratory.officeSpaceList.splice(index, 1)
      },
      addScientificResearcher() {
        this.newResearchLaboratory.scientificResearcherList.push({
          researcherId: null,
          name: null,
          gender: null,
          birth: null,
          title: null,
          researchDirection: null,
          labName: null
        })
      },
      deleteScientificResearcher(index) {
        this.newResearchLaboratory.scientificResearcherList.splice(index, 1)
      }
    },
    beforeRouteEnter(to, from, next) {
      store.commit('setTmpPage', 1)
      store.commit('setTmpPageSize', 10)
      store.dispatch('getAllResearchLaboratories', {
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