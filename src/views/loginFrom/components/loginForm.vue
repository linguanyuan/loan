<!--
 * @Description: 这是登录页面（组件）
 * @Date: 2022-12-26 16:29:39
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-21 18:50:58
-->
<template>
  <div>
    <van-form
      name="login"
      ref="login"
      validate-trigger="onChange"
      :validate-first="true"
      :show-error="false"
      @submit="onSubmit"
    >
      <van-cell-group inset>
        <van-field
          v-model="form.phone"
          name="phone"
          type="tel"
          :maxlength="11"
          placeholder="请输入手机号"
          :rules="[
            { validator: validatorPhone, message: '请输入正确的手机号' },
          ]"
        />
        <van-field
          v-model="form.smsVerificationCode"
          name="smsVerificationCode"
          type="digit"
          :maxlength="4"
          placeholder="请输入验证码"
          :rules="rules.smsVerificationCode"
        >
          <template #button>
            <van-button
              plain
              native-type="button"
              v-bind:class="[
                (validatorPhone(form.phone) && codeText === '获取验证码') ||
                (codeText === '重新获取' && !timer)
                  ? 'reg_active'
                  : 'reg_disActive',
              ]"
              :disabled="checkCodeStatus"
              @click="getCode"
            >
              <template v-if="countdown">{{ codeText }}</template>
              <template v-if="!countdown"
                >{{ codeText }} ({{ count }})</template
              >
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <!-- 前置页 -->
      <div v-if="propsOther.type === 'ad'" class="submit">
        <van-button
          type="primary"
          block
          native-type="submit"
          :loading="loading"
        >
          立即查看额度
        </van-button>
        <van-checkbox v-model="agree" :label-disabled="true">
          <div
            class="
              flex flex-direction
              text-color-lightgray text-md
              line-sm
              margin-bottom-sm margin-xs
              padding-top-xs
            "
          >
            <div class="flex">
              <span class="nowrap">勾选即代表本人已阅读并同意</span>
              <span class="main-text-color nowrap">
                <a href="">《用户注册协议》</a>
              </span>
            </div>
            <span class="main-text-color">
              <a href="">《隐私协议》</a>
            </span>
          </div>
          <template #icon="props">
            <div class="checkbox-img h100 flex align-center">
              <van-image
                :src="props.checked ? adCheckBox.check : adCheckBox.noCheck"
              />
            </div>
          </template>
        </van-checkbox>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  computed,
  defineProps,
  defineEmits,
  inject,
  watch,
} from "vue";
import { $ref } from "vue/macros";
import { loginStore } from "@/stores/counter";
import { globalStore } from "@/stores/global";
import { storeToRefs } from "pinia";

const api: any = inject("$api"); // 通过inject获取挂载在全局的globalFunc方法
const store = loginStore();
const globalStores = globalStore();
const { isShowModel } = storeToRefs(store);

const propsOther = defineProps({
  type: {
    type: String,
    default: "ad",
  },
});
const emit = defineEmits(["getData"]);

const loading = $ref(false);
const reg = /^1[3|4|5|7|8|9]\d{9}$/;
// 同意协议
const agree = $ref(true);
const adCheckBox: any = {
  check: new URL("@/assets/image/checkbox/checkbox.png", import.meta.url),
  noCheck: new URL("@/assets/image/checkbox/grayCheckBox.png", import.meta.url),
};
const homeCheckBox: any = {
  check: new URL("@/assets/image/checkbox/checkbox.png", import.meta.url),
  noCheck: new URL("@/assets/checkbox/whiteCheckBox.png", import.meta.url),
};
const rules = {
  // phone: [{ pattern: reg, message: "请输入正确的手机号" }],
  smsVerificationCode: [{ required: true, message: "请输入验证码" }],
};
const form = reactive({
  phone: "",
  smsVerificationCode: "",
});
let codeText = $ref("获取验证码");
let countdown = $ref<Boolean>(true);let count = $ref<any>("");
let timer: any = $ref(null);

watch(
  () => isShowModel.value,
  (newVal, oldVal) => {
    if (isShowModel.value === false && codeText === "获取验证码") {
      getCode();
    }
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
);

function getCode() {
  if (isShowModel.value) {
    getCodeCallback();
  } else {
    store.changeState("isShowModel", true);
    // emit('getData', true)
  }
  // globalStores.openDialog({
  //   content: () => import("@/components/canvas/textClickCode.vue")
  // });
}

function getCodeCallback() {
  let TIME_COUNT = 5;
  if (!timer) {
    count = TIME_COUNT;
    countdown = false;
    codeText = "重新获取";
    timer = setInterval(() => {
      if (count > 0 && count <= TIME_COUNT) {
        count--;
      } else {
        countdown = true;
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  }
}

const checkCodeStatus = computed(() => {
  return sltEle();
});

// 校验函数返回 true 表示校验通过，false 表示不通过
const validatorPhone = (val: any) => {
  return /^1[3456789]\d{9}$/.test(val);
};

function sltEle() {
  if (validatorPhone(form.phone) && codeText === "获取验证码") {
    countdown = true;
    return false;
  }
  if (codeText === "重新获取" && !timer) {
    countdown = true;
    return false;
  }
  return true;
}

function onSubmit(values: any) {
  console.log("submit", values.phone);
  api.userSms({ phone: values.phone });
}

//关键点 把 子组件方法暴露给父组件
defineExpose({
  getCode,
});
</script>
<style lang="less" scoped>
.main-text-color {
  color: #3c78f3;
}
.checkbox-img {
  width: 30px;
  height: 30px;
}

.home {
  .submit {
    .home-checkbox {
      color: #cee4ff;
    }
    .submit-btn {
      .radius-45;
      .bold-df;
      .text-36;
      .text-color-blue;
      margin-top: 86px;
      width: 380px;
      height: 90px;
      background: linear-gradient(0deg, #cde4ff, #ffffff);
      box-shadow: 0px 20px 20px 0px rgba(0, 61, 129, 0.2);
    }
  }
}
:deep(.van-field__button) {
  border-radius: 5px;
}
:deep(.van-checkbox__label) {
  padding-top: 14px;
}

.reg_active {
  color: rgb(25, 137, 250);
  opacity: 1;
}
.reg_disActive {
  opacity: 0.5;
  color: rgb(25, 137, 250);
}
</style>
