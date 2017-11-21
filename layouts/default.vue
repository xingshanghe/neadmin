<template>
  <el-container style="height: 100%">
    <el-header>
      <div class="logo">
        <a href="https://github.com/xingshanghe/neadmin" target="_blank">
          Neadmin
        </a>
      </div>
      <div class="menu-nav">
        <el-menu  mode="horizontal" background-color="#37474f" text-color="#ffffff" active-text-color="#fff">
          <el-menu-item index="1"><i class="el-icon-search"></i>产品与服务</el-menu-item>
        </el-menu>
      </div>
      <div class="header-nav">
        <el-menu  mode="horizontal" background-color="#37474f" text-color="#ffffff" active-text-color="#fff">
          <el-menu-item index="1"><i class="el-icon-search"></i>搜索</el-menu-item>
          <el-menu-item index="2"><el-badge :value="3" class="item"><i class="el-icon-bell"></i></el-badge></el-badge></el-menu-item>
          <el-submenu index="3">
            <template slot="title">我的工作台</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
          <el-submenu index="my" menu-trigger="click">
            <template slot="title"><img src="~/assets/images/img-holder.jpg" style="width:30px;"> {{currentUser.account.username && currentUser.account.profile.nickname}} </template>
            <el-menu-item index="/my/profile"><i class="icon-cog"></i> 个人设置</el-menu-item>
            <el-menu-item index="/signOut"><i class="icon-switch"></i> 安全退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside ref="sidebar" :width="sidebarWidth" >
        <el-menu default-active="1-4-1" class="sidebar"  :collapse="isCollapse"  style="height: 100%">
          <li class="toggle-sideber">
            <a @click="toggleSidebar(isCollapse)" :class="!isCollapse?'sider-opened':'sider-closed'">
              <i class="icon-paragraph-justify3"></i>
            </a>
          </li>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-aside ref="secSidebar" >
          <el-menu default-active="1-4-1" class="sidebar"  :collapse="secCollapse"  style="height: 100%">
            <li class="toggle-sideber">
              <a  >
                <i class="el-icon-back"></i>
              </a>
            </li>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main><nuxt></nuxt></el-main>
      </el-container>
    </el-container>
  </el-container>
</nav>

  
</template>

<script>
export default {
  name: 'default-layout',
  data() {
    return {
      currentUser: this.$store.state.user,
      isCollapse: true,
      secCollapse: false
    };
  },
  computed: {
    sidebarWidth: function() {
      return this.isCollapse ? 'auto' : '200px';
    }
  },
  methods: {
    toggleSidebar(isCollapse) {
      this.isCollapse = !isCollapse;
    }
  },
  mounted() {
  }
};
</script>


<style rel="stylesheet/scss" lang="scss">
@import '~assets/scss/index.scss';
$black:#37474f;
$nav-height:50px;
.el-header {
  height: $nav-height !important;
  background-color: $black;
  color: #ffffff !important;
  line-height: $nav-height !important;
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
  ul.el-menu.sidebar {
    li.toggle-sideber{
      text-align: center;
      padding: 5px 0;
      a.sider-opened i{
        transform: rotate(90deg);
      }
      a.sider-closed i{
        
      }
    }
    .el-submenu [class^=el-icon-],.el-menu-item [class^=el-icon-]{
      margin-right:20px;
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

</style>

