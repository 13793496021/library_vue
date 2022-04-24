<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <h2>欢迎来到图书管理系统</h2>
      <el-image :src="require('@/assets/logo.jpg')" style="height: 180px; width: 180px;"></el-image>


    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
      </el-col>
    <el-col :xl="6" :lg="7">

      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="demo-loginForm">
        <el-form-item label="用户名" prop="username" style="width: 380px;">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" style="width: 380px;">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="validate" style="width: 380px;">
          <el-input v-model="loginForm.validate" style="width: 172px; float: left"></el-input>
          <div class="codes" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
          <!--<el-image src="'" class="captchaImg"></el-image>-->
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
          <el-button @click="sign">注册</el-button>
        </el-form-item>
        <el-link href="http://127.0.0.1:8080/forgetPassword" target="_blank">忘了密码</el-link>
      </el-form>
    </el-col>
  </el-row>


</template>


<script>
import SIdentify from "./Identify";
export default {
  name: "Login",
  components: {SIdentify},
  data() {
    return {
      identifyCode: '',
      errorInfo: false,
      loginForm: {
        username: '',
        password: '',
        validate: ''
      },
      responseResult: [],

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 0, max: 18, message: '长度不能超过18位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 18, message: '长度不能超过18位', trigger: 'blur' }
        ],
        validate: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度为 4 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  mounted() {
    this.identifyCode = "";
  },
  methods: {
    submitForm(formName) {//登录方法
      const self = this;
      self.$refs[formName].validate((valid) => {
        if(valid) {
          if(self.loginForm.validate !== this.identifyCode) {
            self.errorInfo = true;
            self.errInfo = '验证码错误';
            self.$message.error('验证码错误');
            this.refreshCode();
            this.loginForm.validate = this.$options.data().loginForm.validate;
          } else {
            this.$http.post('/login',{
              username: this.loginForm.username,
              password: this.loginForm.password
            }).then(successResponse => {
              if(successResponse.data.code === 0) {
                localStorage.setItem('userId',successResponse.data.data)
                //sessionStorage.setItem('userId',successResponse.data.data)
                this.$router.replace({path: '/home'})
              }else {
                this.$message.error(successResponse.data.msg);
                //alert("用户名或密码错误");
                this.refreshCode();
                this.loginForm.validate = this.$options.data().loginForm.validate;
                //this.$router.replace({path: '/login'})
              }
            }).catch(failResponse => {
                //404页面跳转
                console.log(failResponse);
              this.$router.replace({path: '/error404'})
              })
          }
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
    resetForm(formName) {//重置方法
      this.$refs[formName].resetFields();
    },
    sign() {//注册方法
      this.$router.replace({path: '/sign'})
    },
    refreshCode() {//刷新验证码
      this.$http.post('/login/code').then(res => {
        //console.log(res.data.data)
        this.identifyCode = res.data.data
      }).catch(failResponse => {
        //404页面跳转
        console.log(failResponse);
        this.$router.replace({path: '/error404'})
      })
    },
  },
  created() {
    this.refreshCode();
  },
}
</script>



<style scoped>
    .el-row {
      background-color: #fafafa;
      height: 100vh;
      display: flex;
      align-items: center;
      text-align: center;

    }

    .el-divider {
      height: 200px;
    }

    .el-link {

    }

</style>
