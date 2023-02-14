<template>
  <div id="clickCode" class="flex justify-center align-center" v-cloak>
    <div class="verify-container" :style="{ width: `${width}px` }">
      <div class="refresh" @click="reset">
        <svg
          t="1637315258145"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2420"
          width="20"
          height="20"
        >
          <path
            d="M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584C308.32 883.232 142.112 717.024 142.112 512S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z"
            p-id="2421"
            fill="#8a8a8a"
          ></path>
        </svg>
      </div>
      <div class="pic">
        <canvas
          class="canvas"
          ref="canvas"
          :width="width"
          :height="height"
          @click="createPointer"
        ></canvas>
        <span
          class="pointer"
          v-for="(item, index) in pointer"
          :key="index"
          :style="{ left: `${item.x}px`, top: `${item.y}px` }"
        >
          <i>{{ index + 1 }}</i>
        </span>
      </div>
      <div :class="['toolbar', state]">
        <p v-if="state === 'fail'">验证失败</p>
        <p v-else-if="state === 'success'">验证通过</p>
        <p v-else>
          请顺序点击【<span v-for="(item, index) in tips" :key="index">{{
            item.character
          }}</span
          >】
        </p>
      </div>
    </div>
    <br />
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
  onMounted,
  onBeforeUnmount,
} from "vue";

const App = defineProps({
  width: {
    type: Number,
    default: 320,
  },
  height: {
    type: Number,
    default: 160,
  },
  fontStr: {
    type: String,
    default:
      "赵钱孙李周吴郑王朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐",
  },
  fontNum: {
    // 显示几个
    type: Number,
    default: 5,
  },
  checkNum: {
    // 点击验证数
    type: Number,
    default: 3,
  },
  accuracy: {
    // 精度
    type: Number,
    default: 15,
  },
  images: {
    type: Array,
    default: [
      new URL("@/assets/image/codeImg/scenery1.jpg", import.meta.url),
      new URL("@/assets/image/codeImg/scenery2.jpg", import.meta.url),
      new URL("@/assets/image/codeImg/scenery3.jpg", import.meta.url),
      new URL("@/assets/image/codeImg/scenery4.jpg", import.meta.url),
    ],
  },
});

const canvas = ref();
const bgImg = ref();
const ctx = ref();
let fontArr: any[] = reactive([]);
let tips = ref([]as any[]);
let pointer: any[] = reactive([]);
let state: any = ref("");
const timeIns = ref();

onMounted(() => {
  init();
});

function init() {
  console.log("init", canvas.value);
  ctx.value = canvas.value.getContext("2d");
  getImg();
}

function getImg() {
  const img = document.createElement("img");
  const imagesLen = App.images.length;
  const randomIndex = Math.floor(Math.random() * imagesLen);
  img.crossOrigin = "Anonymous";
  img.src = App.images[randomIndex] as string;
  bgImg.value = img;

  img.onload = () => {
    console.log("图片加载完成");
    draw();
  };
}

function draw() {
  // 绘制背景图
  ctx.value.drawImage(bgImg.value, 0, 0, App.width, App.height);

  for (let i = 0; i < App.fontNum; i++) {
    const character = getRandomCharacter();
    console.log(character);
    const fontSize = randomNum(20, (App.height * 1) / 4);
    const fontWeight = Math.random() > 0.5 ? "bold" : "normal";
    const fontStyle = Math.random() > 0.5 ? "italic" : "normal";
    const fontFamily = Math.random() > 0.5 ? "sans-serif" : "serif";
    const x = (App.width / App.fontNum) * i + 10;
    const y = Math.random() * (App.height - fontSize);

    ctx.value.fillStyle = randomColor(0, 255);
    ctx.value.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.value.textBaseline = "top";
    ctx.value.fillText(character, x, y);

    fontArr.push({
      character,
      // fontSize,
      x,
      y,
    });
  }
  console.log("fontArr", fontArr);

  for (let i = 0; i < App.checkNum; i++) {
    const randomIndex = Math.floor(Math.random() * fontArr.length);
    const character = fontArr.splice([randomIndex], 1)[0];
    tips.value.push(character);
    // console.log(character, this.fontArr)
  }
  console.log("tips", tips);
}

// 获取随机字符
function getRandomCharacter(): any {
  const fontStrLen = App.fontStr.length;
  const randomIndex = Math.floor(Math.random() * fontStrLen);
  const character = App.fontStr.charAt([randomIndex]);

  // debugger
  const isSome = fontArr.some((item) => {
    return item.character === character;
  });
  if (isSome) {
    console.log(`>>>${character}已存在>>>`);
    return getRandomCharacter();
  } else {
    return character;
  }
}

function randomNum(min: any, max: any) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor(min: any, max: any) {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function createPointer(e: { offsetX: number; offsetY: number }) {
  // console.log(e)
  const canvasRect = canvas.value.getBoundingClientRect();
  const x = e.offsetX - 15;
  const y = e.offsetY - 15;

  if (pointer.length < tips.value.length) {
    pointer.push({ x, y });
    state.value = "active";
  }
  if (pointer.length === tips.value.length) {
    const isPass = verify();
    if (isPass) {
      state.value = "success";
    } else {
      state.value = "fail";
      // 如果失败则1000毫秒后重置
      timeIns.value = setTimeout(() => {
        reset();
      }, 1000);
    }
  }
}

// 判断精度
function verify() {
  console.log("验证");
  const result = pointer.every((item, index) => {
    const _left = item.x > tips.value[index].x - App.accuracy;
    const _right = item.x < tips.value[index].x + App.accuracy;
    const _top = item.y > tips.value[index].y - App.accuracy;
    const _bottom = item.y < tips.value[index].y + App.accuracy;
    return _left && _right && _top && _bottom;
  });
  console.log(result);
  return result;
}

// 重置
function reset() {
  fontArr = [];
  tips.value = [];
  pointer = [];
  state.value = "";
  ctx.value.clearRect(0, 0, App.width, App.height);
  getImg();
}

// beforeDestroy
onBeforeUnmount(() => {
  clearTimeout(timeIns.value);
});
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.verify-container {
  /*border: 1px solid #e4e4e4;*/
  margin: 20px auto;
  position: relative;
  overflow: hidden;
  user-select: none;
}
.pic {
  position: relative;
}
.canvas {
  display: block;
}
.pointer {
  background: #1abd6c;
  border-radius: 50%;
  padding: 15px;
  position: absolute;
}
.pointer i {
  color: #fff;
  font-style: normal;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.toolbar {
  width: 100%;
  height: 40px;
  border: 1px solid #e4e4e4;
  background: #f7f7f7;
  color: #666;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.toolbar.active {
  color: #fff;
  background: #1991fa;
  border: 1px solid #1991fa;
}
.toolbar.success {
  color: #fff;
  background: #52ccba;
  border: 1px solid #52ccba;
}
.toolbar.fail {
  color: #fff;
  background: #f57a7a;
  border: 1px solid #f57a7a;
}
.refresh {
  display: flex;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
  cursor: pointer;
}
</style>