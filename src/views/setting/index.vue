<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="userInfo.intro" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="updataPhoto"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">改一改更帅</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 修改头像（上传图片）
    async updataPhoto (result) {
      // 选择文件后触发当前函数，默认传入一个选择后的结果（包含文件信息）
      // 获取图片文件数据
      const file = result.file
      // 创建一个formData
      const formData = new FormData()
      // 追加图片数据到formData名字字段和后台一致
      formData.append('photo', file)
      // 使用axios提交数据
      const {
        data: { data }
      } = await this.$http.patch('user/photo', formData)
      // 拿着上传成功的地址进行预览
      this.userInfo.photo = data.photo
      // 提示
      this.$message.success('修改头像成功')
      // 更新home组件的photo
      eventBus.$emit('updataPhoto', data.photo)
      // 更新本地存储的photo
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    },
    // 获取用户信息
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    // 保存用户信息
    async saveInfo () {
      await this.$http.patch('user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email
      })
      // 提示
      this.$message.success('保存用户信息成功')
      // 更新home
      eventBus.$emit('updataName', this.userInfo.name)
      // 更新本地存储
      const user = local.getUser()
      user.name = this.userInfo.name
      local.setUser(user)
    }
  }
}
</script>

<style scoped lang="less">
</style>
