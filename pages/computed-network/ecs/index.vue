<template>
  <section>
    <el-row style="margin-top:-20px;">
      <el-col :span="24">
        <neMainTitle :title="'概览'"/>
      </el-col>
    </el-row>
    <el-row class="ecs-overviews-sumary" >
      <el-col v-for="(overview,index) in overviews" :key="index" :span="6">
        <span>{{overview.title}}:</span>
        <el-button type="text">{{overview.value}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <neMainTitle :title="'我的资源'"/>
      </el-col>
    </el-row>
    <el-row class="ecs-overviews" :gutter="20">
      <el-col :span="12" v-for="(resource,index) in resources" :key="index">
        <el-card class="ne-card" style="margin-bottom:20px;">
          <div slot="header"  class="clearfix">
            <span v-if="resource.agent && resource.region">{{resource.agent.label}}({{resource.region.label}})</span>
          </div>
          <el-row class="ecs-overviews-profile">
            <el-col :span="12" style="margin-top:60px;">
              <span>云服务器</span>
              <el-button type="text">{{resource.profile.total}}</el-button>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col >
                  <el-row>
                    <el-col :span="12"><span class="ecs-overviews-profile-right-span">运行中</span></el-col>
                    <el-col :span="12"><el-button class="ecs-overviews-profile-right-button" type="text">{{resource.profile.running}}</el-button></el-col>
                  </el-row>
                </el-col>
                <el-col >
                  <el-row>
                    <el-col :span="12"><span class="ecs-overviews-profile-right-span">近期创建</span></el-col>
                    <el-col :span="12"><el-button class="ecs-overviews-profile-right-button" type="text">{{resource.profile.newly}}</el-button></el-col>
                  </el-row>
                </el-col>
                <el-col >
                  <el-row>
                    <el-col :span="12"><span class="ecs-overviews-profile-right-span">即将过期</span></el-col>
                    <el-col :span="12"><el-button class="ecs-overviews-profile-right-button" type="text">{{resource.profile.nearExpire}}</el-button></el-col>
                  </el-row>
                </el-col>
                <el-col >
                  <el-row>
                    <el-col :span="12"><span  class="ecs-overviews-profile-right-span">已过期</span></el-col>
                    <el-col :span="12"><el-button class="ecs-overviews-profile-right-button" type="text">{{resource.profile.expire}}</el-button></el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="ecs-overviews-hardware">
            <el-col :span="8">
              <span>磁盘</span>
              <el-button type="text">{{resource.disks}}</el-button>
            </el-col>
            <el-col :span="8">
              <span>快照</span>
              <el-button type="text">{{resource.snapshots}}</el-button>
            </el-col>
            <el-col :span="8">
              <span>镜像</span>
              <el-button type="text">{{resource.images}}</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import neMainTitle from '~/components/ne-main-title.vue';
export default {
  head: {
    title: '概览'
  },
  middleware: 'authenticated',
  components: {
    neMainTitle
  },
  data() {
    return {
      overviews: [
        {
          title: '实例',
          value: 0
        },
        {
          title: '运行中',
          value: 0
        },
        {
          title: '即将过期',
          value: 0
        },
        {
          title: '已过期',
          value: 0
        }
      ],
      resources: [
        {
          region: {
            label: '北京',
            code: 'cn-beijing'
          },
          agent: {
            label: '阿里云',
            code: 'aliyun'
          },
          profile: {
            total: 19,
            newly: 2,
            pendding: 9,
            running: 5,
            expire: 3,
            nearExpire: 1
          },
          disks: 9,
          snapshots: 8,
          images: 19
        },
        {
          region: {
            label: '杭州',
            code: 'cn-hangzhou'
          },
          agent: {
            label: '阿里云',
            code: 'aliyun'
          },
          profile: {
            total: 23,
            newly: 9,
            pendding: 1,
            running: 4,
            expire: 1,
            nearExpire: 0
          },
          disks: 2,
          snapshots: 3,
          images: 2
        },
        {
          region: {
            label: '成都',
            code: 'cn-chengdu'
          },
          agent: {
            label: '华栖云',
            code: 'chinamcloud'
          },
          profile: {
            total: 2,
            newly: 1,
            pendding: 0,
            running: 2,
            expire: 0,
            nearExpire: 0
          },
          disks: 1,
          snapshots: 4,
          images: 7
        },
        {
          region: {
            label: '西安',
            code: 'cn-xian'
          },
          agent: {
            label: '亚马逊',
            code: 'amazon'
          },
          profile: {
            total: 4,
            newly: 1,
            pendding: 3,
            running: 1,
            expire: 0,
            nearExpire: 0
          },
          disks: 2,
          snapshots: 5,
          images: 8
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin span-button {
  span{
    margin: 0 10px;
  }
  .el-button{
    font-size: 18px;
  }
}
.ecs-overviews-sumary{
  padding: 0 20px;
  border: 1px solid #e1e6eb;
  font-size: 18px;
  background-color: #FFF;
  border-radius:4px;
  @include span-button;
}

.ecs-overviews{
  @include span-button;
  .ecs-overviews-profile,.ecs-overviews-hardware{
    border: 1px solid #e1e6eb;
  }
  .ecs-overviews-profile{
    .el-col{
      text-align: center;
    }
    .ecs-overviews-profile-right-span{
      display: block;
      padding: 12px 0;
      float: right;
    }
    .ecs-overviews-profile-right-button{
      float:left;
    }
  }
  .ecs-overviews-hardware{
    margin-top: 20px;

  }
}
</style>
