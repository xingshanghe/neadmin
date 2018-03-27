<template>
  <section>
    <el-row>
      <el-col :span="16">
        <dopMailTitle :title="'菜单'"></dopMailTitle>
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
        <el-table :data="tableData?tableData.menus:[]"  border class="dop-table-list" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">{{scope.row.title,10|subString}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="上一级">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.parent_name" effect="dark" :content="'id:'+scope.row.parent_id" placement="bottom-start">
                <span class="warning">{{scope.row.parent_name}}</span>
              </el-tooltip>
              <template v-else>-</template>
            </template>
          </el-table-column>
          <el-table-column label="图标" align="center" width="50">
            <template slot-scope="scope">
              <i :class="scope.row.icon"></i>
            </template>
          </el-table-column>
          <el-table-column label="链接地址">
            <template v-if="scope.row.link" slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.link" placement="bottom-start">
                <span class="cell">{{scope.row.link,15|subString}}</span>
              </el-tooltip>
              <el-button type="text" @click="$router.push(scope.row.link)"><i class="icon-redo2"></i></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="is_group" label="分组" align="center" width="62" :filters="[{ text: '否', value: 0 }, { text: '是', value: 1 }]" :filter-method="filterGroup">
            <template slot-scope="scope">
              <span :class="scope.row.is_group===1?'success':''">{{scope.row.is_group|translateYesOrNo}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="is_sub" label="下级" align="center" width="62" :filters="[{ text: '否', value: 0 }, { text: '是', value: 1 }]" :filter-method="filterSub">
            <template slot-scope="scope">
              <span :class="scope.row.is_sub===1?'success':''">{{scope.row.is_sub|translateYesOrNo}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="is_side" label="侧边" align="center" width="62" :filters="[{ text: '否', value: 0 }, { text: '是', value: 1 }]" :filter-method="filterSide">
            <template slot-scope="scope">
              <span :class="scope.row.is_side===1?'success':''">{{scope.row.is_side|translateYesOrNo}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center" width="62" :filters="[{ text: '正常', value: 0 }, { text: '锁定', value: 1 }]" :filter-method="filterStatus">
            <template slot-scope="scope">
              <span :class="scope.row.status===0?'success':'error'">{{scope.row.status|translateStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" align="center" width="50"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
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
import profileFrom from '~/components/system/menus/add-edit.vue';
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
      addForm: {
        ref: 'addForm',
        visible: false,
        data: {
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
      return this.$axios({url: '/menus', params: this.query}).then(res=>{
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
          this.$axios({method: 'post', url: '/menus', data: this.addForm.data}).then(res=>{
            if (res.data.code === 0) {
              // 消息提示
              this.$notify({
                message: h('span', { class: 'dop-notification-msg'}, '菜单创建成功!'),
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
              message: h('span', { class: 'dop-notification-msg'}, '菜单创建失败!'),
              type: 'error'
            });
          });
        }
      });
    },
    edit: function(row) {
      this.editForm.data = row;
      this.editForm.visible = true;
    },
    editSubmit: function() {
      this.$refs.editForm.$refs.form.validate(async(valid) => {
        if (valid) {
          const h = this.$createElement;
          // 关闭弹窗
          this.editForm.visible = false;
          this.$axios({method: 'put', url: '/menus/' + this.editForm.data.id, data: this.editForm.data}).then(res=>{
            if (res.data.code === 0) {
              // 消息提示
              this.$notify({
                message: h('span', { class: 'dop-notification-msg'}, '菜单修改成功!'),
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
              message: h('span', { class: 'dop-notification-msg'}, '菜单修改失败!'),
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
        this.$axios({method: 'delete', url: '/menus/' + row.id }).then(res=>{
          if (res.data.code === 0) {
            // 消息提示
            this.$notify({
              message: h('span', { class: 'dop-notification-msg'}, '菜单删除成功!'),
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
            message: h('span', { class: 'dop-notification-msg'}, '菜单删除失败!'),
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

