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
const allmenudata = require('~/static/menu.json');
export default {
  name: 'default-layout',
  components: {
    neMenuItem,
    fork
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
$black:#37474f;
$nav-height:50px;
.el-header {
  height: $nav-height !important;
  background-color: $black;
  color: #ffffff !important;
  line-height: $nav-height !important;
  i{
    color: #ffffff !important;
  }
  .logo,.menu-nav{
    display: inline-block;
    float: left;
  }
  .menu-nav{
    padding-left: 15px;
  }
  .header-nav{
    float: right;
    padding-right: 15px;
  }
  .header-nav,.menu-nav{
    display: inline-block;
    .el-menu{
      height: $nav-height;
      .el-menu-item.is-active{
        border-bottom-color: #409eff !important;
      }
      .el-menu-item{
        height: $nav-height;
        line-height:$nav-height;
        i[class*=" icon-"], [class^=icon-]{
          color: white;
          font-size: 17px;
          padding: 0 5px;
        }
        [class^=el-icon-]{
          font-size: 20px;
        }
        .el-badge{
          .el-badge__content.is-fixed{
            top: 13px;
          }
        }
      }
      .el-submenu.is-active{
          border-bottom-color: #409eff !important;
          .el-submenu__title{
          border-bottom-color: #409eff !important;
        }
        }
      .el-submenu{
        >.el-menu{
          top: 55px;
        }
        .el-submenu__title.is-active{
          border-bottom-color: #409eff !important;
        }
        .el-submenu__title{
          height: $nav-height !important;
          line-height:$nav-height !important;
          img{
            width: 30px;
            border-radius: 30px;
          }
        }
      }
    }
  }
}
.el-aside{
  position: relative;
  ul.el-menu.sidebar {
    li.toggle-sidebar{
      text-align: center;
      padding: 5px 0;
      a.sider-opened i{
        transform: rotate(90deg);
      }
      a.sider-closed i{

      }
    }
    .el-submenu i[class^=el-icon-],.el-menu-item i[class^=el-icon-],.el-submenu i[class^=icon-],.el-menu-item i[class^=icon-]{
      margin-right:19px;
      vertical-align: middle;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
    .el-menu-item, .el-submenu__title{
      height: $nav-height !important;
      line-height: $nav-height !important;
    }
  }
}
.el-aside, .el-main{
  overflow: unset;
}
.el-aside.secSidebar{
  .sec-sidebar-toggle{
    position: absolute;
    top: 42%;
    z-index: 3;
    .sec-sidebar-toggle-inner{
      .sec-sidebar-toggle-collapse-bg{
        width: 0;
        height: 50px;
        position: absolute;
      }
      .sec-sidebar-toggle-collapse-bg.left{
        border-bottom: 9px solid transparent;
        border-left: none;
        border-right: 13px solid #f7f7f7;
        border-top: 9px solid transparent;
      }
      .sec-sidebar-toggle-collapse-bg.right{
        border-bottom: 9px solid transparent;
        border-left: 13px solid #D9DEE4;
        border-top: 9px solid transparent;
      }
      .sec-sidebar-toggle-collapse{
        color: #5e6d82;
        font-size: 15px;
        line-height: 50px;
        cursor: pointer;
      }
    }
  }
  .sec-sidebar-toggle.left{
    right: -2px;
  }
  .sec-sidebar-toggle.right{
    right: -15px;
  }
}
.el-main{
  .ne-card{
    .el-card__header{
      background-color: #f4f5f9;
      border-left: 3px solid #778;
      padding: 8px 20px;
      span{

      }
      button.el-button{
        float: right;
        padding: 0;
      }
    }
    .el-card__body{
      // min-height: 200px;
    }
  }
  .console-table-list{

    td, th {
      height: 30px;
      padding: 0;
    }
    th{
      color: #1f2d3d;
      background-color: #eef1f6;
      >.cell{
        line-height: 30px;
      }
    }
  }
  .pager{
    float: right;
  }
}
.el-main.main-container{
  overflow-y: auto;
}
</style>

