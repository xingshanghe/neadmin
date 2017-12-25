<template>
  <section>
    <el-row style="margin-top:-20px;">
      <el-col :span="16">
        <neMainTitle :title="'网关详情'"/>
      </el-col>
      <el-col class="top-buttons" :span="8">
        <el-button type="primary"  size="small"><i class="el-icon-refresh "></i>刷新</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:5px;" :gutter="5">
      <el-col :span="24">
        <el-card class="ne-card" style="margin-bottom:20px;">
          <div slot="header"  class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row :gutter="5">
            <el-col :span="8" class="info-item"><span>Code: </span>{{code}}</el-col>
            <el-col :span="8" class="info-item"><span>名称: </span></el-col>
            <el-col :span="8" class="info-item"><span>地域: </span>{{natData.zoneUUID}}</el-col>
            <el-col :span="8" class="info-item"><span>专有网络: </span></el-col>
            <el-col :span="8" class="info-item"><span>状态: </span><span :class="'status-'+natData.status">{{natData.status|toStatusText}}</span></el-col>
            <el-col :span="8" class="info-item"><span>描述: </span>{{natData.description}}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="ne-card" style="margin-bottom:20px;">
          <div slot="header"  class="clearfix">
            <span>付费信息</span>
          </div>
          <el-row :gutter="5">
            <el-col :span="8" class="info-item"><span>付费方式: </span></el-col>
            <el-col :span="8" class="info-item"><span>创建时间: </span>{{natData.createTime}}</el-col>
            <el-col :span="8" class="info-item"><span>规格: </span></el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import _ from 'lodash';
import neMainTitle from '~/components/ne-main-title.vue';

export default {
  head: {
    title: '云服务器ECS详情'
  },
  components: {
    neMainTitle
  },
  middleware: 'authenticated',
  validate({ params }) {
    // Must be a number
    console.error(params.code);
    return true;
    // return /^\d+$/.test(params.id);
  },
  data() {
    return {
      code: this.$route.params.code,
      natData: {}
    };
  },
  methods: {
    changeMenu() {
      let menudata = this.$store.getters.mapOfRoutes['/computed-network/vpc'];
      let menudataCopy = _.assign({}, menudata);

      menudataCopy.subBackItem = menudata;
      menudataCopy.subBackUrl = '/computed-network/vpc/nat';
      menudataCopy.sub = [{
        'isgroup': true,
        'title': 'NAT网关详情',
        'children': [
          {
            'icon': 'icon-googleplus5',
            'title': '详情',
            'link': this.$route.path
          },
          {
            'icon': 'icon-cipan iconfont',
            'title': '端口转发表',
            'link': this.$route.path + '/ports'
          },
          {
            'icon': 'icon-gateway iconfont',
            'title': 'SNAT表',
            'link': this.$route.path + '/snat'
          }
        ]
      }];

      this.$eventHub.$emit('changeMenu', menudataCopy);
    },
    getDiskInfo() {
      return this.$api({metadata: {name: 'console.natgw.get'}, spec: {
        'NATGW.Get': {
          'UrlParams': {
            'access_token': this.$store.state.access_token
          },
          'BasicInfos': {
            'ResourceId': this.code
          }
        }
      }}).then(res=>{
        this.natData = res.data['NATGW.Get'].data;
      });
    }
  },
  mounted() {
    this.changeMenu();
    this.getDiskInfo();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" >

</style>
