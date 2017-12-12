<template>
  <section>
    <el-row class="top-title">
      <el-col :span="3" style="padding-left:10px;">
        <neMainTitle :title="'创建ECS实例'"/>
      </el-col>
      <el-col :span="2" style="padding:10px 0;">
        <el-button @click="$router.push('/computed-network/ecs/list')" size="mini">返回列表</el-button>
      </el-col>
    </el-row>

    <section class="ecs-create-panel">
      <el-row class="ecs-create-item" :gutter="5">
        <el-col :span="4">
          <panelItemTitle class="label">
            <span slot="title">计费方式</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-row class="fee-select" :gutter="5">
            <el-col class="ecs-create-item-box active" :span="4">
              <div class="fee-box">包年包月</div>
            </el-col>
            <el-col class="ecs-create-item-box" :span="4">
              <div class="fee-box">按量付费</div>
            </el-col>
            <el-col class="ecs-create-item-box" :span="4">
              <div class="fee-box">竞价实例</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row> 

      <el-row class="ecs-create-item" :gutter="5">
        <el-col :span="4">
          <panelItemTitle class="label" :iconClass="'el-icon-location'">
            <span slot="title">地域</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-row :gutter="5" class="location-select">
            <el-col :span="4">
              <el-row class="location-select-box">
                <el-col class="location-select-box-title">华北 3</el-col>
                <el-col class="location-select-box-body">
                  <el-dropdown @visible-change="vchange" class="location-select-box-down">
                    <span class="el-dropdown-link">
                      华北 3 可用区 A<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item>双皮奶</el-dropdown-item>
                      <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </section>
  </section>
</template>
<script>
import neMainTitle from '~/components/ne-main-title.vue';
import panelItemTitle from '~/components/console/panel-item-title.vue';
export default {
  head: {
    title: '创建ECS实例'
  },
  middleware: 'authenticated',
  layout: 'onlytop',
  components: {
    neMainTitle,
    panelItemTitle
  },
  mounted() {

  },
  methods: {
    vchange(a) {
      console.error(a);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-main.main-container{
  .top-title{
    margin:-20px -20px 0 -20px;
    padding: 5px 0;
    background-color: #ffffff;
  }
  .ecs-create-panel{
    max-width: 1200px;
    min-width: 600px;
    margin: 0 auto !important;
    padding-top: 40px;
    padding-bottom: 70px;
    .ecs-create-item{
      background-color: #FFF;
      padding: 30px;
      border-bottom: 1px solid #DDDDDD;
      .label{
        line-height: 34px;
      }
      .location-select{
        .location-select-box{
          border: 1px solid #DDDDDD;
          height: 70px;
          text-align: center;
          .location-select-box-title{
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            border-bottom: 1px solid #DDDDDD;
          }
          .location-select-box-body{
            font-size: 12px;
            height: 28px;
            line-height: 28px;
            .el-dropdown{
              .el-dropdown-link{
                color: #999 !important;
              }
            }
          }
        }
      }
      .ecs-create-item-box{
        text-align: center;
        min-width: 155px;
        font-size: 14px;
        line-height: 32px;
        cursor: pointer;
        .fee-box{
          margin: 2px;
          border: 1px solid #DDDDDD;
        }
      }
      .ecs-create-item-box.active{
        .fee-box{
          background: #546478;
          border-color: #546478;
          color: white;
          cursor: default;
        }
      }
    }
  }
}
</style>