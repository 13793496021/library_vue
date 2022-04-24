<template>
  <div>
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
        prop="book_introduction"
        label="内容简介"
        width="180">
      </el-table-column>
      <el-table-column
        prop="write_introduction"
        label="作者简介"
        width="180">
      </el-table-column>
    </el-table>
    <el-form :inline="true">
      <el-form-item>
        <el-button @click="reBooksMaintain">返回</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "UserDetails",
  data() {
    return {
      tableData: [],

    }
  },
  methods: {
    getDetails() {
      this.$http.post('/userDetails').then(res => {
        if(res.data.code === 0) {
          this.tableData = res.data.data
        } else {
          this.$router.replace({path: '/selectBooks'})
        }

      })
    },
    reBooksMaintain() {
      this.$router.replace({path: '/selectBooks'})
    }
  },
  created() {
    this.getDetails()
  },

}
</script>

<style scoped>

</style>
