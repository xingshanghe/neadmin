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
          <el-table :data="tableData?tableData.content:[]"  border class="console-table-list">
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.caCertificateName" placement="right">
                  <nuxt-link class="el-button el-button--text" :to="'/computed-network/slb/' + scope.row.caCertificateId+'/listenner'"  >{{scope.row.caCertificateName,10|subString}}</nuxt-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column  label="证书ID" >
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.caCertificateId" placement="right">
                  <nuxt-link class="el-button el-button--text" :to="'/computed-network/slb/' + scope.row.caCertificateId+'/listenner'" >{{scope.row.caCertificateId,10|subString}}</nuxt-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="caCertificateUUID" label="证书指纹" >
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.fingerprint" placement="right">
                  <span>{{scope.row.fingerprint,10|subString}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="regionId" label="地域"></el-table-column>
            <el-table-column label="状态" >
              <template slot-scope="scope"> 
                <span :class="'status-' + scope.row.status">{{scope.row.status|toStatusText}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="loadBalancerSpec" label="证书类型"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="del(scope.$index)"><i class="icon-cross2" title="删除"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <el-row v-if="tableData" style="margin-top:10px;" class="pager">
      <el-col>
        <el-pagination layout="total, prev, pager, next" :total="tableData.totalElements" :current-page.sync="query.page" :page-size="tableData.size" @current-change="getSlbList"></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import listTitlePills from '~/components/console/list-title-pills.vue';
// import api from '~/api';

export default {
  head: {
    title: '证书管理'
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
    getSlbList() {
      return this.$api({metadata: {name: 'console.slb.getlist'}, spec: {
        'SLBCACertList.Get': {
          'UrlParams': {
            'access_token': this.$store.state.access_token,
            'page': this.query.page ? this.query.page - 1 : 1 - 1
          }
        }
      }}).then(res=>{
        this.tableData = res.data['SLBCACertList.Get'].data;
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
  created() {
    this.getSlbList();
  },
  mounted() {

  }
};
</script>