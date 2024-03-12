<template>
    <div class="max-w-2xl mx-auto mt-8">
      <!-- Video Player with a static source -->
      <video ref="videoPlayer" controls class="w-full shadow-lg rounded-lg" @ended="handleVideoEnd">
        <source src="@/assets/mov_bbb.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </template>
  
  <script setup>
import { ref, defineEmits, onMounted } from 'vue';
import screenshot from '@/mixins/screenshot';
import camScreenshot from '@/mixins/camScreenshot';

const videoPlayer = ref(null);
// const videoRef=ref(null);
const emits = defineEmits(['lectureFinished']);

const { takeScreenshot, stopCaptureScreenshot, frames } = screenshot();
const { startCapture, stopCapture, imagearray } = camScreenshot();

onMounted(() => {
  takeScreenshot();
  startCapture();
});

const handleVideoEnd = () => {
  // Stop capturing when the lecture ends
  stopCapture();
  stopCaptureScreenshot();

  // Emitting the event with images and frames
  emits('lectureFinished', { imagearray, frames });
  console.log('frames from',frames)
  console.log('imagearray',imagearray)
};


</script>
