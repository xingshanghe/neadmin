<template>
  <section>
    <el-row class="top-title">
      <el-col :span="3" style="padding-left:10px;">
        <neMainTitle :title="'创建磁盘实例'"/>
      </el-col>
      <el-col :span="2" style="padding:10px 0;">
        <el-button @click="$router.push('/computed-network/ecs/disks')" size="mini">返回列表</el-button>
      </el-col>
    </el-row>

    <section class="ecs-create-panel">

      <el-row class="ecs-create-item" :gutter="5">
        <el-col :span="4">
          <panelItemTitle class="label" :iconClass="'el-icon-location'">
            <span slot="title">地域</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-row :gutter="10" class="location-select">
            <el-col :span="4">
              <el-row class="location-select-box active">
                <el-col class="location-select-box-title">华北 3</el-col>
                <el-col class="location-select-box-body">
                  <el-dropdown @visible-change="vchange" trigger="click" class="location-select-box-down">
                    <span class="el-dropdown-link">
                      随机分配<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>华北 3 可用区 A</el-dropdown-item>
                      <el-dropdown-item>华北 3 可用区 B</el-dropdown-item>
                      <el-dropdown-item>华北 3 可用区 C</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row class="location-select-box">
                <el-col class="location-select-box-title">华北 2</el-col>
                <el-col class="location-select-box-body">
                  <el-dropdown @visible-change="vchange" trigger="click" class="location-select-box-down">
                    <span class="el-dropdown-link">
                      随机分配<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>华北 2 可用区 A</el-dropdown-item>
                      <el-dropdown-item>华北 2 可用区 B</el-dropdown-item>
                      <el-dropdown-item>华北 2 可用区 C</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="ecs-create-item" :gutter="5">
        <el-col :span="4">
          <panelItemTitle class="label" :iconClass="'el-icon-document'">
            <span slot="title">云盘</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-col :span="4" style="padding-right:20px;">
              <el-select class="normal-select" v-model="disk.type" filterable placeholder="选择磁盘类型" >
                <el-option v-for="item in disk.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8" style="padding-right:20px;">
              <el-input-number class="normal-input-number" v-model="disk.value" controls-position="right" size="small" :label="'GB'" @change="changeDiskValue" :min="40" :max="256"></el-input-number>GB
            </el-col>
        </el-col>
      </el-row>

      <el-row class="ecs-create-item" :gutter="5">
        <el-col :span="4">
          <panelItemTitle class="label" :iconClass="'el-icon-document'">
            <span slot="title">购买量</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-col :span="8" style="padding-right:20px;">
              <el-input-number class="normal-input-number" v-model="disk.num" controls-position="right" size="small" :label="'台'" @change="changeDiskValue" :min="1" :max="50"></el-input-number>块
            </el-col>
        </el-col>
      </el-row>

      <el-row class="ecs-create-item" :gutter="5">
        <el-col style="text-align:center;">
          <el-button  plain>确定创建</el-button>
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
  data() {
    return {
      disk: {
        num: 1,
        type: null,
        value: null,
        options: [
          {
            label: '高效云盘',
            value: 'hd'
          },
          {
            label: 'SSD 云盘',
            value: 'ssd'
          }
        ]
      }
    };
  },
  mounted() {
  },
  methods: {
    changeDiskValue() {

    }
  }
};
</script>
<style lang="scss" scoped>
.el-dropdown-menu{
  border-radius: 0px;
  .el-dropdown-menu__item{
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #999;
  }
}


</style>