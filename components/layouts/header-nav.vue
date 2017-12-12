<template>
  <div class="header-nav" style="padding-right:50px;">
    <el-menu  mode="horizontal" background-color="#37474f" text-color="#ffffff" active-text-color="#fff">
      <el-menu-item index="1"><i class="el-icon-search"></i>搜索</el-menu-item>
      <el-menu-item index="2"><el-badge :value="3" class="item"><i class="el-icon-bell"></i></el-badge></el-menu-item>
      <el-submenu index="3">
        <template slot="title">我的工作台</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
        <el-menu-item index="3-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="/accounts/work-order"><nuxt-link to="/accounts/work-order">工单管理</nuxt-link></el-menu-item>
      <el-submenu index="/accounts" menu-trigger="click">
        <template slot="title"><img src="~/assets/images/img-holder.jpg" style="width:30px;"> {{currentUser?currentUser.username || currentUser.profile.nickname:null}} </template>
        <el-menu-item index="/accounts/profile"><nuxt-link to="/accounts/profile"><i class="icon-cog"></i> 个人设置</nuxt-link></el-menu-item>
        <el-menu-item index="/accounts/logout"><nuxt-link to="/accounts/logout"><i class="icon-switch"></i> 安全退出</nuxt-link></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'header-nav',
  props: {
    currentUser: null
  }
};
</script>
