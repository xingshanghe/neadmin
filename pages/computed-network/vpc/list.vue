<template>
  <section>
    <el-row>
      <el-col :span="16">
        <listTitlePills  />
      </el-col>
      <el-col class="top-buttons" :span="8">
        <el-button size="small"><i class="el-icon-refresh "></i>刷新</el-button>
        <el-button type="primary"  size="small"><i class="el-icon-plus "></i>新增</el-button>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import listTitlePills from '~/components/console/list-title-pills.vue';
import consts from '~/utils/consts.js';
// import api from '~/api';

export default {
  head: {
    title: '专有网络'
  },
  middleware: 'authenticated',
  components: {
    listTitlePills
  },
  data() {
    return {
      tableData: null,
      query: this.$route.query
    };
  },
  methods: {
    getEcsList() {
      return this.api({metadata: {name: 'console.ecs.getlist'}, spec: {
        'EcsList.Get': {
          'UrlParams': {
            'access_token': consts.TOKEN
          }
        }
      }}).then(res=>{
        this.tableData = res.data['EcsList.Get'].data;
      });
    }
  },
  asyncData() {
    // return api({metadata: {name: 'console.ecs.getlist'}, spec: {
    //   'EcsList.Get': {
    //     'UrlParams': {
    //       'access_token': consts.TOKEN
    //     }
    //   }
    // }}).then(res=>{
    //   // TODO 后台异常处理能力不足
    //   return {
    //     tableData: res.data['EcsList.Get'].data
    //   };
    // });
  },
  mounted() {
    this.getEcsList();
    console.log(this.tableData);
  }
};
</script>