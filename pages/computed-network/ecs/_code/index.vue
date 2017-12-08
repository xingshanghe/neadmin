<template>
  <section>
    <el-row style="margin-top:-20px;">
      <el-col :span="16">
        <neMainTitle :title="'云服务器ECS详情'"/>
      </el-col>
      <el-col class="top-buttons" :span="8">
        <el-button type="primary"  size="small"><i class="el-icon-edit "></i>编辑</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:5px;" :gutter="5">
      <el-col :span="14">
        <el-card class="ne-card" style="margin-bottom:20px;">
          <div slot="header"  class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row :gutter="5">
            <el-col  class="info-item"><span>实例名称: </span>{{ecsData.instanceName}}</el-col>
            <el-col  class="info-item"><span>code: </span>{{code}}</el-col>
            <el-col  class="info-item"><span>实例规格: </span>{{ecsData.instanceType}}</el-col>
            <el-col  class="info-item"><span>主机名称: </span>{{ecsData.hostName}}</el-col>
            <el-col  class="info-item"><span>状态: </span><span :class="'status-'+ecsData.status">{{ecsData.status|toStatusText}}</span></el-col>
            <el-col  class="info-item"><span>部署区位: </span>{{ecsData.regionId}}</el-col>
            <el-col  class="info-item"><span>镜像ID: </span>{{ecsData.imageUUID}}</el-col>
            <el-col  class="info-item"><span>创建时间: </span>{{ecsData.createTime}}</el-col>
            <el-col  class="info-item"><span>备注: </span>{{ecsData.description}}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="ne-card" style="margin-bottom:20px;">
          <el-row class="overviews">
            <el-col :span="12" style="margin-top:80px;" class="overviews-item">
              <span>状态</span>
              <span :class="'status-'+ecsData.status">  {{ecsData.status|toStatusText}}</span>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col class="overviews-item">
                  <el-row>
                    <el-col :span="12"><span class="overviews-profile-right-span">磁盘</span></el-col>
                    <el-col :span="12"><span class="overviews-profile-right-button" type="text">-</span></el-col>
                  </el-row>
                </el-col>
                <el-col class="overviews-item">
                  <el-row>
                    <el-col :span="12"><span class="overviews-profile-right-span">网卡</span></el-col>
                    <el-col :span="12"><span class="overviews-profile-right-button" type="text">-</span></el-col>
                  </el-row>
                </el-col>
                <el-col class="overviews-item">
                  <el-row>
                    <el-col :span="12"><span class="overviews-profile-right-span">快照</span></el-col>
                    <el-col :span="12"><span class="overviews-profile-right-button" type="text">-</span></el-col>
                  </el-row>
                </el-col>
                <el-col class="overviews-item">
                  <el-row>
                    <el-col :span="12"><span class="overviews-profile-right-span">镜像</span></el-col>
                    <el-col :span="12"><span class="overviews-profile-right-button" type="text">-</span></el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-card class="ne-card" style="margin-bottom:20px;">
          <div slot="header"  class="clearfix">
            <span>配置信息</span>
          </div>
          <el-row :gutter="5">
            <el-col  class="info-item"><span>CPU: </span></el-col>
            <el-col  class="info-item"><span>内存: </span></el-col>
            <el-col  class="info-item"><span>操作系统: </span></el-col>
            <el-col  class="info-item"><span>EIP: </span></el-col>
            <el-col  class="info-item"><span>私有IP: </span>{{ecsData.privateIpaddress}}</el-col>
            <el-col  class="info-item"><span>所属VPC: </span></el-col>
            <el-col  class="info-item"><span>VSWITCH: </span>{{ecsData.vswitchId}}</el-col>
            <el-col  class="info-item"><span>NAT-IP: </span></el-col>
            <el-col  class="info-item"><span>带宽: </span></el-col>
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
  data() {
    return {
      code: this.$route.params.code,
      ecsData: {}
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
            'link': this.$route.path
          },
          {
            'icon': 'icon-cipan iconfont',
            'title': '磁盘',
            'link': this.$route.path + '/disks'
          },
          {
            'icon': 'icon-gateway iconfont',
            'title': '网卡',
            'link': this.$route.path + '/nic'
          },
          {
            'icon': 'icon-jingxiangcangku iconfont',
            'title': '快照',
            'link': this.$route.path + '/snapshot-image'
          },
          {
            'icon': 'icon-anquan iconfont',
            'title': '网络与安全',
            'link': this.$route.path + '/network-safety'
          }
        ]
      }];

      this.$eventHub.$emit('changeMenu', menudataCopy);
    },
    getEcsInfo() {
      return this.$api({metadata: {name: 'console.ecs.get'}, spec: {
        'Ecs.Get': {
          'UrlParams': {
            'access_token': this.$store.state.access_token
          },
          'BasicInfos': {
            'ResourceId': this.code
          }
        }
      }}).then(res=>{
        this.ecsData = res.data['Ecs.Get'].data;
      });
    }
  },
  mounted() {
    this.changeMenu();
    this.getEcsInfo();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" >

</style>
