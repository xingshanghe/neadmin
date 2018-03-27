<template>
  <section>
    <el-row>
      <el-col :span="16">
        <dopMailTitle :title="'集群管理'"></dopMailTitle>
      </el-col>
      <el-col :span="8" class="top-buttons-list">
        <el-button-group>
          <el-button type="primary" size="small" @click="mDel" :disabled="!(mSelection.length > 0)" icon="el-icon-delete" title="删除">删除</el-button>
          <el-button type="primary" size="small"  @click="add" icon="el-icon-plus" title="新增">新增</el-button>
          <el-button type="primary" size="small" @click="getTableData" icon="el-icon-refresh" title="刷新">刷新</el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-row style="margin-top:10px;">
      <el-col>
        <el-table :data="tableData?tableData.clusters:[]"  border class="dop-table-list" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column label="名称"  width="120">
            <template slot-scope="scope">
              <nuxt-link class="el-button el-button--text" :to="'/resources/clusters/' + scope.row.id"  >{{scope.row.name,10|subString}}</nuxt-link>
            </template>
          </el-table-column>
          <el-table-column prop="alias" label="别名" align="center" >
            <template slot-scope="scope">{{scope.row.alias}}</template>
          </el-table-column>
          <el-table-column prop="ip_cidr" label="IP范围" >
            <template slot-scope="scope">{{scope.row.ip_cidr}}</template>
          </el-table-column>
          <el-table-column prop="store_dir" label="存储目录"  >
            <template slot-scope="scope">{{scope.row.store_dir}}</template>
          </el-table-column>
          <el-table-column label="节点"  width="50" align="center" >
            <template slot-scope="scope">
              <el-button type="text" @click="nodes(scope.row)">{{0}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center" width="72" :filters="[{ text: '正常', value: 0 }, { text: '锁定', value: 1 }]" :filter-method="filterStatus">
            <template slot-scope="scope">
              <span :class="scope.row.status===0?'success':'error'">{{scope.row.status|translateStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述"  >
            <template slot-scope="scope">{{scope.row.description}}</template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" align="center" width="50">
            <template slot-scope="scope">{{scope.row.sort}}</template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)"><i class="el-icon-edit" title="编辑"></i></el-button>
              <el-button type="text" @click="del(scope.row)"><i class="el-icon-delete" title="删除"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-if="tableData" style="margin-top:10px;" class="pager" >
      <el-col>
        <el-pagination layout="total, prev, pager, next" :total="tableData.total"  :current-page.sync="tableData.page_no" :page-size="tableData.page_size" @current-change="getTableData"></el-pagination>
      </el-col>
    </el-row>

    <el-dialog  class="dop-dialog" title="编辑" :visible.sync="editForm.visible" :close-on-click-modal="false">
      <profileFrom :refreshMarkData="tableData" :formData="editForm.data" :isAdd="false" :ref="editForm.ref"></profileFrom>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="editForm.visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog  class="dop-dialog" title="新增" :visible.sync="addForm.visible" :close-on-click-modal="false">
      <profileFrom :refreshMarkData="tableData" class="dop-form-box" :formData="addForm.data" :isAdd="true" :ref="addForm.ref"></profileFrom>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addForm.visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
import dopMailTitle from '~/components/dop-main-title.vue';
import profileFrom from '~/components/resources/clusters/add-edit.vue';
export default {
  name: 'index',
  head: {
    title: '菜单管理'
  },
  middleware: 'authenticated',
  components: {
    profileFrom,
    dopMailTitle
  },
  data() {
    return {
      tableData: null,
      mSelection: [],
      isrefreshStatus: [],
      addForm: {
        ref: 'addForm',
        visible: false,
        data: {
          name: '',
          alias: '',
          ip_cidr: '',
          store_dir: '/data/',
          password: '',
          ip: '',
          mask: '',
          description: '',
          sort: 0,
          status: 0
        }
      },
      editForm: {
        ref: 'editForm',
        visible: false,
        data: null
      },
      query: this.$route.query
    };
  },
  methods: {
    handleSelectionChange(rows) {
      this.mSelection = rows;
    },
    getTableData() {
      this.query.page = this.tableData ? this.tableData.page_no : this.query.page ? this.query.page : 1;
      this.$axios.request({method: 'get', url: '/clusters', params: this.query}).then(res=>{
        if (res.data.code === 0) {
          this.tableData = res.data.data;
        } else {
          throw new Error(res.data.msg);
        }
      }).catch(e=>{
        console.error(e.message);
        this.$notify({
          // title: '用户创建失败!',
          // message: e.message,
          message: this.$createElement('span', { class: 'dop-notification-msg'}, '集群列表获取失败!'),
          type: 'error'
        });
      });
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    filterGroup(value, row) {
      return row.is_group === value;
    },
    filterSub(value, row) {
      return row.is_sub === value;
    },
    filterSide(value, row) {
      return row.is_side === value;
    },
    add: function() {
      this.addForm.visible = true;
    },
    addSubmit: function() {
      this.$refs.addForm.$refs.form.validate(async(valid) => {
        if (valid) {
          const h = this.$createElement;
          // 关闭弹窗
          this.addForm.visible = false;
          this.addForm.data.ip_cidr = this.addForm.data.ip + '/' + this.addForm.data.mask;
          this.$axios.request({method: 'post', url: '/clusters', data: this.addForm.data}).then(res=>{
            if (res.data.code === 0) {
              // 消息提示
              this.$notify({
                message: h('span', { class: 'dop-notification-msg'}, '集群创建成功!'),
                type: 'success'
              });
              this.getTableData();
            } else {
              throw new Error(res.data.msg);
            }
          }).catch(() => {
            // 消息提示
            this.$notify({
              // title: '用户创建失败!',
              // message: e.message,
              message: h('span', { class: 'dop-notification-msg'}, '集群创建失败!'),
              type: 'error'
            });
          });
        }
      });
    },
    edit: function(row) {
      // ip_cidr的转化
      let [ip, mask] = row.ip_cidr.split('/', 3);
      row.ip = ip;
      row.mask = mask;

      this.editForm.data = row;
      this.editForm.visible = true;
    },
    editSubmit: function() {
      this.$refs.editForm.$refs.form.validate(async(valid) => {
        if (valid) {
          const h = this.$createElement;
          // 关闭弹窗
          this.editForm.visible = false;
          this.editForm.data.ip_cidr = this.editForm.data.ip + '/' + this.editForm.data.mask;
          this.$axios({method: 'put', url: '/clusters/' + this.editForm.data.id, data: this.editForm.data}).then(res=>{
            if (res.data.code === 0) {
              // 消息提示
              this.$notify({
                message: h('span', { class: 'dop-notification-msg'}, '集群修改成功!'),
                type: 'success'
              });
              this.getTableData();
            } else {
              throw new Error(res.data.msg);
            }
          }).catch(() => {
            // 消息提示
            this.$notify({
              // title: '用户创建失败!',
              // message: e.message,
              message: h('span', { class: 'dop-notification-msg'}, '集群修改失败!'),
              type: 'error'
            });
          });
        }
      });
    },
    del: function(row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const h = this.$createElement;
        this.$axios({method: 'delete', url: '/clusters/' + row.id}).then(res=>{
          if (res.data.code === 0) {
            // 消息提示
            this.$notify({
              message: h('span', { class: 'dop-notification-msg'}, '集群删除成功!'),
              type: 'success'
            });
            this.getTableData();
          } else {
            throw new Error(res.data.msg);
          }
        }).catch(() => {
          // 消息提示
          this.$notify({
            // title: '用户创建失败!',
            // message: e.message,
            message: h('span', { class: 'dop-notification-msg'}, '集群删除失败!'),
            type: 'error'
          });
        });
      });
    },
    mDel: function() {

    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
