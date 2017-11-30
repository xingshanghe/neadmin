<template>
  <section class="ne-cards">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="ne-card">
          <div slot="header" class="clearfix">
            <span>配额使用情况</span>
            <el-button type="text">计算</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="ne-card">
          <div slot="header" class="clearfix">
            <span>监控告警</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="12">
        <el-card class="ne-card">
          <div slot="header"  class="clearfix">
            <span>其他配额使用情况</span>
            <el-button type="text">计算</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="ne-card">
          <div slot="header" class="clearfix">
            <span>应用分组监控告警</span>
            <el-button type="text">应用分组管理</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>

  </section>
</template>
<script>
export default {
  head: {
    title: '概览'
  },
  middleware: 'authenticated'
};
</script>
<style rel="stylesheet/scss" lang="scss" >



</style>
