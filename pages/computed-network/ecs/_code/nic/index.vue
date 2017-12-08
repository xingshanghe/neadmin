<template>
  <section>
    <el-row style="margin-top:-20px;">
      <el-col :span="16">
        <neMainTitle :title="'网卡列表'"/>
      </el-col>
      <el-col class="top-buttons" :span="8">
        <el-button size="small"><i class="el-icon-refresh "></i>刷新</el-button>
        <el-button type="primary"  size="small"><i class="el-icon-plus "></i>创建</el-button>
      </el-col>
    </el-row>
    <el-row  style="margin-top:5px;">
      <el-col>
        <el-table :data="tableData?tableData.content:[]"  border class="console-table-list">
          <el-table-column label="名称/code">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.vswitchName" placement="bottom-start">
                <nuxt-link class="el-button el-button--text" :to="'/computed-network/disk/' + scope.row.diskName"  >{{scope.row.diskName,10|subString}}</nuxt-link>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="IP地址" ></el-table-column>
          <el-table-column prop="status" label="状态" ></el-table-column>
          <el-table-column label="专有网络" ></el-table-column>
          <el-table-column  label="交换机" ></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" ><i class="icon-cross2" title="删除"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;" class="pager" v-if="tableData">
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
  name: 'get-nic-from-ecs-code',
  head: {
    title: '网卡'
  },
  components: {
    neMainTitle
  },
  middleware: 'authenticated',
  data() {
    return {
      code: this.$route.params.code,
      query: this.$route.query,
      tableData: null,
      ecsData: null
    };
  },
  methods: {
    changeMenu() {
      let menudata = this.$store.getters.mapOfRoutes['/computed-network/ecs'];
      let menudataCopy = _.assign({}, menudata);

      menudataCopy.subBackItem = menudata;
      menudataCopy.subBackUrl = '/computed-network/ecs/list';
      menudataCopy.sub = [{
        'isgroup': true,
        'title': '云服务器ECS详情',
        'children': [
          {
            'icon': 'icon-googleplus5',
            'title': '详情',
            'link': '/computed-network/ecs/' + this.code
          },
          {
            'icon': 'icon-cipan iconfont',
            'title': '磁盘',
            'link': '/computed-network/ecs/' + this.code + '/disks'
          },
          {
            'icon': 'icon-gateway iconfont',
            'title': '网卡',
            'link': this.$route.path
          },
          {
            'icon': 'icon-jingxiangcangku iconfont',
            'title': '快照',
            'link': '/computed-network/ecs/' + this.code + '/snapshot-image'
          },
          {
            'icon': 'icon-anquan iconfont',
            'title': '网络与安全',
            'link': '/computed-network/ecs/' + this.code + '/network-safety'
          }
        ]
      }];

      this.$eventHub.$emit('changeMenu', menudataCopy);
    },
    getDiskListAndEcsData() {
      return this.$api({metadata: {name: 'console.disk.ecs.getlist'}, spec: {
        'DiskList.Get': {
          'UrlParams': {
            'access_token': this.$store.state.access_token,
            'search_EQ_resourceId': this.code,
            'page': this.query.page ? this.query.page - 1 : 1 - 1
          }
        },
        'Ecs.Get': {
          'UrlParams': {
            'access_token': this.$store.state.access_token
          },
          'BasicInfos': {
            'ResourceId': this.code
          }
        }
      }}).then(res=>{
        this.tableData = res.data['DiskList.Get'].data;
        this.ecsData = res.data['Ecs.Get'].data;
      });
    }
  },
  created() {
    // this.getDiskListAndEcsData();
  },
  mounted() {
    this.changeMenu();
  }
};
</script>
