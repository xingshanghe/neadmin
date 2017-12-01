<template>
  <section>
    <el-row style="margin-top:-20px;">
      <el-col :span="24">
        <neMainTitle :title="'我的资源'"/>
      </el-col>
    </el-row>

    <el-row class="vpc-overviews" :gutter="20">
      <section v-for="(resource,index) in resources" :key="index">
          <el-col  :span="resource.profiles.length > 1?24:12" >
            <el-card class="ne-card" style="margin-bottom:20px;">
              <div slot="header"  class="clearfix">
                <span v-if="resource.agent && resource.area">{{resource.agent.label}}({{resource.area.label}})</span>
              </div>
              <el-row class="vpc-overviews-total">
                <el-col :span="resource.profiles.length > 1?6:12">
                  <span>专有网络</span>
                  <el-button type="text">{{resource.vpc}}</el-button>
                </el-col>
                <el-col :span="resource.profiles.length > 1?6:12">
                  <span>弹性公网IP</span>
                  <el-button type="text">{{resource.eip}}</el-button>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="resource.profiles.length > 1?12:24"   v-for="(profile,index) in resource.profiles" :key="index">
                    <div class="vpc-overviews-profile" :style="(resource.profiles.length > 1)?(index%2)?'margin-left:30px':'margin-right:30px':''">
                      <el-row class="vpc-info">
                        <el-col>
                          <el-row class="vpc-info-title">
                            <el-col :span="12">
                              <span>专有网络</span>
                              <el-button type="text">{{profile.vpc}}</el-button>
                            </el-col>
                            <el-col :span="12">
                              <span>网段</span>
                              <el-button type="text">{{profile.net}}</el-button>
                            </el-col>
                          </el-row>
                          <el-row >
                            <el-col :span="10">
                              <el-row>
                                <el-col class="vpc-info-title">
                                  <span>路由器</span>
                                  <el-button type="text">{{profile.router}}</el-button>
                                </el-col>
                                <el-col class="line">
                                  <span class="vertical-line"></span>
                                </el-col>
                                <el-col class="vpc-info-title">
                                  <span>交换机</span>
                                  <el-button type="text">{{profile.switcher}}</el-button>
                                </el-col>
                                <el-col class="vpc-info-title">
                                  <span>安全组</span>
                                  <el-button type="text">{{profile.safegroup}}</el-button>
                                </el-col>
                              </el-row>
                            </el-col>
                            <el-col :span="4">
                              <div class="relation-line"></div>
                            </el-col>
                            <el-col :span="10" style="margin-top:51px;">
                              <div class="vpc-info-title">
                                <span>ECS</span>
                                <el-button type="text">{{profile.ecs}}</el-button>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>

                    </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
      </section>
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
      resources: [
        {
          region: {
            label: '北京',
            code: 'cn-beijing'
          },
          area: {
            label: '北京-A',
            code: 'cn-beijing-a'
          },
          agent: {
            label: '阿里云',
            code: 'aliyun'
          },
          vpc: 2,
          eip: 3,
          profiles: [
            {
              vpc: 'bj-test1',
              net: '192.168.16.1/24',
              switcher: 5,
              router: 2,
              safegroup: 9,
              ecs: 18
            },
            {
              vpc: 'bj-test2',
              net: '192.168.13.1/24',
              switcher: 1,
              router: 1,
              safegroup: 2,
              ecs: 0
            }
          ]
        },
        {
          region: {
            label: '杭州',
            code: 'cn-hangzhou'
          },
          area: {
            label: '杭州-1',
            code: 'cn-hangzhou-1'
          },
          agent: {
            label: '阿里云',
            code: 'aliyun'
          },
          vpc: 3,
          eip: 3,
          profiles: [
            {
              vpc: 'hz-test1',
              net: '192.168.13.1/24',
              switcher: 0,
              router: 0,
              safegroup: 0,
              ecs: 0
            },
            {
              vpc: 'hz-test2',
              net: '192.168.13.1/24',
              switcher: 1,
              router: 1,
              safegroup: 2,
              ecs: 0
            },
            {
              vpc: 'hz-test3',
              net: '192.168.13.1/24',
              switcher: 1,
              router: 1,
              safegroup: 2,
              ecs: 0
            }
          ]
        },
        {
          region: {
            label: '成都',
            code: 'cn-chengdu'
          },
          area: {
            label: '成都-1',
            code: 'cn-chengdu-1'
          },
          agent: {
            label: '华栖云',
            code: 'chinamcloud'
          },
          vpc: 1,
          eip: 1,
          profiles: [
            {
              vpc: 'cd-test1',
              net: '192.168.10.1/24',
              switcher: 1,
              router: 1,
              safegroup: 4,
              ecs: 2
            }
          ]
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
.vpc-overviews-sumary{
  padding: 0 20px;
  border: 1px solid #e1e6eb;
  font-size: 18px;
  @include span-button;
}

.vpc-overviews{
  @include span-button;
  .vpc-overviews-profile,.vpc-overviews-total{
    border: 1px solid #e1e6eb;
  }
  .vpc-overviews-profile{
    margin-top: 20px;
    padding: 10px;
    .vpc-info{
      .relation-line{
        margin-top: 67px;
        border-bottom: 1px dashed #1e6e9b;
      }
      .vpc-info-title{
        text-align: center;
        padding: 5px 0;
        margin-bottom: 16px;
        background-color: #f3f3f3;
        border-radius: 4px;
        font-size: 12px;
        line-height: 24px;
        button{
          font-size: 12px;
          padding: 5px 10px;
        }
      }
      .line{
        background: inherit;
        margin-top: -16px;
        margin-bottom: 0;
        height: 16px;
        padding: 0;
        padding-left: 30%;
        .vertical-line{
          display: inline-block;
          zoom: 1;
          height: 16px;
          border-left: 1px dashed #1e6e9b;
        }
      }
    }
  }
}
</style>
