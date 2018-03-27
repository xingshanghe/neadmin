<template>
  <section>
    <el-row>
      <el-col :span="16">
        <dopMailTitle :title="'详情'"></dopMailTitle>
      </el-col>
      <el-col :span="8" class="top-buttons-list">
        <el-button type="primary" size="small"  @click="edit" icon="el-icon-edit" title="编辑">编辑</el-button>
      </el-col>
    </el-row>
  </section>
  
</template>


<script>
import _ from 'lodash';
import dopMailTitle from '~/components/dop-main-title.vue';
import { getLinkFromRoute,setParamsToLink } from '~/utils/menus.js';

export default {
  head: {
    title: '集群详情'
  },
  components: {
    dopMailTitle
  },
  data() {
    return {

    };
  },
  methods: {
    getSiblingSub() {
      // 处理当前路由，获取path,查找子菜单，生成sub格式菜单，参考console-2
      let path = this.$route.path;
      let params = this.$route.params;
      let link = getLinkFromRoute({path, params});
      let role_ids = this.$store.state.roles.join(',');

      const h = this.$createElement;
      this.$api({url: '/roles/siblingTree', data: {link: link, role_ids: role_ids}}).then(res=>{
        if (res.data.code === 0) {

          let children = res.data.data;
          let params = this.$route.params;

          children.forEach((child)=>{
            child.link = setParamsToLink({link:child.link,params:params});
          });

          let secMenuData = this.$store.state.menuMapOfRoutes['/resources/clusters'];
          let secMenuDataCopy = _.assign({}, secMenuData);

          secMenuDataCopy.subBackUrl = '/resources/clusters';
          secMenuDataCopy.subBackItem = secMenuData;
          
          secMenuDataCopy.sub = [{
            'is_group': 1,
            'is_side': 1,
            'is_sub': 1,
            'title': '集群管理',
            'children': children
          }];

          this.$eventHub.$emit('changeMenu', secMenuDataCopy);
        } else {
          throw new Error(res.data.msg);
        }
      }).catch(() => {
        // 消息提示
        this.$notify({
          // title: '用户创建失败!',
          // message: e.message,
          message: h('span', { class: 'dop-notification-msg'}, '集群列表获取失败!'),
          type: 'error'
        });
      });
    },
    changeMenu() {

    },
    edit() {

    }
  },
  mounted() {
    this.getSiblingSub();
    // this.changeMenu();
  }
};
</script>