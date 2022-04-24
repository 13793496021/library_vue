<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchForm.content" placeholder="请输入搜索内容" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchBook">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-s-data" @click="getBookTable">展示全部内容</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      row-key="id"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="book_identifier"
        label="书籍编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="book_name"
        label="书名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="book_write"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="book_type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="book_number"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row.book_id)">查看</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editHandle(scope.row.book_id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm title="这条内容确定删除吗？" @confirm="delHandle(scope.row.book_id)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!--  添加提示框  -->
    <el-dialog
          title="添加书籍信息"
          :visible.sync="dialogVisible"
          width="600px"
          :before-close="handleClose">
      <el-form :model="insertForm" :rules="insertFormRules" ref="insertForm" label-width="100px" class="demo-insertForm">
        <el-form-item label="书籍编号" prop="book_identifier" label-width="100px">
          <el-input v-model="insertForm.book_identifier" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书名" prop="book_name" label-width="100px">
          <el-input v-model="insertForm.book_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="book_write" label-width="100px">
          <el-input v-model="insertForm.book_write" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="book_type" label-width="100px">
          <el-input v-model="insertForm.book_type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="book_number" label-width="100px">
          <el-input v-model="insertForm.book_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('insertForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--  修改提示框  -->
    <el-dialog
      title="修改书籍信息"
      :visible.sync="dialogEditVisible"
      width="600px"
      :before-close="handleEditClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">
        <el-form-item label="书籍编号" prop="book_identifier" label-width="100px">
          <el-input v-model="editForm.book_identifier" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书名" prop="book_name" label-width="100px">
          <el-input v-model="editForm.book_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="book_write" label-width="100px">
          <el-input v-model="editForm.book_write" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="book_type" label-width="100px">
          <el-input v-model="editForm.book_type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="book_number" label-width="100px">
          <el-input v-model="editForm.book_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm('editForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BooksMaintain",
  data() {
    return {
      dialogVisible: false,
      dialogEditVisible: false,
      editForm: {
        book_id: '',
        book_identifier: '',
        book_name: '',
        book_write: '',
        book_type: '',
        book_number: ''
      },
      editFormRules: {
        book_identifier: [{ required: true, message: '请输入书籍编号', trigger: 'blur' }],
        book_name: [{ required: true, message: '请输入书名', trigger: 'blur' },
          { min: 0, max: 20, message: '长度不能超过20位', trigger: 'blur' }],
        book_write: [{ required: true, message: '请输入作者', trigger: 'blur' },
          { min: 0, max: 20, message: '长度不能超过20位', trigger: 'blur' }],
        book_type: [{ required: true, message: '请输入类型', trigger: 'blur' },
          { min: 0, max: 20, message: '长度不能超过20位', trigger: 'blur' }],
        book_number: [{ required: true, message: '请输入数量', trigger: 'blur' }],
      },
      insertForm: {
        book_id: '',
        book_identifier: '',
        book_name: '',
        book_write: '',
        book_type: '',
        book_number: ''
      },
      insertFormRules: {
        book_identifier: [{ required: true, message: '请输入书籍编号', trigger: 'blur' }],
        book_name: [{ required: true, message: '请输入书名', trigger: 'blur' },
          { min: 0, max: 20, message: '长度不能超过20位', trigger: 'blur' }],
        book_write: [{ required: true, message: '请输入作者', trigger: 'blur' },
          { min: 0, max: 20, message: '长度不能超过20位', trigger: 'blur' }],
        book_type: [{ required: true, message: '请输入类型', trigger: 'blur' },
          { min: 0, max: 20, message: '长度不能超过20位', trigger: 'blur' }],
        book_number: [{ required: true, message: '请输入数量', trigger: 'blur' }],
      },
      searchForm: {
        book_identifier: '',
        book_name: '',
        book_write: '',
        book_type: ''
      },
      tableData: [],

    }
  },
  created() {
    this.getBookTable()
  },
  methods: {
    getBookTable() {//上传表数据
      this.$http.post('/booksMaintain/table').then(res =>{
        this.tableData = res.data.data
      })
    },
    searchBook() {//搜索
      this.$http.post('/selectBooks/select',{
        book_identifier: this.searchForm.content,
        book_name: this.searchForm.content,
        book_write: this.searchForm.content,
        book_type: this.searchForm.content
      }).then(res => {
        if(res.data.code !== 0) {
          this.tableData = []
          this.$message.info(res.data.msg)
        } else {
          this.tableData = res.data.data
        }
      })
    },
    submitForm(formName) {//添加提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/booksMaintain/insertBook', {
            book_id: this.insertForm.book_id,
            book_identifier: this.insertForm.book_identifier,
            book_name: this.insertForm.book_name,
            book_write: this.insertForm.book_write,
            book_type: this.insertForm.book_type,
            book_number: this.insertForm.book_number
          }).then(res => {
            if(res.data.code === 0) {
              this.dialogVisible = false
              this.$message.success(res.data.msg)
              this.getBookTable()
            } else {
              this.insertForm = {}
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false;
        }
      });
    },
    editHandle(id) {//编辑
      this.$http.post('/booksMaintain/edit',{
        book_id: id
      }).then(res => {
        this.editForm = res.data.data
        this.dialogEditVisible = true
      })
    },
    submitEditForm(formName) {//修改提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/booksMaintain/updateBook', {
            book_id: this.editForm.book_id,
            book_identifier: this.editForm.book_identifier,
            book_name: this.editForm.book_name,
            book_write: this.editForm.book_write,
            book_type: this.editForm.book_type,
            book_number: this.editForm.book_number
          }).then(res => {
            if(res.data.code === 0) {
              this.dialogEditVisible = false
              this.$message.success(res.data.msg)
              this.getBookTable()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false;
        }
      });
    },
    delHandle(id) {//删除
      this.$http.post('/booksMaintain/deleteBook',{
        book_id: id
      }).then(res => {
        this.$message.success(res.data.msg)
        this.getBookTable()
      })
    },
    handleClick(id) {//查看
      this.$http.post('booksMaintain/browse',{
        book_id: id
      }).then(res => {
        if(res.data.code === 0) {
          //console.log(id)
          this.$router.replace({path: '/details'})
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.insertForm = {}
    },
    resetEditForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogEditVisible = false
    },
    handleClose() {
      this.resetForm('insertForm')
    },
    handleEditClose() {
      this.resetEditForm('editForm')
    }
  }
}
</script>

<style scoped>

</style>
