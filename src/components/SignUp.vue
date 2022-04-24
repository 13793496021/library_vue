<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <h2>注册</h2>
      <el-image :src="require('@/assets/logo.jpg')" style="height: 180px; width: 180px;"></el-image>


    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
      </el-col>
    <el-col :xl="6" :lg="7">
      <!--页面效果 -->
      <el-form :model="signForm" :rules="rules" ref="signForm" label-width="80px" class="demo-signForm">
        <el-form-item label="用户名" prop="username" style="width: 380px;">
          <el-input type="username" v-model="signForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px;">
          <el-input type="password" v-model="signForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="re_password" style="width: 380px;">
          <el-input type="password" v-model="signForm.re_password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" style="width: 380px;">
          <el-input type="email" v-model="signForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="validate" class="pr" style="width: 380px;">
          <el-input type="code" v-model="signForm.validate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getCode()" class="code-btn" :disabled="!show">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{count}} s</span>
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('signForm')">注册</el-button>
          <el-button @click="resetForm('signForm')">重置</el-button>
          <el-button @click="reForm">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>

const TIME_COUNT = 60 // 设置一个全局的倒计时的时间
 export default {
   name: "SignUp",
   data() {
     return {
       signForm: {
         username: '',
         password: '',
         re_password: '',
         email: '',
         validate: '',
       },
       correct: '',
       flag: false,
       show: true,
       count: '',
       timer: null,
       rules: {
         email: [
           {required: true, message: '请输入邮箱', trigger: 'blur'},
           { min: 0, max: 20, message: '长度不能超过20位', trigger: 'blur' }
         ],
         validate: [
           {required: true, message: '请输入验证码', trigger: 'blur'}
         ],
         username: [
           {required: true, message: '请输入用户名', trigger: 'blur'},
           { min: 0, max: 18, message: '长度不能超过18位', trigger: 'blur' }
         ],
         password: [
           {required: true, message: '请输入密码', trigger: 'blur'},
           { min: 0, max: 18, message: '长度不能超过18位', trigger: 'blur' }
         ],
         re_password: [
           {required: true, message: '请再次输入密码', trigger: 'blur'},
           { min: 0, max: 18, message: '长度不能超过18位', trigger: 'blur' }
         ]
       }
     }
   },
   methods: {
     // 向后端发请求的点击事件
     getCode () {
       const self = this
       const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
       if (this.signForm.email === '') {
         self.$message.error('请先输入邮箱再点击获取验证码')
       } else {
         if(!reg.test(this.signForm.email)) {
           self.$message.error('请输入格式正确有效的邮箱号')
         } else {
           this.$http.post('/sign/mail',{
             email: this.signForm.email
           }).then(res => {
             this.correct = res.data.data;
           })
           // 验证码倒计时
           if (!this.timer) {
             this.count = TIME_COUNT
             this.show = false
             this.flag = true
             this.timer = setInterval(() => {
               if (this.count > 0 && this.count <= TIME_COUNT) {
                 this.count--
               } else {
                 this.show = true
                 this.flag = false
                 this.correct = null
                 clearInterval(this.timer)
                 this.timer = null
               }
             }, 1000)
           }


         }
       }
     },
     resetForm(formName) {
       this.$refs[formName].resetFields();
     },
     reForm() {
       this.$router.replace({path: '/login'})
     },
     submitForm(formName) {
       const se = this;
       se.$refs[formName].validate((valid) => {
         if(valid) {
           if(this.signForm.username === '') {
             this.$message.error('用户名不能为空');
           } else {
             if(this.signForm.password === '' || this.signForm.re_password === '') {
               this.$message.error('密码或确认密码不能为空');
             } else {
               if(this.signForm.password !== this.signForm.re_password) {
                 this.$message.error('两次密码输入不一致');
                 this.signForm.re_password = this.$options.data().signForm.re_password;
               } else {
                 if(this.flag !== true) {
                   this.$message.error('验证码失效请重新发送');
                 }
                 else if(this.flag === true && this.signForm.validate !== this.correct) {
                   this.$message.error('验证码错误');
                 }
                 else if(this.flag === true && this.signForm.validate === this.correct) {
                   this.$http.post('/sign',{
                     username: this.signForm.username,
                     password: this.signForm.password,
                     email: this.signForm.email
                   }).then(response => {
                     if(response.data.code === 0) {
                       this.$message.success(response.data.msg);
                       this.$router.replace({path: '/login'})
                     } else {
                       this.$message.error(response.data.msg);
                     }
                   }).catch(failResponse => {
                     //404页面跳转
                     console.log(failResponse);
                     this.$router.replace({path: '/error404'})
                   })
                 }
               }
             }
           }

         } else {
           console.log('error submit!');
           return false;
         }
       })
     },
   }
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
.code-btn {
  display: flex;
}

</style>
