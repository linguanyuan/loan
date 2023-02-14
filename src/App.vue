<!--
 * @Description: 这是***页面（组件）
 * @Date: 2022-12-26 14:46:59
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2022-12-26 16:13:14
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import headerVue from './components/headerCom/header.vue';
</script>

<template>
  <headerVue></headerVue>

  <RouterView />
</template>

<style scoped>

</style>
