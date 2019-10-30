// 导出一个本地操作用户信息的模块（设置用户，获取用户，清除用户）

const KEY = 'hm-toutiao-pc-user-key'
const local = {
  setUser (user) {
    // 存储setItem(key,value) key讲来获取的时候需要使用value json字符串格式
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
    // clear（）  删除所有的（不建议使用）
    // setItem(KEY)删除chu
  }
}
export default local
