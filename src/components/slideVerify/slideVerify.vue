<!--
 * @Description: 这是***页面（组件）
 * @Date: 2023-01-10 09:53:39
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-01-13 18:10:58
-->
<template>
  <div class="pika-mask" v-if="isShowModel">
    <div class="pika-mask-container">
      <div class="silde_box">
        <div class="title">安全验证</div>
        <slide-verify
          ref="block"
          :imgs="imgs"
          :w="widths"
          :h="heights"
          :slider-text="text"
          :accuracy="accuracy"
          @again="onAgain"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
        ></slide-verify>
        <!-- <button class="btn" @click="handleClick">在父组件可以点我刷新哦</button> -->
        <div>{{ msg }}</div>
      </div>
    </div>
  </div>
</template>
   
  <script lang="ts">
import { defineComponent, ref } from "vue";
// 局部注册组件，需要单独引用组件样式
// 只提供局部引用的方式，不再采用插件形式，方便按需加载，减少主包大小
import SlideVerify, { SlideVerifyInstance } from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";
import { defineEmits } from "vue";
import { loginStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

export default defineComponent({
  components: { SlideVerify },

  setup(props, context) {
    const store = loginStore();
    
    const { isShowModel } = storeToRefs(store);
    const ouwen1: any = new URL(
      "@/assets/image/codeImg/ouwen1.jpg",
      import.meta.url
    );
    const ouwen2: any = new URL(
      "@/assets/image/codeImg/ouwen2.jpg",
      import.meta.url
    );
    const ouwen3: any = new URL(
      "@/assets/image/codeImg/ouwen3.jpg",
      import.meta.url
    );
    const ouwen4: any = new URL(
      "@/assets/image/codeImg/ouwen4.jpg",
      import.meta.url
    );
    const imgs: any = ref([ouwen1, ouwen2, ouwen3, ouwen4]);
    const widths: any = ref(360);
    const heights: any = ref(250);
    // const isShowVerify: any = ref(false)

    const msg = ref("");
    const block = ref<SlideVerifyInstance>();

    const onAgain = () => {
      msg.value = "检测到非人为操作的哦！ try again";
      // 刷新
      block.value?.refresh();
    };

    const onSuccess = (times: number) => {
      msg.value = `login success, 耗时${(times / 1000).toFixed(1)}s`;
      store.changeState("isShowModel", false);
      store.changeState("successVerify", true);
      context.emit('refresh')
      // const emit = defineEmits(['refresh']);
      // console.log(emit,'emit')
      // emit('refresh')
    };

    const onFail = () => {
      msg.value = "验证不通过";
    };

    const onRefresh = () => {
      msg.value = "点击了刷新小图标";
    };

    const handleClick = () => {
      // 刷新
      block.value?.refresh();
      msg.value = "";
    };

    return {
      isShowModel,
      widths,
      heights,
      block,
      msg,
      imgs,
      text: "向右滑动->",
      accuracy: 5,
      // isShowVerify,
      // emit,
      onAgain,
      onSuccess,
      onFail,
      onRefresh,
      handleClick,
    };
  },
});
</script>
  <style scoped>
.pika-mask {
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000000000;
  font-size: 12px;
}
.pika-mask .pika-mask-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  color: #999;
  font-size: 13px;
}
.silde_box {
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
:deep(.slide-verify-slider) {
  font-size: 12px;
}
:deep(.slide-verify-refresh-icon) {
  top: -7px;
}
</style>