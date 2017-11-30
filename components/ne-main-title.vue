<template>
  <h5>{{title}}</h5>
</template>
<script>
export default {
  name: 'ne-main-title',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped>
  h5{
    margin:15px auto;
    text-indent: 8px;
    border-left: 2px solid #88b7e0;
    font-size: 16px;
  }
</style>


