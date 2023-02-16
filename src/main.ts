/*
 * @Description: 这是***页面（组件）
 * @Date: 2022-12-26 14:46:59
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-15 17:28:17
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  Button,
  Loading,
  Form,
  Field,
  CellGroup,
  NavBar,
  Image as VanImage,
  Checkbox,
  CheckboxGroup,
} from "vant";
import plugins from "./plugin/index.js";
import "vant/lib/index.css";
import "amfe-flexible";

import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";

const app = createApp(App);
// const { api } = plugins;

app
  .use(Button)
  .use(Loading)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(NavBar)
  .use(VanImage)
  .use(Checkbox)
  .use(CheckboxGroup);
app.use(createPinia());
app.use(router);

/** 
 * 一，方法一(不推荐)
 * 注册在masin.js:
  app.config.globalProperties.$api = plugins; 
 * 组件上引用:
  const internalInstance: any = getCurrentInstance();
  console.log(internalInstance.appContext.config.globalProperties);
  // 通过getCurrentInstance().appContext.config.globalProperties获取全局方法并调用
  internalInstance.appContext.config.globalProperties.globalFunc();
 * 
 * 二，方法二(推荐)
 * provide / inject 将$api方法挂载在全局; 
 *  */ 
app.provide('$api', plugins.api);

app.mount("#app");
