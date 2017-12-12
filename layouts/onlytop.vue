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

