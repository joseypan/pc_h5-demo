<template>
  <div class="qrcode">
    <div class="code">
      <!-- decode是扫描结果的函数，torch用于是否需要打开手电筒，init用于检查该设备是否能够调用摄像头的权限，camera可用于打开前面或者后面摄像头  -->
      <QrcodeDropZone @decode="onDecode">
        <QrcodeStream
          @decode="onDecode"
          :torch="torchActive"
          @init="onInitFn"
          :camera="camera"
        />
      </QrcodeDropZone>

      <div class="code-button">
        <button @click="switchCamera">相机反转</button>
        <button @click="clickFlash">打开手电筒</button>
        <button @click="turnCameraOff">关闭相机</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引用vue-qrcode-reader插件
import {
  QrcodeStream,
  QrcodeDropZone,
  QrcodeCapture,
} from "qrcode-reader-vue3";
import { defineProps, defineEmits, ref } from "vue";
const props = defineProps({
  camera: {
    type: String,
    default: "rear",
  },
  torchActive: {
    type: Boolean,
    default: false,
  },
  qrcode: {
    type: Boolean,
    default: false,
  },
  noStreamApiSupport: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([
  "onDecode",
  "switchCamera",
  "turnCameraOff",
  "ClickFlash",
  "onInit",
]);
let result = ref("");
// 扫码结果回调
const onDecode = (res: any) => {
  console.log("onDecode", res);
  result.value = res;
  emit("onDecode", res);
};
// 相机反转
const switchCamera = () => {
  emit("switchCamera");
};
// 关闭相机？？？？？？
const turnCameraOff = () => {
  emit("turnCameraOff");
};
// 打开手电筒
const clickFlash = () => {
  emit("ClickFlash");
};
// 检查是否调用摄像头
const onInitFn = (promise: Promise<any>) => {
  console.log("onInitFn", promise);
  emit("onInit", promise);
};
</script>
<style scoped lang="scss">
// .qrcode {
//   height: 300px;
// }
.qrcode-stream-camera {
  border: 1px solid #ccc;
}
</style>
