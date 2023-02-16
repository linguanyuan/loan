/*
 * @Description: 这是***页面（组件）
 * @Date: 2022-12-26 14:46:59
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-16 16:18:34
 */
import { defineStore } from "pinia";

export const globalStore = defineStore("globalStore", {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      globalCom: {
        dialog: () => import("@/components/global/dialog"),
      },
      // 可满屏弹出框
      dialog: {
        show: false,
        // 弹框内部插槽
        content: "",
        // 是否显示关闭按钮
        closeBtn: true,
        // 弹窗关闭函数，可不传
        close: () => {},
        // 传递参数
        data: {},
      },
      successVerify: false,
    };
  },
  // 计算属性
  getters: {},
  // 同步和异步方法，都可以写这里
  actions: {
    changeState(type: any, data: any): void {
      console.log(this)
      this[type] = data;
    },
    /**
     * @description: 打开dialog弹窗
     * @param {*}content/插槽组件
     * @param {*}close/关闭函数
     * @param {*}closeBtn/是否展示关闭按钮
     * @param {*}data/传递参数
     * @return {*}
     */
    openDialog ({ content, close, closeBtn, data}: any) {
      // 关闭函数
      const fuc = async () => {
        if (close) {
          const result = await close();
          if (result === false) {
            return;
          }
        }
        // this.changeState("dialog", { ...state.dialog, show: false });
      };
      console.log('dialog', this);
      /* eslint-disable */
      this.dialog = {
        show: true,
        closeBtn: closeBtn === false ? false : true,
        content,
        close: fuc,
        data: data || {},
      };
    },
  },
});
