<template>
  <div class="panel">
    <i :class="iconClass"></i>
    <slot name="title"><strong>{{title}}</strong></slot>
  </div>
</template>
<script>
export default {
  name: 'panel-item-title',
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    iconClass: {
      type: String,
      default: function() {
        return 'el-icon-edit';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .panel{
    display: inline;
    i{
      padding-right: 5px;
      color: #ccc;
    }
    i:hover{
      color:#00C1DE;
    }
  }
</style>

