<template >
  <section class="dop-form-box">
    <el-form class="dop-form" :model="formData" :rules="formRules" :ref="refFrom" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="别名" prop="alias">
            <el-input v-model="formData.alias" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="10">
          <el-form-item label="IP范围" prop="ip">
            <el-input v-model="formData.ip"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" >
          <el-form-item class="mask" label="/" prop="mask">
            <el-input v-model="formData.mask"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="存储目录" prop="alias" >
            <el-input v-model="formData.store_dir" :disabled="!isAdd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="11">
          <el-form-item label="状态" prop="status">
            <el-radio v-model="formData.status" :label="0">正常</el-radio>
            <el-radio v-model="formData.status" :label="1">锁定</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="formData.sort" size="small" controls-position="right"  :min="0" :max="50"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
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
  name: 'resources-nodes-add-edit',
  props: {
    formData: {
      type: Object,
      default: function() {
        return {
          name: '',
          alias: '',
          ip_cidr: '',
          store_dir: '',
          password: '',
          ip: '',
          mask: '',
          description: '',
          sort: 0,
          status: 0
        };
      }
    },
    refreshMarkData: {

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
            { required: true, message: '请输入节点名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
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
      regionOptions: [],
      osOptions: []
    };
  },
  methods: {
    getRegionOptions: function() {
      this.$api({url: '/regions/options'}).then(res=>{
        if (res.data.code === 0) {
          this.regionOptions = res.data.data;
          if (this.isAdd) {
            this.formData.region_id = this.regionOptions[0].id;
          }
        } else {
          throw new Error(res.data.msg);
        }
      });
    },
    getOsOptions: function() {
      this.$api({url: '/oses/options'}).then(res=>{
        if (res.data.code === 0) {
          this.osOptions = res.data.data;
          if (this.isAdd) {
            this.formData.os_id = this.osOptions[0].id;
          }
        } else {
          throw new Error(res.data.msg);
        }
      });
    }
  },
  mounted() {
    // this.getRegionOptions();
    // this.getOsOptions();
    // this.formData.region_id = this.regionOptions[0].id;
  },
  watch: {
    refreshMarkData: {
      handler() {
        // 重置查询条件
        // this.getRegionOptions();
        // this.getOsOptions();
      },
      deep: true
    },
    formData: {
      handler(v) {
        // 重置查询条件
        if (this.isAdd) {
          if (v.is_group === 1) {
            this.formData.is_sub = 1;
          }
        }
      },
      deep: true
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.el-form-item.port{
  .el-form-item__label{
    width:50px !important;
  }
  .el-form-item__content{
    margin-left:50px !important;
  }
}
.el-form-item.mask{
  .el-form-item__label{
    width:25px !important;
  }
  .el-form-item__content{
    margin-left:25px !important;
  }
}
</style>
