<template>
  <ul class="nav-pills">
    <li v-for="(area,index) in areas" :key="index" :class="{'active':activeCode === area.code}">
      <section @click="selectItem(area)" >{{area.label}}</section>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'list-title-pills',
  data() {
    return {
      activeCode: ''
    };
  },
  props: {
    areas: {
      type: Array,
      default: function() {
        return [
          {
            label: '华北1',
            code: 'cn-qingdao',
            region: {
              label: '华北',
              code: 'cn-huabei'
            }
          },
          {
            label: '华北2',
            code: 'cn-beijing',
            region: {
              label: '华北',
              code: 'cn-huabei'
            }
          },
          {
            label: '华北3',
            code: 'cn-zhangjiakou',
            region: {
              label: '华北',
              code: 'cn-huabei'
            }
          },
          {
            label: '华北5',
            code: 'cn-huhehaote',
            region: {
              label: '华北',
              code: 'cn-huabei'
            }
          },
          {
            label: '华东1',
            code: 'cn-hangzhou',
            region: {
              label: '华东',
              code: 'cn-huadong'
            }
          },
          {
            label: '华东2',
            code: 'cn-shanghai',
            region: {
              label: '华东',
              code: 'cn-huadong'
            }
          },
          {
            label: '华南1',
            code: 'cn-shenzhen',
            region: {
              label: '华南',
              code: 'cn-huanan'
            }
          },
          {
            label: '香港',
            code: 'cn-hongkong',
            region: {
              label: '香港',
              code: 'cn-hongkong'
            }
          }
        ];
      }
    }
  },
  methods: {
    selectItem(area) {
      this.activeCode = area.code;
      this.$emit('selected', area);
    }
  }
};
</script>
<style lang="scss" scoped>
  .nav-pills{
    max-width: 600px;
    display: inline-block;
    padding: 0;
    margin: 0;
    li{
      margin: 0 2px;
    }
    li.active{
      section{
        border: 1px solid #546478;
        background-color: #546478;
        color: #FFFFFF;
      }
    }
    > li{
      float: left;
      position: relative;
      display: block;
      section{
        padding: 8px 12px;
        border: 1px solid #D9DEE4;
        background-color: #D9DEE4;
        color: #444;
        margin-left: 2px;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
</style>
