<template>
  <!--  登录表单 -->
  <div class="login-form">
    <el-form class="form" label-position="top" :model="formData" :rules="rules" ref="formData" label-width="20%"
             size="small">
      <el-form-item prop="username" class="form-item">
        <el-input prefix-icon="el-icon-user" v-model="formData.username"
                  placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input prefix-icon="el-icon-lock" v-model="formData.password" type="password"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item prop="code" class="form-item">
            <el-input v-model="formData.captcha" placeholder="验证码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <a href="" title="点击更换验证码"></a>
          <img src="">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="loginFormSubmit('formData')">登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      labelPosition: 'left',
      formData: {
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        // 表单校验
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 20, message: '用户名在5~20位之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 20, message: '密码在5~20位之间', trigger: 'blur'}
        ],
        captcha: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    loginFormSubmit (formData) {
      // 表单校验通过向父组件传值
      this.$refs[formData].validate((valid) => {
        if (valid) {
          this.$emit('on-login', {
            username: this.formData.username,
            password: this.formData.password,
            captcha: this.formData.captcha
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
