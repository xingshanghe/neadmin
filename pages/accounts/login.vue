<template>
  <div class="login container">
    <el-row type="flex" justify="center">
      <el-col :xs="{span: 14, offset: 5}" :sm="{span: 10, offset: 7}" :lg="{span: 6, offset: 9}">
        <el-card>
          <el-form :model="user" ref="user" @keyup.enter.native="login">
            <el-form-item prop="username" :rules="[{ required: true, message: '用户名称必须!'}]">
              <el-col :span="24">
                <el-input v-model="user.username" placeholder="用户名"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: '密码必须!'}]">
              <el-col :span="24">
                <el-input v-model="user.password" type="password" placeholder="密码"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="captcha" :rules="[{ required: true, message: '验证码必须!'}]">
                <el-col :span="12">
                  <el-input v-model="user.captcha" placeholder="验证码"></el-input>
                </el-col>
                <el-col :offset="1" :span="11" ref="captcha">
                  <div v-html="captchaSvg" @click='refreshCaptcha' class="captcha"></div>
                </el-col>
            </el-form-item>
          </el-form>
          <el-row>
              <el-col :span="24">
                <el-button type="primary" class="login-btn" :loading="logging" @click="login">登录</el-button>
              </el-col>
            </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  middleware: 'anonymous',
  data() {
    return {
      user: {
        username: '',
        password: '',
        captcha: ''
      },
      logging: false,
      captchaSvg: ''
    };
  },
  layout: false,
  methods: {
    login() {},
    refreshCaptcha() {}
  }
};
</script>

