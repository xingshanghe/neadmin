<template>
  <div>
    <el-table :data="tableData?tableData.roles:[]" ref="multipleRoleTable" border class="dop-table-list" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="code" label="编码" ></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="62" :filters="[{ text: '正常', value: 0 }, { text: '锁定', value: 1 }]" :filter-method="filterStatus">
        <template slot-scope="scope">
          <span :class="scope.row.status===0?'success':'error'">{{scope.row.status|translateStatus}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="tableData" style="margin-top:10px;" class="pager" >
      <el-col>
        <el-pagination layout="total, prev, pager, next" :total="tableData.total"  :current-page.sync="tableData.page_no" :page-size="tableData.page_size" @current-change="getTableData"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'users-accounts-role',
  props: {
    user: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      tableData: null,
      mSelection: [],
      query: this.$route.query,
      selecedRoleIds: []
    };
  },
  methods: {
    handleSelectionChange(rows) {
      this.mSelection = rows;
      this.$emit('rolesSelected', rows);
    },
    getTableData() {
      this.query.page = this.tableData ? this.tableData.page_no : this.query.page ? this.query.page : 1;
      return this.$axios({url: '/roles', params: this.query}).then(res=>{
        if (res.data.code === 0) {
          this.tableData = res.data.data;
          this.seleced();
        } else {
          throw new Error(res.data.msg);
        }
      });
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    seleced() {
      // 选中状态
      return this.$api({url: '/rules/g', data: {v0: this.user.id}}).then(res=>{
        var selecedRoleIds = [];
        if (res.data.code === 0) {
          if (res.data.data.length > 0) {
            for (let id in res.data.data) {
              selecedRoleIds.push(res.data.data[id].v1);
            }
          }
          this.selecedRoleIds = selecedRoleIds;
        } else {
          throw new Error(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  },
  watch: {
    user: {
      handler() {
        // 重置查询条件
        this.tableData = null;
        this.query.page = 1;
        this.getTableData();
      },
      deep: true
    },
    selecedRoleIds: {
      handler(newValue) {
        if (this.tableData.roles.length > 0) {
          this.tableData.roles.forEach(r => {
            newValue.forEach(id=>{
              if (id === r.id) {
                this.$refs.multipleRoleTable.toggleRowSelection(r, true);
              }
            });
          });
        }
      },
      deep: true
    },
    tableData: {
      handler(newValue) {
        if (newValue) {
          this.$emit('rolesNeedClean', newValue.roles);
        }
      },
      deep: true
    }
  }
};
</script>