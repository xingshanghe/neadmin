<template>
  <el-tree ref="menusTree" @check-change="handleCheckChange" :data="treeData" show-checkbox check-strictly node-key="id" default-expand-all  :default-checked-keys="checkedKeys" :props="defaultProps" />
</template>

<script>
  export default {
    name: 'users-roles-menus-tree',
    props: {
      role: {
        type: Object,
        default: function() {
          return {};
        }
      },
      selecedNodes: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    data() {
      return {
        treeData: [],
        checkedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      };
    },
    methods: {
      handleCheckChange: function() {
        this.checkedKeys = this.$refs.menusTree.getCheckedKeys();
        this.$emit('menusChecked', this.checkedKeys);
      },
      getTreeData: function() {
        return this.$axios({url: '/menus/tree', data: {}}).then(res=>{
          if (res.data.code === 0) {
            this.treeData = res.data.data;

            this.seleced();
          } else {
            throw new Error(res.data.msg);
          }
        });
      },
      seleced() {
      // 选中状态
        return this.$api({url: '/rules/p', data: {v0: this.role.id}}).then(res=>{
          var checkedKeys = [];
          if (res.data.code === 0) {
            if (res.data.data.length > 0) {
              for (let id in res.data.data) {
                checkedKeys.push(res.data.data[id].v1);
              }
            }
            this.checkedKeys = checkedKeys;
            this.$refs.menusTree.setCheckedKeys(this.checkedKeys);
          } else {
            throw new Error(res.data.msg);
          }
        });
      }
    },
    mounted() {
      this.getTreeData();
    },
    watch: {
      role: {
        handler() {
          // 重置查询条件
          this.getTreeData();
        },
        deep: true
      }
    }
  };
</script>