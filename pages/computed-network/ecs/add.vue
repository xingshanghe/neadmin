<template>
  <section>
    <el-row class="top-title" style="">
      <el-col :span="3" style="padding-left:10px;">
        <neMainTitle :title="'创建ECS实例'"/>
      </el-col>
      <el-col :span="2" style="padding:10px 0;">
        <el-button @click="$router.push('/computed-network/ecs/list')" size="mini">返回列表</el-button>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import neMainTitle from '~/components/ne-main-title.vue';
export default {
  head: {
    title: '创建ECS实例'
  },
  middleware: 'authenticated',
  layout: 'onlytop',
  components: {
    neMainTitle
  },
  mounted() {

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
}
</style>