<template>
  <span>
    <template v-for="(item,key) in items">

      <template v-if="item.hasOwnProperty('isgroup') && item.isgroup === true">
        <el-menu-item-group>
          <span slot="title">{{item.title}}</span>
          <ne-menu-item :items="item.children" :level="level+'-'+String(key)" :isCollapse="false" @selected="selectedSub"></ne-menu-item>
        </el-menu-item-group>
      </template>
      <template v-else>
        <template v-if="item.hasOwnProperty('children') && item.children.length > 0">
          <el-submenu :index="level+'-' + String(key)">
            <template slot="title">
              <i v-if="item.hasOwnProperty('icon') && item.icon !== ''" :class="item.icon"></i>
              <span v-if="!isCollapse" slot="title">{{item.title}}</span>
            </template>
            <ne-menu-item :items="item.children" :level="level+'-'+String(key)" :isCollapse="false" @selected="selectedSub"></ne-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="level +'-'+ String(key)" @click="selectItem(item)">
            <template v-if="!isCollapse">
              <i v-if="item.hasOwnProperty('icon') && item.icon !== ''" :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <template v-else>
              <el-tooltip class="item" effect="dark" :content="item.title" placement="right">
                <div :style="tooltipStyle">
                  <i v-if="item.hasOwnProperty('icon') && item.icon !== ''" :class="item.icon"></i>
                </div>
              </el-tooltip>
            </template>
          </el-menu-item>
        </template>
      </template>
    </template>
  </span>
</template>

<script>
// 因为在el-menu-item包裹了一层section导致 菜单只有一级时报错，需手动处理，因系统中多位二级菜单，故暂时未做处理
export default {
  name: 'ne-menu-item',
  props: {
    level: {
      type: String,
      default: 'ne'
    },
    items: {},
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
