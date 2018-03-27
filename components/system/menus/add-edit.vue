<template >
  <section class="dop-form-box">
    <el-form class="dop-form" :model="formData" :rules="formRules" :ref="refFrom" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="名称" prop="title">
            <el-input v-model="formData.title" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
          
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="11">
          <el-form-item label="上一级" prop="parent_id">
            <el-select v-model="formData.parent_id" placeholder="" clearable :no-data-text="'顶级'">
              <el-option v-for="o in options" :key="o.id"  :label="o.title" :value="o.id" :disabled="o.id===formData.id">
                <span style="float: left">{{ o.title }}</span>
                <span v-if="o.is_group===1" style="float: right; font-size: 13px" class="info">分组标签</span>
                <span v-if="o.parent_id===''" style="float: right; font-size: 13px" class="success">顶级菜单</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
          
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="图标" prop="icon">
            <el-input v-model="formData.icon"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
          <el-button type="text"><i :class="formData.icon"></i></el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="15">
          <el-form-item label="链接地址" prop="link">
            <el-input v-model="formData.link"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="分组" prop="is_group">
            <el-radio v-model="formData.is_group" :label="0">否</el-radio>
            <el-radio v-model="formData.is_group" :label="1">是</el-radio>
            <!--
            <el-select v-model="formData.is_group" placeholder="">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
            -->
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="下级" prop="is_sub">
            <el-radio v-model="formData.is_sub" :label="0">否</el-radio>
            <el-radio v-model="formData.is_sub" :label="1">是</el-radio>
            <!--
            <el-select v-model="formData.is_sub" placeholder="">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
            -->
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="rightOffset">
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="侧边" prop="is_side">
            <el-radio v-model="formData.is_side" :label="0">否</el-radio>
            <el-radio v-model="formData.is_side" :label="1">是</el-radio>
            <!--
            <el-select v-model="formData.is_side" placeholder="">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
            -->
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
            <!--
            <el-select v-model="formData.status" placeholder="">
              <el-option label="正常" :value="0"></el-option>
              <el-option label="锁定" :value="1"></el-option>
            </el-select>
            -->
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
      
    </el-form>
  </section>
</template>
<script>
export default {
  name: 'system-menus-add-edit',
  props: {
    formData: {
      type: Object,
      default: function() {
        return {
          title: null,
          icon: null,
          link: '/',
          parent_id: '',
          parent_name: '',
          is_group: 0,
          is_sub: 0,
          is_side: 1,
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
          title: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
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
      options: []
    };
  },
  methods: {
    getOptions: function() {
      return this.$axios({url: '/menus/options', params: this.query}).then(res=>{
        if (res.data.code === 0) {
          this.options = res.data.data;
        } else {
          throw new Error(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.getOptions();
  },
  watch: {
    refreshMarkData: {
      handler() {
        // 重置查询条件
        this.getOptions();
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