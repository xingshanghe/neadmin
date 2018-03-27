<template>
  <section>
    <el-row>
      <el-col :span="16">
        <dopMailTitle :title="'角色'"></dopMailTitle>
      </el-col>
      <el-col :span="8" class="top-buttons-list">
        <!--
        <el-button size="small" @click="getTableData"><i class="el-icon-refresh "></i>刷新</el-button>
        <el-button type="primary" @click="add" size="small"><i class="el-icon-plus "></i>新增</el-button>
        -->
        <el-button-group>
          <el-button type="primary" size="small" @click="mDel" :disabled="!(mSelection.length > 0)" icon="el-icon-delete" title="删除">删除</el-button>
          <el-button type="primary" size="small"  @click="add" icon="el-icon-plus" title="新增">新增</el-button>
          <el-button type="primary" size="small" @click="getTableData" icon="el-icon-refresh" title="刷新">刷新</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col>
        <el-table :data="tableData?tableData.roles:[]"  border class="dop-table-list" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="编码" ></el-table-column>
          <el-table-column prop="status" label="状态" align="center" width="62" :filters="[{ text: '正常', value: 0 }, { text: '锁定', value: 1 }]" :filter-method="filterStatus">
            <template slot-scope="scope">
              <span :class="scope.row.status===0?'success':'error'">{{scope.row.status|translateStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="selectUsers(scope.row)"><i class="icon-users4" title="分配用户"></i>分配用户</el-button>
              <el-button type="text" @click="selectPolicy(scope.row)"><i class="icon-accessibility" title="分配菜单"></i>分配菜单</el-button>
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
      <profileFrom :formData="editForm.data" :ref="editForm.ref"></profileFrom>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="editForm.visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog  class="dop-dialog" title="新增" :visible.sync="addForm.visible" :close-on-click-modal="false">
      <profileFrom class="dop-form-box" :formData="addForm.data" :isAdd="true" :ref="addForm.ref"></profileFrom>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addForm.visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog  class="dop-dialog dop-dialog-table" title="用户分配" :visible.sync="userForm.visible" :close-on-click-modal="true">
      <usersTable :role="userForm.role" @usersSelected="usersSelected" @usersNeedClean="usersNeedClean"></usersTable>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="userForm.visible = false">取 消</el-button>
        <el-button size="small"  type="primary" @click="selectUsersSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog  class="dop-dialog dop-dialog-table" title="菜单权限分配" :visible.sync="policyForm.visible" :close-on-click-modal="true">
      <menusTree :role="policyForm.role" @menusChecked="menusChecked"></menusTree>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="policyForm.visible = false">取 消</el-button>
        <el-button size="small"  type="primary" @click="selectPolicysSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import dopMailTitle from '~/components/dop-main-title.vue';
import profileFrom from '~/components/users/roles/add-edit.vue';
import usersTable from '~/components/users/roles/user.vue';
import menusTree from '~/components/users/roles/menus-tree.vue';
export default {
  head: {
    title: '角色管理'
  },
  middleware: 'authenticated',
  components: {
    profileFrom,
    usersTable,
    menusTree,
    dopMailTitle
  },
  data() {
    return {
      tableData: null,
      mSelection: [],
      usersMSelection: [],
      usersMCleaned: [],
      menusCheckedIds: [],
      addForm: {
        ref: 'addForm',
        visible: false,
        data: {
          name: null,
          code: null,
          status: 0,
          description: ''
        }
      },
      editForm: {
        ref: 'editForm',
        visible: false,
        data: null,
        rules: this.rules
      },
      userForm: {
        visible: false,
        role: null
      },
      policyForm: {
        visible: false,
        role: null
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
      return this.$api({url: '/roles', data: this.query}).then(res=>{
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
    add() {
      this.addForm.visible = true;
    },
    addSubmit() {
      this.$refs.addForm.$refs.form.validate(async(valid) => {
        if (valid) {
          const h = this.$createElement;
          // 关闭弹窗
          this.addForm.visible = false;
          this.$api({url: '/roles/add', data: this.addForm.data}).then(res=>{
            if (res.data.code === 0) {
              // 消息提示
              this.$notify({
                message: h('span', { class: 'dop-notification-msg'}, '用户创建成功!'),
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
              message: h('span', { class: 'dop-notification-msg'}, '用户创建失败!'),
              type: 'error'
            });
          });
        }
      });
    },
    edit(row) {
      this.editForm.data = row;
      this.editForm.visible = true;
    },
    editSubmit() {
      this.$refs.editForm.$refs.form.validate(async(valid) => {
        if (valid) {
          const h = this.$createElement;
          // 关闭弹窗
          this.editForm.visible = false;
          this.$api({url: '/roles/edit', data: this.editForm.data}).then(res=>{
            if (res.data.code === 0) {
              // 消息提示
              this.$notify({
                message: h('span', { class: 'dop-notification-msg'}, '用户修改成功!'),
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
              message: h('span', { class: 'dop-notification-msg'}, '用户修改失败!'),
              type: 'error'
            });
          });
        }
      });
    },
    mEdit() {
      console.error(this.mSelection);
    },
    del(row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const h = this.$createElement;
        this.$api({url: '/roles/delete', data: row}).then(res=>{
          if (res.data.code === 0) {
            // 消息提示
            this.$notify({
              message: h('span', { class: 'dop-notification-msg'}, '用户删除成功!'),
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
            message: h('span', { class: 'dop-notification-msg'}, '用户删除失败!'),
            type: 'error'
          });
        });
      });
    },
    mDel() {
      console.error(this.mSelection);
    },
    selectUsers(row) {
      this.userForm.visible = true;
      this.userForm.role = row;
    },
    selectUsersSubmit() {
      // 循环选中用户，对该角色进行分配
      const h = this.$createElement;

      // 组装参数
      var roles = [];
      var users = [];
      var cleans = [];

      if (this.usersMSelection.length > 0) {
        for (let i in this.usersMSelection) {
          users.push(this.usersMSelection[i].id);
        }
      }
      roles.push(this.userForm.role.id);

      if (this.usersMCleaned.length > 0) {
        for (let i in this.usersMCleaned) {
          cleans.push(this.usersMCleaned[i].id);
        }
      }

      this.$api({url: '/roles/setUsers', data: {roles: roles.join(','), users: users.join(','), cleans: cleans.join(',')}}).then(res=>{
        if (res.data.code === 0) {
          // 消息提示
          this.$notify({
            message: h('span', { class: 'dop-notification-msg'}, '角色分配用户成功!'),
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
          message: h('span', { class: 'dop-notification-msg'}, '角色分配用户失败!'),
          type: 'error'
        });
      });

    },
    usersSelected(users) {
      this.usersMSelection = users;
    },
    usersNeedClean(users) {
      this.usersMCleaned = users;
    },
    menusChecked(ids) {
      this.menusCheckedIds = ids;
    },
    selectPolicy(row) {
      this.policyForm.role = row;
      this.policyForm.visible = true;
    },
    selectPolicysSubmit() {
      // 组装参数
      var roles = [];
      roles.push(this.policyForm.role.id);

      const h = this.$createElement;
      this.$api({url: '/roles/setMenus', data: {roles: roles.join(','), menus: this.menusCheckedIds.join(',')}}).then(res=>{
        if (res.data.code === 0) {
          // 消息提示
          this.$notify({
            message: h('span', { class: 'dop-notification-msg'}, '菜单权限分配成功!'),
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
          message: h('span', { class: 'dop-notification-msg'}, '菜单权限分配失败!'),
          type: 'error'
        });
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scope >
.el-popover--plain{
  padding:12px;
}
</style>
