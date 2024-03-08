<template>
  <div class="max-w-2xl mx-auto mt-8">
    <video ref="videoPlayer" controls class="w-full shadow-lg rounded-lg">
      <source src="@/assets/mov_bbb.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <button class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
      <nuxt-link to="/lectureSuccessful" class="no-underline">Finish Lecture</nuxt-link>
    </button>

    <div>
      <button @click="takeScreenshot">Take screenshot</button>
      <button @click="stopCapture">Stop capture</button>
      <button @click="startSlideshow(frames)">Start slideshow</button>
      <img :src="currentImage" alt="Current Image" v-if="currentImage">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import screenshot from '@/mixins/screenshot';
import { slideShow } from '@/mixins/VideoShow';

// const videoUrl = ref('@/assets/mov_bbb.mp4');
// const videoPlayer = ref(null);
const { takeScreenshot, stopCapture, frames } = screenshot();
const { startSlideshow, currentImage } = slideShow();
</script>

<style>
/* Your styles here */
</style>
