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
          <panelItemTitle class="label" :iconClass="'el-icon-date'">
            <span slot="title">计费方式</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-row class="fee-select" :gutter="5">
            <el-col class="ecs-create-item-box active" :span="4">
              <div class="normal-box">包年包月</div>
            </el-col>
            <el-col class="ecs-create-item-box" :span="4">
              <div class="normal-box">按量付费</div>
            </el-col>
            <el-col class="ecs-create-item-box" :span="4">
              <div class="normal-box">竞价实例</div>
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
          <panelItemTitle class="label" :iconClass="'el-icon-share'">
            <span slot="title">网络</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-row class="normal-box" :gutter="5">
            <el-col class="ecs-create-item-box active" :span="4">
              <div class="normal-box">专有网络</div>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="8" style="padding-right:20px;">
              <el-select class="normal-select" v-model="vpc.value" filterable placeholder="默认专有网络" >
                <el-option v-for="item in vpc.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8" style="padding-right:20px;">
              <el-select class="normal-select" v-model="vswitch.value" filterable placeholder="默认交换机">
                <el-option v-for="item in vswitch.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="16" style="padding-right:20px;">
              <el-select class="normal-select" v-model="safegroup.value" filterable placeholder="请选择安全组" >
                <el-option v-for="item in safegroup.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="ecs-create-item" :gutter="5">
        <el-col :span="4">
          <panelItemTitle class="label" :iconClass="'el-icon-document'">
            <span slot="title">实例</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="3" class="text-label">实例规格</el-col>
            <el-col :span="21" class="text-value">ecs.t5-lc1m1.small（1核 1GB，突发性能实例 t5）</el-col>
          </el-row>
          <el-row>
            <el-col><el-button type="text" icon="el-icon-menu">选择其他实例规格</el-button></el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="ecs-create-item" :gutter="5">
        <el-col :span="4">
          <panelItemTitle class="label" :iconClass="'el-icon-document'">
            <span slot="title">镜像</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-row class="normal-box" :gutter="5">
            <el-col class="ecs-create-item-box active" :span="4">
              <div class="normal-box">系统镜像</div>
            </el-col>
            <el-col class="ecs-create-item-box" :span="4">
              <div class="normal-box">公共镜像</div>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="8" style="padding-right:20px;">
              <el-select class="normal-select" v-model="vpc.value" filterable placeholder="请选择操作系统" >
                <el-option v-for="item in vpc.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8" style="padding-right:20px;">
              <el-select class="normal-select" v-model="vswitch.value" filterable placeholder="请选择版本">
                <el-option v-for="item in vswitch.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="ecs-create-item" :gutter="5">
        <el-col :span="4">
          <panelItemTitle class="label" :iconClass="'el-icon-document'">
            <span slot="title">存储</span>
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
              <el-input-number class="normal-input-number" v-model="ecs.num" controls-position="right" size="small" :label="'台'" @change="changeDiskValue" :min="1" :max="50"></el-input-number>台
            </el-col>
        </el-col>
      </el-row>

      <el-row class="ecs-create-item" :gutter="5">
        <el-col :span="4">
          <panelItemTitle class="label" :iconClass="'el-icon-document'">
            <span slot="title">安全设置</span>
          </panelItemTitle>
        </el-col>
        <el-col :span="20">
          <el-row class="normal-box" :gutter="5">
            <el-col class="ecs-create-item-box active" :span="4">
              <div class="normal-box">设置密码</div>
            </el-col>
            <el-col class="ecs-create-item-box" :span="4">
              <div class="normal-box">创建后设置</div>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="3" class="text-label">登录密码</el-col>
            <el-col :span="6" class="text-value normal-input"><el-input v-model="ecs.pwd" placeholder="登录密码"></el-input></el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="3" class="text-label">确认密码</el-col>
            <el-col :span="6" class="text-value normal-input"><el-input v-model="ecs.pwd2" placeholder="确认密码"></el-input></el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="3" class="text-label">实例名称</el-col>
            <el-col :span="6" class="text-value normal-input"><el-input v-model="ecs.name" placeholder="实例名称，不填自动生成"></el-input></el-col>
          </el-row>
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
      states: [
        'Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming'
      ],
      vpc: {
        loading: false,
        options: [],
        list: [],
        value: []
      },
      vswitch: {
        loading: false,
        options: [],
        list: [],
        value: []
      },
      safegroup: {
        loading: false,
        options: [],
        list: [],
        value: []
      },
      disk: {
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
      },
      ecs: {
        num: 1,
        name: '',
        pwd: '',
        pwd2: ''
      }
    };
  },
  mounted() {
    this.vpc.list = this.states.map(item => {
      return { value: item, label: item };
    });
    this.vpc.options = this.vpc.list.filter(item => {
      return item.label.toLowerCase();
    });
    this.vswitch.list = this.states.map(item => {
      return { value: item, label: item };
    });
    this.vswitch.options = this.vswitch.list.filter(item => {
      return item.label.toLowerCase();
    });
    this.safegroup.list = this.states.map(item => {
      return { value: item, label: item };
    });
    this.safegroup.options = this.safegroup.list.filter(item => {
      return item.label.toLowerCase();
    });
  },
  methods: {
    vchange(a) {
      console.error(a);
    },
    changeDiskValue() {

    },
    vpcRemoteMethod(query) {
      if (query !== '') {
        this.vpc.loading = true;
        setTimeout(() => {
          this.vpc.loading = false;
          this.vpc.options = this.vpc.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.vpc.options = [];
      }
    },
    vswitchRemoteMethod(query) {
      if (query !== '') {
        this.vswitch.loading = true;
        setTimeout(() => {
          this.vswitch.loading = false;
          this.vswitch.options = this.vswitch.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.vswitch.options = [];
      }
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