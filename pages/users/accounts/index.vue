<template>
  <section>
    <el-row>
      <el-col :span="16">
        <dopMailTitle :title="'帐号'"></dopMailTitle>
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
        <el-table :data="tableData?tableData.users:[]"  border class="dop-table-list" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column label="帐号">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">{{scope.row.username}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="nickname" width="80" label="昵称" ></el-table-column>
          <el-table-column prop="gender" label="性别" align="center" width="62" :filters="[{ text: '男', value: 'male' }, { text: '女', value: 'female' }]" :filter-method="filterGender">
            <template slot-scope="scope">
              {{scope.row.gender|translateGender}}
            </template>
          </el-table-column>
          <el-table-column label="资料" width="50" align="center">
            <template slot-scope="scope">
              <el-popover class="connect-popover" effect="light" placement="top" trigger="hover">
                <template>
                    <el-tag class="connect_info"><i class="icon-envelop3 connect" title="邮箱"></i>{{scope.row.email}}</el-tag>
                    <el-tag class="connect_info"><i class="icon-phone2 connect" title="电话"></i>{{scope.row.phone}}</el-tag>
                    <el-tag class="connect_info"><i class="icon-map connect" title="地址"></i>{{scope.row.address}}</el-tag>
                </template>
                <i slot="reference" class="icon-vcard connect"></i>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="50" align="center"></el-table-column>
          <el-table-column prop="birthday" label="生日" width="100" ></el-table-column>
          <el-table-column prop="status" label="状态" align="center" width="62" :filters="[{ text: '正常', value: 0 }, { text: '锁定', value: 1 }]" :filter-method="filterStatus">
            <template slot-scope="scope">
              <span :class="scope.row.status===0?'success':'error'">{{scope.row.status|translateStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" wi d  align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="selectRoles(scope.row)"><i class="icon-eye-plus" title="分配角色"></i></el-button>
              <el-button type="text" @click="resetPwd(scope.row)"><i class="icon-hammer" title="重置密码"></i></el-button>
              <el-button type="text" @click="edit(scope.row)"><i class="el-icon-edit" title="编辑"></i></el-button>
              <el-button type="text" @click="del(scope.row)"><i class="el-icon-delete" title="删除"></i></el-button>
              <el-button v-if="scope.row.status===0" type="text" @click="editStatus(scope.row)"><i class="icon-lock4" title="锁定"></i></el-button>
              <el-button v-else type="text" @click="editStatus(scope.row)"><i class="icon-unlocked" title="解锁"></i></el-button>
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
    <el-dialog  class="dop-dialog dop-dialog-table" title="角色分配" :visible.sync="roleForm.visible" :close-on-click-modal="true">
      <rolesTable :user="roleForm.user" @rolesSelected="rolesSelected" @rolesNeedClean="rolesNeedClean" ></rolesTable>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="roleForm.visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="selectRolesSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import dopMailTitle from '~/components/dop-main-title.vue';
import profileFrom from '~/components/users/accounts/add-edit.vue';
import rolesTable from '~/components/users/accounts/role.vue';
export default {
  head: {
    title: '账号管理'
  },
  middleware: 'authenticated',
  components: {
    profileFrom,
    rolesTable,
    dopMailTitle
  },
  data() {
    return {
      tableData: null,
      mSelection: [],
      rolesMSelection: [],
      rolesMCleaned: [],
      addForm: {
        ref: 'addForm',
        visible: false,
        data: {
          username: null,
          nickname: null,
          gender: 'male',
          phone: null,
          age: 18,
          birthday: null,
          email: null,
          address: null
        }
      },
      editForm: {
        ref: 'editForm',
        visible: false,
        data: null
      },
      roleForm: {
        visible: false,
        user: null
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
      return this.$api({url: '/users', data: this.query}).then(res=>{
        if (res.data.code === 0) {
          this.tableData = res.data.data;
        } else {
          throw new Error(res.data.msg);
        }
      });
    },
    filterGender(value, row) {
      return row.gender === value;
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
          this.$api({url: '/users/add', data: this.addForm.data}).then(res=>{
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
          this.$api({url: '/users/edit', data: this.editForm.data}).then(res=>{
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
        this.$api({url: '/users/delete', data: row}).then(res=>{
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
    resetPwd(row) {
      this.$confirm('确认要重置密码吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const h = this.$createElement;
        this.$api({url: '/users/resetPwd', data: row}).then(res=>{
          if (res.data.code === 0) {
            // 消息提示
            this.$notify({
              message: h('span', { class: 'dop-notification-msg'}, '用户重置密码成功!'),
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
            message: h('span', { class: 'dop-notification-msg'}, '用户重置密码失败!'),
            type: 'error'
          });
        });
      });
    },
    editStatus(row) {
      var sAction = row.status === 0 ? '锁定' : '解锁';
      this.$confirm('确认要' + sAction + '该用户吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const h = this.$createElement;
        this.$api({url: '/users/toggleStatus', data: row}).then(res=>{
          if (res.data.code === 0) {
            // 消息提示
            this.$notify({
              message: h('span', { class: 'dop-notification-msg'}, '用户' + sAction + '成功!'),
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
            message: h('span', { class: 'dop-notification-msg'}, '用户' + sAction + '失败!'),
            type: 'error'
          });
        });
      });
    },
    selectRoles(row) {
      this.roleForm.visible = true;
      this.roleForm.user = row;
    },
    selectRolesSubmit() {
      // 循环选中角色，对该用户进行分配
      const h = this.$createElement;

      // 组装参数
      var roles = [];
      var users = [];
      var cleans = [];
      if (this.rolesMSelection.length > 0) {
        for (let i in this.rolesMSelection) {
          roles.push(this.rolesMSelection[i].id);
        }
      }
      users.push(this.roleForm.user.id);
      if (this.rolesMCleaned.length > 0) {
        for (let i in this.rolesMCleaned) {
          cleans.push(this.rolesMCleaned[i].id);
        }
      }

      this.$api({url: '/users/setRoles', data: {roles: roles.join(','), users: users.join(','), cleans: cleans.join(',')}}).then(res=>{
        if (res.data.code === 0) {
          // 消息提示
          this.$notify({
            message: h('span', { class: 'dop-notification-msg'}, '用户分配角色成功!'),
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
          message: h('span', { class: 'dop-notification-msg'}, '用户分配角色失败!'),
          type: 'error'
        });
      });

    },
    rolesSelected(roles) {
      this.rolesMSelection = roles;
    },
    rolesNeedClean(roles) {
      this.rolesMCleaned = roles;
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
