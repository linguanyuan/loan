<!--
 * @Description: 这是***页面（组件）
 * @Date: 2022-12-26 14:46:59
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-16 17:28:27
-->
<template>
  <div class="w100 relative">
    <div class="w100">
      <van-image height="auto" :src="getImageUrl" />
      <div
        class="
          tips-container
          margin-left-xxl margin-right-xxl
          flex flex-direction
          align-center
          margin-top margin-bottom
          text-color-lightgray text-xs
          bold-xs
          line-xs
        "
      >
        <span>资金来源：民和汇鑫小额贷款有限责任公司</span>
        <span>贷款有风险，借款需谨慎</span>
        <span>具体额度、放款时间及分期期数以实际审批结果为准</span>
        <span>请根据个人能力合理借贷，理性消费，避免逾期</span>
      </div>
    </div>
    <div class="login-container w100 z-index-30 top-0 absolute">
      <div
        class="
          flex flex-direction
          margin-left margin-right
          radius-lg
          overflow-x-hidden
        "
      >
        <div
          class="
            login-title
            flex
            justify-center
            align-center
            text-color-white
            bold-df
            text-xxl
          "
        >
          凭身份证申请
        </div>
        <div
          class="padding-top-xxl padding-left-lg padding-right-lg color-white"
        >
          <login-form ref="getLogin" @getData="logs"></login-form>
        </div>
      </div>
    </div>
    <slideVerify ref="verify" @refresh="fatherGetCodeFun" />
    <textClickCode />
  </div>
</template>

<script setup lang='ts'>
import loginForm from "../views/loginFrom/loginForm.vue";
import { ref, inject } from "vue";
import slideVerify from "@/components/slideVerify/slideVerify.vue";
import textClickCode from "@/components/canvas/textClickCode.vue";
const getImageUrl: any = new URL("../assets/image/bg.png", import.meta.url);
const verify = ref(); //verify 要和Son组件上的class名相同
const getLogin = ref();
const api: any = inject("$api"); // 通过inject获取挂载在全局的globalFunc方法

function fatherGetCodeFun() {
  getLogin.value.getCode();
}

function logs(ctx: any) {
  console.log("getData");
}

// const func1 = () => {
//   api.userGetUser();
// };
// func1();
</script>

<style lang="less" scoped>
.login-container {
  margin-top: 571px;
  .login-title {
    height: 69px;
    background: #ff8858;
  }
}
.tips-container {
  background: rgba(0, 0, 0, 0);
}

.puzzle-box {
  width: 300px;
  height: 200px;
}
</style>
