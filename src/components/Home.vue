<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <strong>图 书 管 理 系 统</strong>
        <div class="header-avatar">
          <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/userCenter">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-link href="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" target="_blank">查看头像</el-link>
        </div>
      </el-header>
      <el-main>
        <div style="margin: 0 0;">

          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import SideMenu from "./common/SideMenu";
  export default {
    name: 'AdminHome',
    components: {SideMenu},
    data() {
      return {
        userInfo: {
          id: '',
          username: '',
          avatar: '',
        }
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        this.$http.post('/userInfo').then(res => {
          this.userInfo.username = res.data.data
          if(res.data.code !== 0) {
            this.$message.error("权限不够，请先登录")
            this.$router.replace({path: '/login'})
          }
        })
      },
      logout() {
        this.$http.post('/logout').then(res => {
          localStorage.clear()
          sessionStorage.clear()
          this.$message.success(res.data.msg)
          this.$router.replace({path: '/login'})
        })
      }
    },

  }
</script>

<style scoped>

  .el-container {
    padding: 0;
    margin: 0;
    height: 100vh;
  }

  .header-avatar {
    float: right;
    width: 210px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #333;
  }

  .el-header {
    background-color: #17B3A3;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    color: #333;
  }

  a {
    text-decoration: none;
  }

</style>

