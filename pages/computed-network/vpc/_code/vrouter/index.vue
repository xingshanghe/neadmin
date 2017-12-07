<template>
  <section>
    <el-row style="margin-top:-20px;">
      <el-col :span="16">
        <neMainTitle :title="'路由器'"/>
      </el-col>
      <el-col class="top-buttons" :span="8">
        <el-button v-if="!vRouteData" type="primary"  size="small"><i class="el-icon-plus "></i>创建路由器</el-button>
        <el-button v-if="vRouteData" type="primary"  size="small"><i class="el-icon-edit "></i>编辑</el-button>
        <el-button v-if="vRouteData" type="primary"  size="small"><i class="el-icon-plus "></i>增加路由器条目</el-button>
      </el-col>
    </el-row>
    <el-row v-if="vRouteData" style="margin-top:5px;">
      <el-col>
        <el-card class="ne-card" style="margin-bottom:20px;">
          <div slot="header"  class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row :gutter="5">
            <el-col :span="8" class="info-item"><span>名称: </span>{{vRouteData.vrouterName}}</el-col>
            <el-tooltip  effect="dark" :content="vRouteData.vrouterId" placement="right"><el-col :span="8" class="info-item"><span>code: </span>{{(vRouteData.vrouterId),20|subString}}</el-col></el-tooltip>
            <el-col :span="8" class="info-item"><span>状态: </span><span :class="'status-'+vRouteData.status">{{vRouteData.status|toStatusText}}</span></el-col>
            <el-col :span="8" class="info-item"><span>创建时间: </span>{{vRouteData.createTime}}</el-col>
            <el-col :span="8" class="info-item"><span>备注: </span>{{vRouteData.description}}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row v-if="vRouteData">
      <el-col>
        <neMainTitle :title="'路由器条目'"/>
      </el-col>
    </el-row>

    <el-row v-if="vRouteData" style="margin-top:5px;">
      <el-col>
        <el-table :data="routeEntryList" border class="console-table-list" >
            <el-table-column  label="路由表code" >
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.routeTableId" placement="bottom-start">
                  <nuxt-link class="el-button el-button--text" :to="'/computed-network/vrouter/' + scope.row.routeTableId"  :title="scope.description">{{scope.row.routeTableId,10|subString}}</nuxt-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
              <template slot-scope="scope"> 
                <span  :class="'status-' + scope.row.status"> {{scope.row.status|toStatusText}} </span>
              </template>
            </el-table-column>
            <el-table-column prop="destinationCidrBlock" label="目标网段"></el-table-column>
            <el-table-column prop="next" label="下一跳"></el-table-column>
            <el-table-column prop="nextHopType" label="下一跳类型"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="delEntry(scope.$index)"><i class="icon-cross2" title="删除"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import _ from 'lodash';
import neMainTitle from '~/components/ne-main-title.vue';
import consts from '~/utils/consts.js';
export default {
  name: 'get-vrouter-from-vpc-code',
  head: {
    title: '路由器'
  },
  components: {
    neMainTitle
  },
  middleware: 'authenticated',
  data() {
    return {
      code: this.$route.params.code,
      vpcData: null,
      vRouteData: null,
      routeTableData: null,
      routeEntryList: null
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
            'link': this.$route.path
          },
          {
            'icon': 'icon-gateway iconfont',
            'title': '交换机',
            'link': '/computed-network/vpc/' + this.code + '/vswitcher'
          }
        ]
      }];

      this.$eventHub.$emit('changeMenu', menudataCopy);
    },
    getVRouterWholeInfo() {
      return this.$api({metadata: {name: 'console.vrouter.whole.get'}, spec: {
        'Vpc.Get': {
          'UrlParams': {
            'access_token': consts.TOKEN
          },
          'BasicInfos': {
            'ResourceId': this.code
          }
        },
        'VRouteList.Get': {
          'UrlParams': {
            'access_token': consts.TOKEN,
            'search_EQ_vpcId': this.code
          }
        },
        'RouteEntryList.Get': {
          'UrlParams': {
            'access_token': consts.TOKEN,
            'search_EQ_vpcId': this.code
          }
        },
        'RouteTableList.Get': {
          'UrlParams': {
            'access_token': consts.TOKEN,
            'search_EQ_vpcId': this.code
          }
        }
      }}).then(res=>{
        this.vpcData = res.data['Vpc.Get'].data;
        if (res.data['VRouteList.Get'].data.content.length > 0) {
          this.vRouteData = res.data['VRouteList.Get'].data.content[0];
        }
        if (res.data['RouteTableList.Get'].data.content.length > 0) {
          this.routeTableData = res.data['RouteTableList.Get'].data.content[0];
        }
        this.routeEntryList = res.data['RouteEntryList.Get'].data.content;
      });
    }
  },
  created() {
    this.getVRouterWholeInfo();
  },
  mounted() {
    this.changeMenu();
  }
};
</script>
