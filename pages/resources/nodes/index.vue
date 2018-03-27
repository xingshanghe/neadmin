<template>
  <section>
    <el-row>
      <el-col :span="16">
        <dopMailTitle :title="'空闲节点'"></dopMailTitle>
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
        <el-table :data="tableData?tableData.nodes:[]"  border class="dop-table-list" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column label="名称"  width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">{{scope.row.node.name,10|subString}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="alias" label="别名" align="center" >
            <template slot-scope="scope">{{scope.row.node.alias}}</template>
          </el-table-column>

          <el-table-column prop="os" label="区位" align="center" >
            <template v-if="scope.row.node.region_id" slot-scope="scope">{{scope.row.region.name}}</template>
          </el-table-column>

          <el-table-column prop="os" label="操作系统" align="center" >
            <template v-if="scope.row.node.os_id" slot-scope="scope">{{scope.row.os.family}} {{scope.row.os.version}} {{scope.row.os.bit}}位</template>
          </el-table-column>
          
          <el-table-column prop="username" label="SSH" width="50" align="center" >
            <template slot-scope="scope">
              <el-popover class="connect-popover" effect="light"  placement="top" trigger="hover">
                <template>
                    <el-tag class="connect_info"><i class="icon-link2 connect" title="地址"></i>{{scope.row.node.username}}@{{scope.row.node.ip}}:{{scope.row.node.port}}</el-tag>
                    <el-tag class="connect_info"><i class="icon-key connect" title="密码"></i>{{scope.row.node.password}}</el-tag>
                </template>
                <i slot="reference" class="icon-hat connect"></i>
              </el-popover>
            </template>
          </el-table-column>
          
          <el-table-column prop="status" label="状态" align="center" width="72" :filters="[{ text: '正常', value: 0 }, { text: '锁定', value: 1 }]" :filter-method="filterStatus">
            <template slot-scope="scope">
              <span :class="scope.row.node.status===0?'success':'error'">{{scope.row.node.status|translateStatus}}</span>
              <el-button type="text" @click="refreshStatus(scope.row)"><i :class="isrefreshStatus.indexOf(scope.row.node.id) > -1?'el-icon-loading':'el-icon-refresh'" title="重新检测"></i></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述"  >
            <template slot-scope="scope">{{scope.row.node.description}}</template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" align="center" width="50">
            <template slot-scope="scope">{{scope.row.node.sort}}</template>
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
      <profileFrom :refreshMarkData="tableData" :formData="editForm.data" :ref="editForm.ref"></profileFrom>
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
import profileFrom from '~/components/resources/nodes/add-edit.vue';
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
          region_id: '',
          username: 'root',
          password: '',
          ip: '',
          port: 22,
          os_id: '',
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
      return this.$axios({url: '/nodes', params: this.query}).then(res=>{
        if (res.data.code === 0) {
          this.tableData = res.data.data;
        } else {
          throw new Error(res.data.msg);
        }
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
          this.$axios({method: 'post', url: '/nodes', data: this.addForm.data}).then(res=>{
            if (res.data.code === 0) {
              // 消息提示
              this.$notify({
                message: h('span', { class: 'dop-notification-msg'}, '节点创建成功!'),
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
              message: h('span', { class: 'dop-notification-msg'}, '节点创建失败!'),
              type: 'error'
            });
          });
        }
      });
    },
    edit: function(row) {
      this.editForm.data = row.node;
      this.editForm.visible = true;
    },
    editSubmit: function() {
      this.$refs.editForm.$refs.form.validate(async(valid) => {
        if (valid) {
          const h = this.$createElement;
          // 关闭弹窗
          this.editForm.visible = false;
          this.$axios({method: 'put', url: '/nodes/' + this.editForm.data.id, data: this.editForm.data}).then(res=>{
            if (res.data.code === 0) {
              // 消息提示
              this.$notify({
                message: h('span', { class: 'dop-notification-msg'}, '节点修改成功!'),
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
              message: h('span', { class: 'dop-notification-msg'}, '节点修改失败!'),
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
        this.$axios({method: 'delete', url: '/nodes/' + row.node.id, data: row.node}).then(res=>{
          if (res.data.code === 0) {
            // 消息提示
            this.$notify({
              message: h('span', { class: 'dop-notification-msg'}, '节点删除成功!'),
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
            message: h('span', { class: 'dop-notification-msg'}, '节点删除失败!'),
            type: 'error'
          });
        });
      });
    },
    mDel: function() {

    },
    refreshStatus: function(row) {
      this.isrefreshStatus.push(row.node.id);
      console.error('重新刷新状态', row);
      setTimeout(() => {
        this.isrefreshStatus.splice(this.isrefreshStatus.indexOf(row.node.id), 1);
      }, 2000);
      // this.isrefreshStatus.splice(this.isrefreshStatus.indexOf(row.node.id), 1);
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
