<template>
  <section>
    <el-row style="margin-top:-20px;">
      <el-col :span="16">
        <neMainTitle :title="'专用网络VPC详情'"/>
      </el-col>
      <el-col class="top-buttons-list" :span="8">
        <el-button type="primary"  size="small"><i class="el-icon-edit "></i>编辑</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:5px;" v-if="vpcData">
      <el-col>
        <el-card class="ne-card" style="margin-bottom:20px;">
          <div slot="header"  class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row :gutter="5">
            <el-col :span="8" class="info-item"><span>名称: </span>{{vpcData.vpcName}}</el-col>
            <el-tooltip  effect="dark" :content="code" placement="right"><el-col :span="8" class="info-item"><span>code: </span>{{code,20|subString}}</el-col></el-tooltip>
            <el-col :span="8" class="info-item"><span>状态: </span><span :class="'status-'+vpcData.status">{{vpcData.status|toStatusText}}</span></el-col>
            <el-col :span="8" class="info-item"><span>地域: </span>{{vpcData.regionId}}</el-col>
            <el-col :span="8" class="info-item"><span>网段: </span>{{vpcData.cidrBlock}}</el-col>
            <el-col :span="8" class="info-item"><span>创建时间: </span>{{vpcData.createTime}}</el-col>
            <el-col :span="8" class="info-item"><span>备注: </span>{{vpcData.description}}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import _ from 'lodash';
import neMainTitle from '~/components/ne-main-title.vue';
import consts from '~/utils/consts.js';

export default {
  head: {
    title: 'vpc详情'
  },
  components: {
    neMainTitle
  },
  middleware: 'authenticated',
  data() {
    return {
      code: this.$route.params.code,
      vpcData: null
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
            'link': this.$route.path
          },
          {
            'icon': 'icon-nat iconfont',
            'title': '路由器',
            'link': this.$route.path + '/vrouter'
          },
          {
            'icon': 'icon-gateway iconfont',
            'title': '交换机',
            'link': this.$route.path + '/vswitcher'
          }
        ]
      }];

      this.$eventHub.$emit('changeMenu', menudataCopy);
    },
    getVpcInfo() {
      return this.$api({metadata: {name: 'console.vpc.get'}, spec: {
        'Vpc.Get': {
          'UrlParams': {
            'access_token': consts.TOKEN
          },
          'BasicInfos': {
            'ResourceId': this.code
          }
        }
      }}).then(res=>{
        this.vpcData = res.data['Vpc.Get'].data;
      });
    }
  },
  created() {
    this.getVpcInfo();
  },
  mounted() {
    this.changeMenu();
  }
};
</script>