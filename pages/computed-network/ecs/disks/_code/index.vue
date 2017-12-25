<template>
  <section>
    <el-row style="margin-top:-20px;">
      <el-col :span="16">
        <neMainTitle :title="'磁盘详情'"/>
      </el-col>
      <el-col class="top-buttons" :span="8">
        <el-button type="primary"  size="small"><i class="el-icon-edit "></i>创建快照</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:5px;" :gutter="5">
      <el-col :span="14">
        <el-card class="ne-card" style="margin-bottom:20px;">
          <div slot="header"  class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row :gutter="5">
            <el-col  class="info-item"><span>磁盘ID: </span></el-col>
            <el-col  class="info-item"><span>磁盘名称: </span>{{diskData.diskName}}</el-col>
            <el-col  class="info-item"><span>状态: </span><span :class="'status-'+diskData.status">{{diskData.status|toStatusText}}</span></el-col>
            <el-col  class="info-item"><span>磁盘属性: </span></el-col>
            <el-col  class="info-item"><span>容量: </span>{{diskData.size}}</el-col>
            <el-col  class="info-item"><span>部署区位: </span>{{diskData.regionId}}</el-col>
            <el-col  class="info-item"><span>地域: </span>{{diskData.zoneUUID}}</el-col>
            <el-col  class="info-item"><span>创建时间: </span>{{diskData.createTime}}</el-col>
            <el-col  class="info-item"><span>创建自: </span></el-col>
            <el-col  class="info-item"><span>本地快照: </span>{{diskData.snapshotId}}</el-col>
            <el-col  class="info-item"><span>描述: </span>{{diskData.description}}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="10">
        <neMainTitle :title="'磁盘关系示意'"/>
        <el-card class="ne-card" style="margin-bottom:20px;">
          <el-row class="overviews">
            <el-col :span="12" style="margin-top:80px;" class="overviews-item">
              <span>磁盘关系示意</span>
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
            <span>磁盘挂载信息</span>
          </div>
          <el-row :gutter="5">
            <el-col  class="info-item"><span>挂载实例: </span></el-col>
            <el-col  class="info-item"><span>设备名: </span></el-col>
            <el-col  class="info-item"><span>操作系统: </span></el-col>
            <el-col  class="info-item"><span>可否卸载: </span></el-col>
            <el-col  class="info-item"><span>是否随实例释放: </span></el-col>
            <el-col  class="info-item"><span>自动快照是否随磁盘释放: </span></el-col>
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
      diskData: {}
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
    getDiskInfo() {
      return this.$api({metadata: {name: 'console.ecs.get'}, spec: {
        'Disk.Get': {
          'UrlParams': {
            'access_token': this.$store.state.access_token
          },
          'BasicInfos': {
            'ResourceId': this.code
          }
        }
      }}).then(res=>{
        this.diskData = res.data['Disk.Get'].data;
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
