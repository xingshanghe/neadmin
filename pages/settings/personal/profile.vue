<template>
  <section>

    <el-row class="dop-form-box">
      <el-col :span="24">
        <el-card class="dop-card">
          <div slot="header"  class="clearfix">
            <span>个人资料</span>
          </div>
          <profileFrom :formData="formData"  ref="editForm"></profileFrom>
          <el-row>
            <el-col class="dop-form-button-box">
              <el-button type="primary" size="small" @click="updateUser">修改资料</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>


  </section>
</template>

<script>
  import _ from 'lodash';
  import profileFrom from '~/components/users/accounts/add-edit.vue';
  import { setAllByJwt } from '~/utils/auth.js';
  export default {
    name: 'index',
    head: {
      title: '个人资料'
    },
    middleware: 'authenticated',
    components: {
      profileFrom
    },
    data() {
      return {
        formData: this.getUser()
      };
    },
    methods: {
      getUser() {
        // 深拷贝对象
        // var {...user} = this.$store.state.user;
        var user = _.cloneDeep(this.$store.state.user);
        return user;
      },
      updateUser() {
        this.$refs.editForm.$refs.form.validate(async(valid) => {
          if (valid) {
            const h = this.$createElement;
            this.$api({url: '/users/editSelf', data: this.formData}).then(res=>{
              if (res.data.code === 0) {
                this.formData = res.data.data.account;
                // 重新登录
                setAllByJwt(res.data.data.token);
                // 消息提示
                this.$notify({
                  message: h('span', { class: 'dop-notification-msg'}, '用户修改成功!'),
                  type: 'success'
                });
                this.getUser();
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
