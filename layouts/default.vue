<template>
  <el-container style="height: 100%">
    <el-header>
      <div class="logo">
        <a href="https://github.com/xingshanghe/neadmin" target="_blank">
          Neadmin
        </a>
      </div>
      <nav class="header-nav">
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
      </nav>
    </el-header>
    <el-container>
      <el-aside >Aside</el-aside>
      <el-main><nuxt></nuxt></el-main>
    </el-container>
  </el-container>
</nav>

  
</template>

<script>
export default {
  name: 'default-layout',
  data() {
    return {
      currentUser: this.$store.state.user
    };
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
  height: $nav-height !important;;
  background-color: $black;
  color: #ffffff !important;
  line-height: $nav-height !important;
  .logo{
    display: inline-block;
    float: left;
  }
  .header-nav{
    display: inline-block;
    float: right;
    margin: 0;
    padding-right: 15px;
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

</style>

