<template>
  <el-container style="height: 100%">
    <el-header>
      <div class="logo">
        <nuxt-link to="#">WEB-CONSOLE管理控制台</nuxt-link>
      </div>
      <div class="menu-nav">
        <el-menu  mode="horizontal" background-color="#37474f" text-color="#ffffff" active-text-color="#fff">
          <el-menu-item index="1"><i class="el-icon-menu"></i>产品与服务</el-menu-item>
        </el-menu>
      </div>
      <div class="header-nav" style="padding-right:50px;">
        <el-menu  mode="horizontal" background-color="#37474f" text-color="#ffffff" active-text-color="#fff">
          <el-menu-item index="1"><i class="el-icon-search"></i>搜索</el-menu-item>
          <el-menu-item index="2"><el-badge :value="3" class="item"><i class="el-icon-bell"></i></el-badge></el-menu-item>
          <el-submenu index="3">
            <template slot="title">我的工作台</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
          </el-submenu>
          <el-menu-item index="/accounts/work-order"><nuxt-link to="/accounts/work-order">工单管理</nuxt-link></el-menu-item>
          <el-submenu index="/users" menu-trigger="click">
            <template slot="title"><img src="~/assets/images/img-holder.jpg" style="width:30px;"> {{currentUser?currentUser.nickname || currentUser.username:null}} </template>
            <el-menu-item @click="selectedSubByLink('/settings/personal/profile')" index="/settings/personal/profile"><nuxt-link  to="/settings/personal/profile"><i class="icon-cog"></i> 个人设置</nuxt-link></el-menu-item>
            <el-menu-item index="/users/logout"><nuxt-link to="/users/logout"><i class="icon-switch"></i> 安全退出</nuxt-link></el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="sidebarWidth" >
        <!-- 第一级菜单 -->
        <el-menu :default-active="defaultActive" class="sidebar" :unique-opened="true"  :collapse="sidebarCollapse"  style="height: 100%"  :router="true">
          <!-- 折叠第一级菜单按钮 -->
          <li class="toggle-sidebar">
            <a @click="toggleSidebar" :class="!sidebarCollapse?'sider-opened':'sider-closed'">
              <i class="icon-paragraph-justify3"></i>
            </a>
          </li>
          <!-- 菜单数据展现 -->
          <dop-menu-item :items="menuData" @selected="selectedSub" :isCollapse="sidebarCollapse"></dop-menu-item>
        </el-menu>
      </el-aside>
      <el-aside v-if="secMenuData.sub" class="secSidebar" :width="secSidebarWidth" >
        <el-menu :default-active="defaultSecActive" class="sidebar" :unique-opened="true"  style="height: 100%" :style="secMenuStyle"  @select="handleSelect" :router="true">
          <!-- 第二级菜单，支持在当前菜单中打开第三级菜单 -->
          <li class="toggle-sidebar" v-if="secMenuData.subBackUrl" @click="selectedSub(secMenuData.subBackItem)">
            <nuxt-link :to="secMenuData.subBackUrl" >
              <i class="el-icon-back"></i>
            </nuxt-link>
          </li>
          <dop-menu-item :items="secMenuData.sub" @selected="selectedParent" :isCollapse="false"></dop-menu-item>
        </el-menu>
        <!-- 隐藏第二级菜单按钮 -->
        <div class="sec-sidebar-toggle" :class="secSidebarSwitch">
          <div class="sec-sidebar-toggle-inner">
            <div class="sec-sidebar-toggle-collapse-bg" :class="secSidebarSwitch"></div>
            <div class="sec-sidebar-toggle-collapse">
              <div class="collapse-left" @click="toggleSecSidebar">
                <i v-if="secSidebarCollapse" class="icon-arrow-left22"></i>
                <i v-else class="icon-arrow-right22"></i>
              </div>
            </div>
          </div>
        </div>
        
      </el-aside>
      <el-main class="main-container"><nuxt/></el-main>
    </el-container>
  </el-container>
</template>

<script>
import dopMenuItem from '~/components/dop-menu-item.vue';
import { getLinkFromRoute } from '~/utils/menus.js';
// const menuData = require('~/static/menu.json');
// initMenuData函数中在children中有bug,静态文件没错
export default {
  name: 'default-layout',
  components: {
    dopMenuItem
  },
  middleware: [
    'menus'
  ],
  data() {
    return {
      currentUser: this.$store.state.user,
      roles: this.$store.state.roles,
      sidebarCollapse: this.$store.state.sidebarCollapse, // 一级菜单是否折叠
      secSidebarCollapse: this.$store.state.secSidebarCollapse, // 二级菜单是否折叠
      defaultActive: this.$route.path, // 一级菜单默认选中路径
      defaultSecActive: this.$route.path, // 二级菜单默认选中路径
      menuData: this.$store.state.menus, // 菜单数据
      secMenuData: { // 二级菜单数据
        sub: null, // 二级菜单数据
        subBackUrl: null, // 返回按钮链接
        subBackItem: null// 返回后二级菜单数据
      }
    };
  },
  computed: {
    sidebarWidth: function() { // 一级菜单宽度
      return this.sidebarCollapse ? 'auto' : '200px';
    },
    secSidebarWidth: function() { // 二级菜单宽度
      return !this.secSidebarCollapse ? 'auto' : '200px';
    },
    secSidebarSwitch: function() { // 二级菜单切换按钮图标类
      return this.secSidebarCollapse ? 'left' : 'right';
    },
    secMenuStyle: function() { // 二级菜单切换隐藏样式
      return this.secSidebarCollapse ? 'display:block;' : 'display:none;';
    }
  },
  methods: {
    initMenuData() {
      let path = this.$route.path;
      let params = this.$route.params;
      path = getLinkFromRoute({path, params});

      if (path.indexOf('/:') > -1) {
        [path] = path.split('/:');
      }

      if (this.$store.state.menuMapOfRoutes[path]) {
        this.selectedSub(this.$store.state.menuMapOfRoutes[path]);
        this.defaultSecActive = path;// 修正二级子菜单
      }
    },
    changeMenu(menu) {
      this.selectedSub(menu);
    },
    handleSelect() {
      // console.log(key, keyPath);
    },
    selectedSub(item) {
      if ((item.hasOwnProperty('sub'))) {
        this.secMenuData.sub = item.sub;
        this.secMenuData.subBackUrl = item.subBackUrl;
        this.secMenuData.subBackItem = item.subBackItem;
        // 浅拷贝报错
        // this.menuData = item;
        this.defaultActive = item.link;
        this.defaultSecActive = '';
        // this.defaultSecActive = item.subBackUrl ? item.subBackUrl : item.link;
        this.$store.dispatch('menusCollapse', {sidebarCollapse: this.sidebarCollapse, secSidebarCollapse: true});
      } else {
        this.secMenuData.sub = null;
        this.secMenuData.subBackUrl = null;
      }
    },
    selectedSubByLink(link) {
      this.selectedSub(this.$store.state.menuMapOfRoutes[link]);
    },
    selectedParent(item) {
      this.defaultSecActive = item.link;
    },
    toggleSecSidebar() {
      this.secSidebarCollapse = !this.secSidebarCollapse;

      const sidebarCollapse = this.sidebarCollapse;
      const secSidebarCollapse = this.secSidebarCollapse;
      this.$store.dispatch('menusCollapse', {sidebarCollapse, secSidebarCollapse});
    },
    toggleSidebar() {
      this.sidebarCollapse = !this.sidebarCollapse;

      const sidebarCollapse = this.sidebarCollapse;
      const secSidebarCollapse = this.secSidebarCollapse;

      this.$store.dispatch('menusCollapse', {sidebarCollapse, secSidebarCollapse});
    }
  },
  created() {
    this.$eventHub.$on('changeMenu', this.changeMenu);
  },
  mounted() {
    if (this.menuData) {
      this.initMenuData();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" >
@import '~assets/scss/index.scss';
</style>
