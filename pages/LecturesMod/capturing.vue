<template>
    <div>
      <button @click="startCapture(videoRef)" :disabled="isCapturing">Start Capture</button>
      <button @click="stopCapture" :disabled="!isCapturing">Stop Capture</button>
      <button @click="startSlideshow" >Start Slideshow</button>
      <button @click="stopSlideshow" :disabled="!images.length || isCapturing">Stop Slideshow</button>
      <video ref="videoRef" autoplay style="display: none;"></video>
      <canvas ref="canvasRef" style="display: none;"></canvas>
      <img :src="currentImage" alt="Current Frame" v-if="currentImage"/>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useWebcamRecorder } from '../mixins/WebRecorder';
  
  const videoRef = ref(null);
  const canvasRef = ref(null);
  const { images, currentImage, isCapturing, startCapture, stopCapture, startSlideshow, stopSlideshow, downloadVideo } = useWebcamRecorder();
  
  const download = () => downloadVideo(canvasRef.value);
  </script>
  