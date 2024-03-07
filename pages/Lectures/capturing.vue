<template>
    <div>
      <button @click="startCapture(videoRef)" :disabled="isCapturing">Start Capture</button>
      <button @click="stopCapture" :disabled="!isCapturing">Stop Capture</button>
      <button @click="startSlideshow(images)" >Start Slideshow</button>
      <button @click="stopSlideshow" :disabled="!images.length || isCapturing">Stop Slideshow</button>
      <video ref="videoRef" autoplay style="display: none;"></video>
      <canvas ref="canvasRef" style="display: none;"></canvas>
      <img :src="currentImage" alt="currentImg" v-if="currentImage">
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useWebcamRecorder } from '@/mixins/WebRecorder'
  import { slideShow} from '@/mixins/VideoShow'
  const videoRef = ref(null);
  const canvasRef = ref(null);
  const { images,isCapturing, startCapture, stopCapture} = useWebcamRecorder();
  const {startSlideshow,stopSlideshow,currentImage}=slideShow();
  

  </script>
  