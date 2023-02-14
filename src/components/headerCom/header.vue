<!--
 * @Description: 这是头部组件（组件）
 * @Date: 2022-12-26 15:48:59
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2022-12-26 16:18:22
-->
<template>
  <div>
    <van-nav-bar
      title="银信金"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";

const onClickLeft = () => history.back();
</script>
<style scoped lang="less"></style>
