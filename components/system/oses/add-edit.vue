<template >
  <section class="dop-form-box">
    <el-form class="dop-form" :model="formData" :rules="formRules" :ref="refFrom" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="分支" prop="family">
            <el-select v-model="formData.family" placeholder="" clearable filterable :no-data-text="'请先选择分支'">
              <el-option v-for="o in familyOptions" :key="o"  :label="o" :value="o" >
                <span style="float: left">{{ o }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7">
          <el-form-item label="版本" prop="version">
            <el-input v-model="formData.version"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" >
          <el-form-item class="second_without_label" prop="bit">
            <el-radio v-model="formData.bit" :label="64">64位</el-radio>
            <el-radio v-model="formData.bit" :label="32">32位</el-radio>
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

      <el-row >
        <el-col :span="15" class="text-value normal-input">
          <el-form-item label="描述" prop="description">
            <el-input v-model="formData.description" type="textarea" placeholder="描述可以为空，或填写2-256个中英文字符，不能以http://和https://开头"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form>
  </section>
</template>
<script>
export default {
  name: 'system-regions-add-edit',
  props: {
    formData: {
      type: Object,
      default: function() {
        return {
          name: '',
          family: '',
          version: '',
          bit: 64,
          status: 0,
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
  data() {
    return {
      familyOptions: [
        'Ubuntu',
        'CentOS',
        'Fedora',
        'Debian'
      ]
    };
  },
  methods: {
  },
  mounted() {
    // 选中分支的第一个
    this.formData.family = this.familyOptions[0];
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.el-form-item.second_without_label{
  .el-form-item__label{
    width:20px !important;
  }
  .el-form-item__content{
    margin-left:20px !important;
  }
}

</style>