<template>
  <section>
    <template v-for="(item,key) in items" >
      <!-- 是否分组，分组为标题显示 -->
      <template v-if="item.is_group === 1">
        <el-menu-item-group>
          <span slot="title">{{item.title}}</span>
          <dop-menu-item :items="item.children" :level="level+'-'+String(key)" :isCollapse="false" @selected="selectedSub"></dop-menu-item>
        </el-menu-item-group>
      </template>
      <template v-else>
        <template v-if="item.children">
          <el-submenu :index="level+'-' + String(key)">
            <template slot="title">
              <i v-if="item.icon !== ''" :class="item.icon"></i>
              <span v-if="!isCollapse" slot="title">{{item.title}}</span>
            </template>
            <dop-menu-item :items="item.children" :level="level+'-'+String(key)" :isCollapse="false" @selected="selectedSub"></dop-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.link" @click="selectItem(item)" :class="{'is-active':item.link===$route.path}">
            <template v-if="!isCollapse">
              <i v-if="item.icon !== ''" :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <template v-else>
              <el-tooltip class="item" effect="dark" :content="item.title" placement="right">
                <div :style="tooltipStyle">
                  <i v-if="item.icon !== ''" :class="item.icon"></i>
                </div>
              </el-tooltip>
            </template>
          </el-menu-item>
        </template>
      </template>
    </template>
  </section>
</template>

<script>
export default {
  name: 'dop-menu-item',
  props: {
    items: {},
    level: {
      type: String,
      default: 'ne'
    },
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tooltipStyle: {
        'position': 'absolute',
        'left': 0,
        'top': 0,
        'height': '100%',
        'width': '100%',
        'display': 'inline-block',
        'box-sizing': 'border-box',
        'padding': '0 20px'
      }
    };
  },
  methods: {
    selectItem(item) {
      this.$emit('selected', item);
    },
    selectedSub(item) {
      this.selectItem(item);
    }
  }
};
</script>
