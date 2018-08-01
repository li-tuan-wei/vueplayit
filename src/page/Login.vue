<template>
  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default{
    data(){
      return {
        rules: {
          account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loading: false
      }
    },
    methods: {
      submitClick: function () {
        var _this = this;
        this.loading = true;
        //Send login request get response data
        var data = {"user":{"name":"admin"}, "menuItems": [{"path": "/home","component": "Home","name": "系统管理","desc": "系统管理","meta": {"requireAuth": "true"},"children": [{"path": "/system/operator","component": "Operator","name": "系统用户","desc": "系统用户","meta": {"requireAuth": "true"}},{"path": "/system/organ","component": "Organ","name": "组织管理","desc": "组织管理","meta": {"requireAuth": "true"}},{"path": "/system/menu","component": "Menu","name": "菜单管理","desc": "菜单管理","meta": {"requireAuth": "true"}},{"path": "/system/member","component": "Member","name": "会员管理","desc": "会员管理","meta": {"requireAuth": "true"}}]},{"path": "/home","component": "Home","name": "系统工具","desc": "系统工具","meta": {"requireAuth": "true"},"children": [{"path": "/systools/e-mail","component": "Email","name": "发送邮件","desc": "发送邮件","meta": {"requireAuth": "true"}}]}] };
        _this.$store.commit('login', data);
        var path = _this.$route.query.redirect;
        _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
      }
    }
  }
</script>
