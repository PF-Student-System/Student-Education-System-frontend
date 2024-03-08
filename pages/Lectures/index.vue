<template>
  <div class="max-w-2xl mx-auto mt-8">
    <video controls class="w-full shadow-lg rounded-lg" @error="handleVideoError">
      <source :src="videoUrl" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <nuxt-link to="/lectureSuccessful" class="no-underline">
      <button class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
        Finish Lecture
      </button>
    </nuxt-link>

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


const videoUrl = ref(new URL('@/assets/mov_bbb.mp4', import.meta.url).href);
const { takeScreenshot, stopCapture, frames } = screenshot();
const { startSlideshow, currentImage } = slideShow();

onMounted(() => {
  videoUrl.value = new URL('@/assets/mov_bbb.mp4', import.meta.url).href;
});

const handleVideoError = (event) => {
  console.error("Error loading video:", event);
};

</script>

<style>
/* Your styles here */
</style>
