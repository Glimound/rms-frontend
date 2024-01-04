<template>
  <div v-if="isBriefInfo" class="table-wrapper">
    <div class="table">
      <el-table
        :data="qualityMonitors"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="qualityMonitorName"
          label="质量监测方名称"
          width="400">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="superintendentId"
          label="负责人ID"
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
      <the-pagination :handlePageChange="getAllQualityMonitors" :recordCounts="recordCounts"/>
    </div>
  </div>
  <div v-else class="form-wrapper">
    <el-form :model="newQualityMonitor" label-position="left" label-width="100px" :rules="rules" ref="basicForm">
      <el-form-item label="质量监测方名称" prop="qualityMonitorName">
        <el-input v-model="newQualityMonitor.qualityMonitorName"  :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="newQualityMonitor.address" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="newQualityMonitor.superintendent" label-position="left" label-width="100px" :rules="rules" ref="superintendentForm">
      <p>负责人信息</p>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="newQualityMonitor.superintendent.name" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="办公电话" prop="officePhone">
        <el-input v-model="newQualityMonitor.superintendent.officePhone" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="移动电话" prop="mobilePhone">
        <el-input v-model="newQualityMonitor.superintendent.mobilePhone" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="newQualityMonitor.superintendent.email" :disabled="toggle==='examine'"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <p style="margin-left: 50px; margin-top: 20px; margin-bottom:0px; display: inline-block">联系人信息</p>
      <el-button
        type="primary"
        plain size="small"
        style="margin-left: 20px;"
        :disabled="toggle==='examine'"
        @click="addContact"
      >新增</el-button>
    </div>
    <el-form
      v-for="(contact, index) in newQualityMonitor.qualityMonitorContactList"
      :key=index
      :model="contact"
      label-position="left"
      label-width="100px"
      :rules="rules"
      ref="contactForm"
    >
      <div>
        <p style="display: inline-block; margin-top: 0px;">联系人{{index + 1}}</p>
        <el-button
          type="danger"
          plain size="small"
          style="margin-left: 20px;"
          :disabled="toggle==='examine'"
          @click="deleteContact(index)"
        >删除</el-button>
      </div>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="contact.name"  :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="办公电话" prop="officePhone">
        <el-input v-model="contact.officePhone"  :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="移动电话" prop="mobilePhone">
        <el-input v-model="contact.mobilePhone"  :disabled="toggle==='examine'"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="contact.email"  :disabled="toggle==='examine'"></el-input>
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
  import { qualityMonitorsService } from '@/services/apiServices'

  export default {
    components: { ThePagination },
    name: 'QualityMonitorView',
    data() {
      return {
        // isBriefInfo为true时为简略信息（表格界面），为false时为详细信息（表单界面）
        isBriefInfo: true,
        // toggle表示当前操作模式，域：examine, add, edit（查看、新增、编辑）
        toggle: 'examine',
        newQualityMonitor: {},
        loading: false,
        rules: {
          qualityMonitorName: [
            { required: true, message: '请输入质量监测方名称', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
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
          ]
        },
        error: false
      };
    },
    computed: {
      ...mapState(['qualityMonitors', 'qualityMonitor', 'recordCounts', 'tmpPage', 'tmpPageSize'])
    },
    methods: {
      // 用于pagination组件的回调函数
      getAllQualityMonitors(page, pageSize) {
        this.$store.dispatch('getAllQualityMonitors', {
          page,
          pageSize
        })
      },
      handleAdd() {
        // 创建具有结构的qualityMonitor对象
        this.newQualityMonitor = {
          qualityMonitorName: null,
          address: null,
          superintendent: {
            name: null,
            officePhone: null,
            mobilePhone: null,
            email: null
          },
          qualityMonitorContactList: [
            {
              name: null,
              officePhone: null,
              mobilePhone: null,
              email: null,
              monitorName: null
            }
          ]
        }
        this.toggle = 'add'
        // 切换为表单界面
        this.isBriefInfo = false
      },
      handleExamine({qualityMonitorName}) {
        // 从远程获取qualityMonitor对象
        this.$store.dispatch('getQualityMonitor', qualityMonitorName).then(() => {
          this.newQualityMonitor = deepCopy(this.qualityMonitor)
          this.toggle = 'examine'
          this.isBriefInfo = false
        })
      },
      handleEdit({qualityMonitorName}) {
        // 从远程获取qualityMonitor对象
        this.$store.dispatch('getQualityMonitor', qualityMonitorName).then(() => {
          this.newQualityMonitor = deepCopy(this.qualityMonitor)
          this.toggle = 'edit'
          this.isBriefInfo = false
        })
      },
      handleDelete({qualityMonitorName}) {
        // 从远程删除qualityMonitor对象
        qualityMonitorsService.deleteQualityMonitor(qualityMonitorName).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getAllQualityMonitors(this.tmpPage, this.tmpPageSize)
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
        for (let i = 0; i < this.newQualityMonitor.qualityMonitorContactList.length; i++) {
          this.$refs['contactForm'][i].validate((valid) => {
            if (!valid) {
              this.error = true
              return false
            }
          });
        }
        if (this.error) {
          return
        }
        // 联系人校验（至少存在一个联系人）
        if (this.newQualityMonitor.qualityMonitorContactList.length === 0) {
          this.$message({
            type: 'error',
            message: '请至少添加一个联系人'
          })
          return
        }

        // 为每个monitorContact对象添加qualityMonitorName属性，使其符合dto的结构
        for (let i = 0; i < this.newQualityMonitor.qualityMonitorContactList.length; i++) {
          this.newQualityMonitor.qualityMonitorContactList[i].qualityMonitorName = this.newQualityMonitor.qualityMonitorName
        }
        // 提交逻辑，根据toggle的值判断是新增还是编辑
        if (this.toggle === 'add') {
          qualityMonitorsService.createQualityMonitor(this.newQualityMonitor).then(() => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            // 使用缓存的page和pageSize，刷新表格
            this.getAllQualityMonitors(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        } else if (this.toggle === 'edit'){
          qualityMonitorsService.updateQualityMonitor(this.qualityMonitor.qualityMonitorName, this.newQualityMonitor).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getAllQualityMonitors(this.tmpPage, this.tmpPageSize)
            this.isBriefInfo = true
          })
        }
      },
      cancel() {
        this.isBriefInfo = true
      },
      addContact() {
        this.newQualityMonitor.qualityMonitorContactList.push({
          name: null,
          officePhone: null,
          mobilePhone: null,
          email: null,
          qualityMonitorName: null
        })
      },
      deleteContact(index) {
        this.newQualityMonitor.qualityMonitorContactList.splice(index, 1)
      }
    },
    beforeRouteEnter(to, from, next) {
      store.commit('setTmpPage', 1)
      store.commit('setTmpPageSize', 10)
      store.dispatch('getAllQualityMonitors', {
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