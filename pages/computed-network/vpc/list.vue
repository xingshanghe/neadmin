<template>
  <section>
    <el-row>
      <el-col :span="16">
        <listTitlePills  />
      </el-col>
      <el-col class="top-buttons-list" :span="8">
        <el-button size="small"><i class="el-icon-refresh "></i>刷新</el-button>
        <el-button type="primary"  size="small"><i class="el-icon-plus "></i>新增</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col>
        <!-- 列表 -->
          <el-table :data="tableData?tableData.content:[]"  border  class="console-table-list">
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.vpcName" placement="right">
                  <nuxt-link class="el-button el-button--text" :to="'/computed-network/vpc/' + scope.row.vpcId"  >{{scope.row.vpcName,10|subString}}</nuxt-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="regionId" label="区位"></el-table-column>
            <el-table-column prop="cidrBlock" label="网段" ></el-table-column>
            <el-table-column label="状态" >
              <template slot-scope="scope"> 
                <span :class="'status-' + scope.row.status">{{scope.row.status|toStatusText}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="platformId" label="默认网络" ></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button type="text" @click="del(scope.$index)"><i class="icon-cross2" title="删除"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <el-row v-if="tableData" style="margin-top:10px;" class="pager">
      <el-col>
        <el-pagination layout="total, prev, pager, next" :total="tableData.totalElements" :current-page.sync="query.page" :page-size="tableData.size" @current-change="getVpcList"></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import listTitlePills from '~/components/console/list-title-pills.vue';
// import api from '~/api';

export default {
  head: {
    title: '专用网络'
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
    getVpcList() {
      return this.$api({metadata: {name: 'console.vpc.getlist'}, spec: {
        'VpcList.Get': {
          'UrlParams': {
            'access_token': this.$store.state.access_token,
            'page': this.query.page ? this.query.page - 1 : 1 - 1
          }
        }
      }}).then(res=>{
        this.tableData = res.data['VpcList.Get'].data;
      });
    }
  },
  asyncData() {
    // return api({metadata: {name: 'console.vpc.getlist'}, spec: {
    //   'VpcList.Get': {
    //     'UrlParams': {
    //       'access_token': this.$store.state.access_token
    //     }
    //   }
    // }}).then(res=>{
    //   // TODO 后台异常处理能力不足
    //   return {
    //     tableData: res.data['VpcList.Get'].data
    //   };
    // });
  },
  mounted() {
    this.getVpcList();
  }
};
</script>