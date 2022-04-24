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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SelectBooks",
  data() {
    return {
      searchForm: {
        book_identifier: '',
        book_name: '',
        book_write: '',
        book_type: ''
      },
      tableData: []
    }
  },
  methods: {
    searchBook() {
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
    handleClick(id) {
      this.$http.post('selectBooks/browse',{
        book_id: id
      }).then(res => {
        if(res.data.code === 0) {
          //console.log(id)
          this.$router.replace({path: '/userDetails'})
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
