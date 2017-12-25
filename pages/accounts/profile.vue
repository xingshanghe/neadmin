<template>
  <section>
    
    <el-row>
      <el-col :span="24">
        <el-card class="dop-card">
          <div slot="header"  class="clearfix">
            <span>个人资料</span>
          </div>

          <el-form class="dop-form" :model="formData" :rules="formRules" label-width="100px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="帐号" prop="username">
                  <el-input v-model="formData.username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-form-item label="昵称" prop="profile.nickname">
                  <el-input v-model="formData.profile.nickname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="性别" prop="profile.gender">
                  <el-select v-model="formData.profile.gender" placeholder="">
                    <el-option label="男" value="male"></el-option>
                    <el-option label="女" value="female"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-form-item label="年龄" prop="profile.age">
                  <el-input v-model="formData.profile.age"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="联系电话" prop="profile.phone">
                  <el-input v-model="formData.profile.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-form-item label="电子邮件" prop="profile.email">
                  <el-input v-model="formData.profile.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="联系地址" prop="profile.address">
                  <el-input v-model="formData.profile.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item>
                  <el-button type="primary" size="small" @click="updateUser">修改资料</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    
  </section>
</template>

<script>
import _ from 'lodash';
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
      formData: this.getUser(),
      formRules: {
        username: [
          { required: true, message: '用户名必须', trigger: 'blur' },
          { min: 5, message: '最短长度为6', trigger: 'blur' }
        ]
      }
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

    }
  }
};
</script>
