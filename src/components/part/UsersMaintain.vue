<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchForm.content" placeholder="请输入搜索内容" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="searchUser">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户编号"
        width="180">
      </el-table-column>
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
      <el-table-column
        prop="icon"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm title="这条内容确定删除吗？">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SelectUsers",
  data() {
    return {
      searchForm: {
      },
      tableData: [{
        id: '001',
        username: 'admin',
        email: '2295158461@qq.com',
        flag: '1'
      },{
        id: '007',
        username: 'zsy',
        email: '2295158461@qq.com',
        flag: '0'
      },{
        id: '008',
        username: 'zwj',
        email: '1930187744@qq.com',
        flag: '0'
      }]
    }
  },
  methods: {
    searchUser() {
    }
  }
}
</script>

<style scoped>

</style>
