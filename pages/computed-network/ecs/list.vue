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
    <el-row style="margin-top:10px;">
      <el-col>
        <!-- 列表 -->
          <el-table :data="tableData.content"  border class="console-table-list" >
            <el-table-column label="名称">
              <template slot-scope="scope">
                <nuxt-link class="el-button el-button--text" :to="'/computed-network/ecs/' + scope.row.instanceId"  :title="scope.description">{{scope.row.instanceName}}</nuxt-link>
              </template>
            </el-table-column>
            <el-table-column prop="privateIpaddress" label="IP地址" ></el-table-column>
            <el-table-column label="状态" >
              <template slot-scope="scope"> 
                <span :class="'status-' + scope.row.status">{{scope.row.status|toStatusText}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="instanceType" label="配置" ></el-table-column>
            <el-table-column prop="regionId" label="部署区位" ></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="start(scope.row)" ><i title="启动" class="icon-play4"></i></el-button>
                <el-button type="text" @click="stop(scope.row)"><i title="关机" class="icon-switch2"></i></el-button>
                <el-button type="text" @click="reboot(scope.row)"><i title="重启" class="icon-spinner11"></i></el-button>
                <el-button type="text" @click="del(scope.row)"><i class="icon-cross2" title="删除"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;" class="pager">
      <el-col>
        <el-pagination layout="total, prev, pager, next" :total="tableData.totalElements" :current-page.sync="query.page" :page-size="tableData.size" @current-change="getEcsList"></el-pagination>
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
    title: '实例列表'
  },
  middleware: 'authenticated',
  components: {
    listTitlePills
  },
  data() {
    return {
      tableData: {},
      query: this.$route.query
    };
  },
  methods: {
    getEcsList() {
      return this.api({metadata: {name: 'console.ecs.getlist'}, spec: {
        'EcsList.Get': {
          'UrlParams': {
            'access_token': consts.TOKEN,
            'page': this.query.page ? this.query.page - 1 : 1 - 1
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
  }
};
</script>