<template>
  <el-container class="home-container">
    <el-aside :width="isOpen? '200px':'64px'">
      <!-- logo -->
      <div class="logo" :class="{smallLogo:!isOpen}"></div>
      <el-menu
        :default-active="$router.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-position"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 图标 -->
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <!-- 文字 -->
        <span class="text">江苏传智博客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img class="headIocn" :src="photo" alt />
            <span class="name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock"  @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      // 是不是展开的
      isOpen: true,
      // 头像
      photo: '',
      // 名称
      name: ''
    }
  },
  created () {
    const user = local.getUser() || {}
    this.photo = user.photo
    this.name = user.name
    // 绑定事件updataName
    eventBus.$on('updataName', (name) => {
      this.name = name
    })
    // 绑定事件updataPhoto
    eventBus.$on('updataPhoto', (photo) => {
      this.photo = photo
    })
  },
  methods: {
    toggleMenu () {
      // 切换侧边栏展开与收起
      this.isOpen = !this.isOpen
    },
    setting () {
      this.$router.push('/settiing')
    },
    logout () {
      local.delUser()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/img/logo_admin.png) no-repeat center /
        140px auto;
    }
    .smallLogo {
      background-image: url(../../assets/img/logo_admin_01.png);
      background-size: 32px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    height: 60px;
    line-height: 60px;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      font-size: 20px;
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      .headIocn {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border: none;
      }
      .name {
        font-size: 700;
        vertical-align: middle;
        margin-left: 5px;
        border: none;
      }
    }
  }
}
</style>
