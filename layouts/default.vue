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
      <el-aside ref="sidebar" :width="sidebarWidth" >
        <el-menu :default-active="defaultActive" class="sidebar" :unique-opened="true"  :collapse="isCollapse"  style="height: 100%"  :router="true">
          <li class="toggle-sidebar">
            <a @click="toggleSidebar(isCollapse)" :class="!isCollapse?'sider-opened':'sider-closed'">
              <i class="icon-paragraph-justify3"></i>
            </a>
          </li>
          <ne-menu-item :items="allmenudata" @selected="selectedSub" :isCollapse="isCollapse"></ne-menu-item>
        </el-menu>
      </el-aside>
      <el-aside v-if="menudata.sub" ref="secSidebar" class="secSidebar" :width="secSidebarWidth" >
        <el-menu :default-active="defaultSecActive" class="sidebar" :unique-opened="true"  style="height: 100%" :style="secMenuStyle"  @select="handleSelect" :router="true">
          <li class="toggle-sidebar" v-if="menudata.subBackUrl" @click="selectedSub(menudata.subBackItem)">
            <nuxt-link :to="menudata.subBackUrl" >
              <i class="el-icon-back"></i>
            </nuxt-link>
          </li>
          <ne-menu-item :items="menudata.sub" @selected="selectedParent" :isCollapse="false"></ne-menu-item>
        </el-menu>
        <div class="sec-sidebar-toggle" :class="secSidebarSwitch">
          <div class="sec-sidebar-toggle-inner">
            <div class="sec-sidebar-toggle-collapse-bg" :class="secSidebarSwitch"></div>
            <div class="sec-sidebar-toggle-collapse">
              <div class="collapse-left" @click="toggleSecSidebar(secCollapse)">
                <i v-if="!secCollapse" class="icon-arrow-left22"></i>
                <i v-else class="icon-arrow-right22"></i>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main class="main-container"><nuxt ></nuxt></el-main>
    </el-container>
  </el-container>


</template>

<script>
import neMenuItem from '~/components/ne-menu-item.vue';
import fork from '~/components/fork.vue';
import headerNav from '~/components/layouts/header-nav.vue';
const allmenudata = require('~/static/menu.json');
export default {
  name: 'default-layout',
  components: {
    neMenuItem,
    fork,
    headerNav
  },
  data() {
    return {
      currentUser: this.$store.state.user,
      isCollapse: this.$store.state.sidebarCollapse, // 一级菜单是否折叠,
      secCollapse: this.$store.state.secSidebarCollapse, // 二级菜单是否折叠
      allmenudata: allmenudata,
      defaultActive: this.$route.path,
      defaultSecActive: this.$route.path,
      menudata: {
        sub: null,
        subBackUrl: null
        // active: this.$route.path
      }
    };
  },
  computed: {
    // 一级菜单宽度
    sidebarWidth: function() {
      return this.isCollapse ? 'auto' : '200px';
    },
    // 二级菜单宽度
    secSidebarWidth: function() {
      return this.secCollapse ? 'auto' : '200px';
    },
    // 二级菜单切换按钮图标类
    secSidebarSwitch: function() {
      return !this.secCollapse ? 'left' : 'right';
    },
    // 二级菜单切换隐藏样式
    secMenuStyle: function() {
      return !this.secCollapse ? 'display:block;' : 'display:none;';
    }
  },
  methods: {
    changeMenu(menu) {
      // this.menudata = menu;
      this.selectedSub(menu);
    },
    handleSelect() {
      // console.log(key, keyPath);
    },
    initSub() {
      // 初始化二级子菜单
      this.allmenudata.find(menudata=>{
        return menudata;
      });
    },
    selectedSub(item) {
      if ((item.hasOwnProperty('sub'))) {
        this.menudata.sub = item.sub;
        this.menudata.subBackUrl = item.subBackUrl;
        this.menudata.subBackItem = item.subBackItem;
        // 浅拷贝报错
        // this.menudata = item;
        // this.menudata.active = item.link;
        this.defaultActive = item.link;
        this.defaultSecActive = item.subBackUrl ? item.subBackUrl : item.link;
        this.toggleSecSidebar(true);// 打开二级菜单
        // TODO 清除当前二级菜单 激活状态
      } else {
        this.menudata.sub = null;
        this.menudata.subBackUrl = null;
      }
    },
    selectedParent(item) {
      // TODO  选出parent处理选中状态
      this.defaultSecActive = item.link;
    },
    toggleSidebar(isCollapse) {
      // TODO 处理单级菜单
      this.isCollapse = !isCollapse;

      const sidebarCollapse = this.isCollapse;
      const secSidebarCollapse = this.secCollapse;
      this.$store.dispatch('menusCollapse', {sidebarCollapse, secSidebarCollapse});
    },
    toggleSecSidebar(secCollapse) {
      this.secCollapse = !secCollapse;

      const sidebarCollapse = this.isCollapse;
      const secSidebarCollapse = this.secCollapse;
      this.$store.dispatch('menusCollapse', {sidebarCollapse, secSidebarCollapse});
    }
  },
  created() {
    this.$eventHub.$on('changeMenu', this.changeMenu);
  },
  mounted() {
    if (this.$store.state.mapOfRoutes[this.$route.path]) {
      this.selectedSub(this.$store.state.mapOfRoutes[this.$route.path]);
      this.defaultSecActive = this.$route.path;// 修正二级子菜单
    }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" >
@import '~assets/scss/index.scss';
</style>

