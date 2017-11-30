<template>
  <section>
    <el-row>
      <el-col :span="24">
        <neMainTitle :title="'概览'"/>
      </el-col>
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
  }
};
</script>