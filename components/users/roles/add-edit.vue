<template >
  <section class="dop-form-box">
    <el-form class="dop-form" :model="formData" :rules="formRules" :ref="refFrom" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" :disabled="!isAdd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="编码" prop="code">
            <el-input v-model="formData.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="状态" prop="status">
            <el-radio v-model="formData.status" :label="0">正常</el-radio>
            <el-radio v-model="formData.status" :label="1">锁定</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="15">
          <el-form-item label="描述" prop="description">
            <el-input v-model="formData.description" type="textarea" placeholder="描述可以为空，或填写2-256个中英文字符"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form>
  </section>
</template>
<script>
export default {
  name: 'users-roles-add-edit',
  props: {
    formData: {
      type: Object,
      default: function() {
        return {
          name: null,
          code: null,
          status: '0',
          description: ''
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
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
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