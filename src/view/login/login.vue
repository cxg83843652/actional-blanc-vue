<style lang="less">
@import './login.less';
</style>
<template>
  <el-row class="login">
    <el-col :span="15"></el-col>
    <el-col :span="9">
      <div class="login-con">
        <el-card class="box-card login-in" shadow="always">
          <div slot="header" class="clearfix">
            <span>欢迎登录</span>
          </div>
          <login-form @on-login="loginFormSubmit"></login-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'

export default {
  components: {LoginForm},
  methods: {
    ...mapActions([
      'loginSubmit',
      'getUserInfo'
    ]),
    /**
     *  登录请求
     * @param username
     * @param password
     * @param captcha
     */
    loginFormSubmit ({username, password, captcha}) {
      this.loginSubmit({username, password, captcha}).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.home
          })
        })
      })
    }
  }
}
</script>
<style scoped>
</style>
