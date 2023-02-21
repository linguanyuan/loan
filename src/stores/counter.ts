/*
 * @Description: 这是***页面（组件）
 * @Date: 2022-12-26 14:46:59
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-20 16:27:51
 */
import { defineStore } from 'pinia'

export const loginStore = defineStore('loginVerify', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      name: 'loginVerify',
      isShowModel: null
    }
  },
  // 计算属性
  getters: {
  },
  // 同步和异步方法，都可以写这里
  actions: {
    changeState(type: any, data: any): void {
      this[type] = data
    }
    // async registerUser(login, password) {
    //   try {
    //     this.userData = await api.post({ login, password })
    //     showTooltip(`Welcome back ${this.userData.name}!`)
    //   } catch (error) {
    //     showTooltip(error)
    //     // 让表单组件显示错误
    //     return error
    //   }
    // },
  },
})