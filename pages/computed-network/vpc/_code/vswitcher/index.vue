<template>
  <section>
    <el-row style="margin-top:-20px;">
      <el-col :span="16">
        <neMainTitle :title="'交换机列表'"/>
      </el-col>
      <el-col class="top-buttons" :span="8">
        <el-button size="small"><i class="el-icon-refresh "></i>刷新</el-button>
        <el-button type="primary"  size="small"><i class="el-icon-plus "></i>创建</el-button>
      </el-col>
    </el-row>
    <el-row  style="margin-top:5px;">
      <el-col>
        <el-table :data="tableData?tableData.content:[]" border class="console-table-list">
            <el-table-column  label="名称/code" >
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.vswitchName" placement="bottom-start">
                  <nuxt-link class="el-button el-button--text" :to="'/computed-network/vswitcher/' + scope.row.vswitchName"  :title="scope.vswitchName">{{scope.row.vswitchName,10|subString}}</nuxt-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="cidrBlock" label="网段"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="zoneUUID" label="可用区"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="del(scope.$index)"><i class="icon-cross2" title="删除"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;" class="pager" v-if="tableData&&tableData.totalElements">
      <el-col>
        <el-pagination layout="total, prev, pager, next" :total="tableData.totalElements" :current-page.sync="query.page" :page-size="tableData.size" @current-change="getVswitcherList"></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import _ from 'lodash';
import neMainTitle from '~/components/ne-main-title.vue';
export default {
  name: 'get-vswitcher-from-vpc-code',
  head: {
    title: '交换机'
  },
  components: {
    neMainTitle
  },
  middleware: 'authenticated',
  data() {
    return {
      code: this.$route.params.code,
      query: this.$route.query,
      tableData: null
    };
  },
  methods: {
    changeMenu() {
      let menudata = this.$store.getters.mapOfRoutes['/computed-network/vpc'];
      let menudataCopy = _.assign({}, menudata);

      menudataCopy.subBackItem = menudata;
      menudataCopy.subBackUrl = '/computed-network/vpc/list';
      menudataCopy.sub = [{
        'isgroup': true,
        'title': '专用网络VPC',
        'children': [
          {
            'icon': 'icon-googleplus5',
            'title': '详情',
            'link': '/computed-network/vpc/' + this.code
          },
          {
            'icon': 'icon-nat iconfont',
            'title': '路由器',
            'link': '/computed-network/vpc/' + this.code + '/vrouter'
          },
          {
            'icon': 'icon-gateway iconfont',
            'title': '交换机',
            'link': this.$route.path
          }
        ]
      }];

      this.$eventHub.$emit('changeMenu', menudataCopy);
    },
    getVswitcherList() {
      return this.$api({metadata: {name: 'console.vswitcher.getlist'}, spec: {
        'VswList.Get': {
          'UrlParams': {
            'access_token': this.$store.state.access_token,
            'search_EQ_vpcId': this.$route.params.code
          }
        }
      }}).then(res=>{
        this.tableData = res.data['VswList.Get'].data;
      });
    }
  },
  created() {
    this.getVswitcherList();
  },
  mounted() {
    this.changeMenu();
  }
};
</script>
