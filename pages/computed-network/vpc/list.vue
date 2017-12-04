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

// import api from '~/api/index.js';
// api({metadata: {name: 'xxx'}, spec: {
//   'EcsList.Get': {
//     'UrlParams': {
//       'access_token': 'd92743fa-9b57-487c-811f-7ae9baca4990'
//     }
//   }
// }}).then(data=>{
//   console.error(data);
// });

export default {
  head: {
    title: '专有网络'
  },
  middleware: 'authenticated',
  components: {
    listTitlePills
  },
  mounted() {
    this.api({metadata: {name: 'tttt'}, spec: {
      'EcsList.Get': {
        'UrlParams': {
          'access_token': 'd92743fa-9b57-487c-811f-7ae9baca4990'
        }
      }
    }}).then(data =>{
      console.error(data);
    });
  }
};
</script>