<template>
  <!-- 全屏容器 -->
  <div class="container">
    <!-- 卡片容器 -->
    <el-card>
      <img src="../../assets/img/logo_index.png" alt />
      <!-- 表单 -->
      <!-- el-form 表单容器 -->
      <!-- ref="form" ref作用获取被标记的 dom元素|组件实例  -->
      <!-- :model="form" 属性绑定 表单的数据对象-->
      <el-form :model="LoginFrom">
        <el-form-item>
          <!-- 表单元素 -->
          <el-input v-model="LoginFrom.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="LoginFrom.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px;"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      LoginFrom: {
        modlie: '',
        code: ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  /*  背景图尺寸：拆分写法 background-size
        组合写法：background:..... / 背景图尺寸(width,height)
        特殊写法：cover  等比例缩放铺满容器多余不显示  contain 等比例缩放完全显示在容器内 */
  background: url(../../assets/img/login_bg.jpg) no-repeat center/cover;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
