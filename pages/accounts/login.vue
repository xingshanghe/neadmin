<template>
<div>
  <div class="login container">
    <el-row class="login-row" type="flex" justify="center">
      <el-col :xs="{span: 14, offset: 5}" :sm="{span: 10, offset: 7}" :lg="{span: 6, offset: 9}">
        <el-card>
          <el-form :model="user" ref="user" @keyup.enter.native="!logging && login()">
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
            <el-row>
              <el-col :span="24">
                <el-button type="primary" class="login-btn" :loading="logging" @click="login">登录</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  middleware: 'anonymous',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      logging: false,
      captchaSvg: ''
    };
  },
  layout: 'empty',
  methods: {
    login() {
      this.logging = true;
      this.$refs.user.validate(async(valid) => {
        try {
          if (valid) {
            await this.$store.dispatch('login', this.user);
            this.$router.push(this.$route.query.redirect || '/');
          }
        } catch (e) {
          this.$message.error(e.message);
        } finally {
          this.logging = false;
        }
      });
    },
    refreshCaptcha() {}
  }
};
</script>


<style scoped lang="scss">
.login {
  background: url(~/assets/images/login-bg.jpg) no-repeat center center fixed;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  img.logo {
    position: fixed;
    top: 12px;
    left: 20px;
  }
  .login-row {
    height: 100%;
    flex-direction: column;
  }
}
.el-card {
  background-color: rgba(255, 255, 255, 0.5);
  .el-form {
    margin-top: 4%;
    margin-bottom: 4%;
    .login-btn {
      width: 100%;
    }
  }
}
</style>

