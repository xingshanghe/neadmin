<template>
  <el-container style="height: 100%">
    <el-header>
      <div class="logo">
        <nuxt-link to="/">CMOP管理控制台</nuxt-link>
      </div>
      <div class="menu-nav">
        <el-menu  mode="horizontal" background-color="#37474f" text-color="#ffffff" active-text-color="#fff">
          <el-menu-item index="1"><i class="el-icon-menu"></i>产品与服务</el-menu-item>
        </el-menu>
      </div>
      <header-nav :currentUser="currentUser"></header-nav>
    </el-header>
    <el-container>
      <el-main class="main-container"><nuxt ></nuxt></el-main>
    </el-container>
  </el-container>


</template>

<script>
import headerNav from '~/components/layouts/header-nav.vue';
export default {
  name: 'onlytop-layout',
  components: {
    headerNav
  },
  data() {
    return {
      currentUser: this.$store.state.user
    };
  },
  methods: {
  },
  created() {
  },
  mounted() {
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" >
@import '~assets/scss/index.scss';
</style>

