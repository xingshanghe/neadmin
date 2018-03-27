<template >
  <section class="dop-form-box">
    <el-form class="dop-form" :model="formData" :rules="formRules" :ref="refFrom" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="帐号" prop="username">
            <el-input v-model="formData.username" :disabled="!isAdd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="rightOffset">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="rightOffset">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="formData.nickname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="formData.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="rightOffset">
          <el-form-item label="生日" prop="birthday">
            <el-date-picker class="dop-date-picker" v-model="formData.birthday" type="date" align="right" value-format="yyyy-MM-dd" :editable="false"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="formData.gender" placeholder="">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="rightOffset">
          <el-form-item label="联系地址" prop="address">
            <el-input v-model="formData.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form>
  </section>
</template>
<script>
export default {
  name: 'users-accounts-add-edit',
  props: {
    formData: {
      type: Object,
      default: function() {
        return {
          username: null,
          nickname: null,
          gender: 'male',
          phone: null,
          age: 18,
          birthday: null,
          email: null,
          address: null
        };
      }
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    refFrom: {
      type: String,
      default: 'form'
    },
    formRules: {
      type: Object,
      default: function() {
        return {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]
        };
      }
    },
    rightOffset: {
      type: Number,
      default: 1
    }
  },
  methods: {
  },
  mounted() {

  }
};
</script>