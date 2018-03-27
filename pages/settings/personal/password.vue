<template>
  <section>

    <el-row class="dop-form-box">
      <el-col :span="24">
        <el-card class="dop-card">
          <div slot="header"  class="clearfix">
            <span>修改密码</span>
          </div>

          <el-form ref="pwdForm" class="dop-form" :model="formData" :rules="formRules" label-width="100px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="旧密码" prop="password0">
                  <el-input v-model="formData.password0" type="password" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="新密码" prop="password1">
                  <el-input v-model="formData.password1" type="password"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="确认密码" prop="password2">
                  <el-input v-model="formData.password2" type="password" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <input type="hidden" v-model="formData.id" />
            <input type="hidden" v-model="formData.password" />
          </el-form>
          <el-row>
            <el-col  class="dop-form-button-box">
              <el-button type="primary" size="small" @click="updatePassword">修改</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>


  </section>
</template>

<script>
  export default {
    name: 'index',
    head: {
      title: '个人资料'
    },
    middleware: 'authenticated',
    components: {
    },
    data() {
      return {
        formData: {
          id: this.$store.state.user.id,
          password: this.$store.state.user.password,
          password0: null,
          password1: null,
          password2: null
        },
        formRules: {
          password0: [
            { required: true, message: '此字段必须', trigger: 'change' }
          ],
          password1: [
            { required: true, message: '此字段必须', trigger: 'change' }
          ],
          password2: [
            { required: true, message: '此字段必须', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      updatePassword() {
        this.$refs.pwdForm.validate(async(valid) => {
          if (valid) {
            const h = this.$createElement;
            this.$api({url: '/users/editPwd', data: this.formData}).then(res=>{
              if (res.data.code === 0) {
                this.formData.password = res.data.data.password;
                // 重新登录
                this.$store.dispatch('login', {
                  username: this.$store.state.user.username,
                  password: this.formData.password1
                }).then();
                // 消息提示
                this.$notify({
                  message: h('span', { class: 'dop-notification-msg'}, '用户修改成功!'),
                  type: 'success'
                });
              } else {
                throw new Error(res.data.msg);
              }
            }).catch(() => {
              // 消息提示
              this.$notify({
                // title: '用户创建失败!',
                // message: e.message,
                message: h('span', { class: 'dop-notification-msg'}, '用户修改失败!'),
                type: 'error'
              });
            });
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss" scoped>
  .dop-form{
    .el-input{
      display: inline;
    }
  }
</style>
