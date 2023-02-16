<!--
 * @Description: 这是***页面（组件）
 * @Date: 2022-05-24 16:53:21
 * @Author: zouzheng
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-16 14:51:31
-->
<template>
    <van-overlay :show="true" @click="() => {}" :z-index="99">
      <div
        class="w100 h100 flex justify-center align-center animate__animated animate__zoomIn animate__fastest"
      >
        <div class="simple-dialog w100 flex flex-direction align-center">
          <!-- <component :is="dialog.content"></component>
          <van-button
            type="none"
            @click="dialog.close"
            class="w100 flex justify-center text-50 color-white margin-top-40"
            v-if="dialog.closeBtn"
          >
            <van-icon name="close" />
          </van-button> -->
        </div>
      </div>
    </van-overlay>
  </template>
  
  <script  lang='ts'>
  import { mapState } from "pinia";
 
  </script>
  
  <style lang="less" scoped>
  .simple-dialog {
    width: 640px;
  }
  </style>
  