<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <router-link to="/index">
    <el-menu-item index="0">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </template>
    </el-menu-item>
    </router-link>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-reading"></i>
        <span>图书管理</span>
      </template>
      <router-link to="/selectBooks">
      <el-menu-item index="1-1">
        <template slot="title">
          <i class="el-icon-search"></i>
          <span slot="title">查询书籍</span>
        </template>
      </el-menu-item>
      </router-link>
      <router-link to="/booksMaintain" v-show="maintain">
      <el-menu-item index="1-2">
        <template slot="title">
          <i class="el-icon-s-cooperation"></i>
          <span slot="title">书籍维护</span>
        </template>
      </el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="2" v-show="userManage">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span>用户管理</span>
      </template>
      <router-link to="/usersMaintain">
      <el-menu-item index="2-1">
        <template slot="title">
          <i class="el-icon-first-aid-kit"></i>
          <span slot="title">用户维护</span>
        </template>
      </el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-rank"></i>
        <span>借阅管理</span>
      </template>
      <el-menu-item index="3-1">
        <i class="el-icon-view"></i>
        <span slot="title">查询信息</span>
      </el-menu-item>
      <el-menu-item index="3-2">
        <i class="el-icon-magic-stick"></i>
        <span slot="title">借阅退还</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>其他功能</span>
      </template>
      <router-link to="/upload">
      <el-menu-item index="4-1">
        <i class="el-icon-upload2"></i>
        <span slot="title">上传图片</span>
      </el-menu-item>
      </router-link>
    </el-submenu>
  </el-menu>

</template>

<script>
  export default {
    name: "SideMenu",
    data() {
      return {
        maintain: true,
        userManage: true,
        menuList: []
      }
    },
    methods: {
      getMenu() {
        this.$http.post('/sideMenu').then(res => {
          if(res.data.code === 0) {
            this.maintain = true
            this.userManage = true
          } else {
            this.maintain = false
            this.userManage = false
          }
        })
      }
    },
    created() {
      this.getMenu()
    }
  }
</script>

<style scoped>

  .el-menu-vertical-demo {
    height: 100vh;
  }

  a {
    text-decoration: none;
  }

</style>
