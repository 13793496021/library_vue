<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" icon="el-icon-unlock" @click="dialogEditVisible = true">修改密码</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="flag"
        label="权限">
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改个人密码"
      :visible.sync="dialogEditVisible"
      width="600px"
      :before-close="handleEditClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

        <el-form-item label="原密码" prop="password" style="width: 380px;">
          <el-input type="password" v-model="editForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password" style="width: 380px;">
          <el-input type="password" v-model="editForm.new_password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePassword('editForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    return {
      dialogEditVisible: false,
      tableData: [],
      editForm: {
        username: '',
        password: '',
        new_password: '',
      },
      editFormRules: {
        password: [{required: true, message: '请输入旧密码', trigger: 'blur'},
          { min: 0, max: 18, message: '长度不能超过18位', trigger: 'blur' }],
        new_password: [{required: true, message: '请输入新密码', trigger: 'blur'},
          { min: 0, max: 18, message: '长度不能超过18位', trigger: 'blur' }],
      }

    }
  },
  methods: {
    updatePassword() {
      this.$http.post('/userCenter/confirm',{
        password: this.editForm.password
      }).then(res => {
        if(res.data.code !== 0) {
          this.$message.error(res.data.msg)
        } else {
          this.editForm.username = res.data.data
          this.$http.post('/userCenter/update',{
            username: this.editForm.username,
            password: this.editForm.new_password
          }).then(response => {
            if(response.data.code !== 0) {
              this.$message.error(response.data.msg)
            } else {
              this.$message.success(response.data.msg)
              this.$http.post('/logout').then(re => {
                localStorage.clear()
                sessionStorage.clear()
                this.$router.replace({path: '/login'})
              })
            }
          })
        }
      })
    },
    getInformation() {
      this.$http.post('/userCenter').then(res => {
        this.tableData = res.data.data
        //this.$message.info(res.data.msg)
      })
    },
    handleEditClose() {
      this.resetEditForm('editForm')
    },
    resetEditForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogEditVisible = false
    },

  },
  created() {
    this.getInformation()
  }
}
</script>

<style scoped>

</style>
