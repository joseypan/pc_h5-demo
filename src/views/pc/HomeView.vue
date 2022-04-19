<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <div class="qrcode">
      <button @click="clickCode">打开相机</button>
      <Approve
        :qrcode="qrcode"
        v-show="qrcode"
        :camera="camera"
        :torchActive="torchActive"
        @switchCamera="switchCamera"
        @ClickFlash="ClickFlash"
        @turnCameraOff="turnCameraOff"
        @onDecode="onDecode"
        @onInit="onInit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Approve from "./Approve.vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
let qrcode = ref(true);
let torchActive = ref(false);
let camera = ref("off");
// 打开相机
const clickCode = () => {
  // camera:: 'rear'--前摄像头，'front'后摄像头，'off'关闭摄像头，会获取最后一帧显示，'auto'开始获取摄像头
  qrcode.value = true;
  camera.value = "rear";
};
// 扫码结果回调
const onDecode = (result: any) => {
  // result, 扫描结果，可以根据自己的需求来实现相应的功能
  console.log(result);
  turnCameraOff();
};
// 相机反转
const switchCamera = () => {
  switch (camera.value) {
    case "front":
      camera.value = "rear";
      break;
    case "rear":
      camera.value = "front";
      break;
    default:
      // this.$toast('错误')
      console.log("错误");
  }
};
// 关闭相机？？？？？？
const turnCameraOff = () => {
  camera.value = "off";
  qrcode.value = false;
};
// 打开手电筒
const ClickFlash = () => {
  switch (torchActive.value) {
    case true:
      torchActive.value = false;
      break;
    case false:
      torchActive.value = true;
      break;
    default:
      // this.$toast('错误')
      console.log("错误");
  }
};

// 检查是否调用摄像头
const onInit = async (promise: any) => {
  console.log(promise);
  try {
    await promise;
  } catch (error: any) {
    console.log(error);
    if (error.name === "StreamApiNotSupportedError") {
      alert("StreamApiNotSupportedError");
    } else if (error.name === "NotAllowedError") {
      alert("Hey! I need access to your camera");
    } else if (error.name === "NotFoundError") {
      alert("Do you even have a camera on your device?");
    } else if (error.name === "NotSupportedError") {
      alert(
        "Seems like this page is served in non-secure context (HTTPS, localhost or file://)"
      );
    } else if (error.name === "NotReadableError") {
      alert("Couldn't access your camera. Is it already in use?");
    } else if (error.name === "OverconstrainedError") {
      alert(
        "Constraints don't match any installed camera. Did you asked for the front camera although there is none?"
      );
    } else {
      alert("UNKNOWN ERROR: " + error.message);
    }
  }
};
</script>
