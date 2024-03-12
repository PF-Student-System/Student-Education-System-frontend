<template>
  <div>
    <handlingLectures @lectureFinished="handleLectureFinished" />
    <nuxt-link to="/lectureSuccessful" class="no-underline">
      <button :disabled="!finishEnabled" class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
        Finish Lecture
      </button>
    </nuxt-link>
    <!-- Display the slideshow buttons and image -->
    <div class="m-4">
      <button @click="startSlideshow(lectureData.images)">Start Images Slideshow</button>
      <button @click="startSlideshow(lectureData.frames)">Start Frames Slideshow</button>
      <img :src="currentImage" alt="currentImages" v-if="currentImage">
    </div>
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import { slideShow } from '@/mixins/VideoShow';

const finishEnabled = ref(false);
const lectureData = reactive({ images: [], frames: [] });
const { startSlideshow, currentImage } = slideShow();

const handleLectureFinished = (data) => {
  finishEnabled.value = true;
  lectureData.images = data.imagearray;
  lectureData.frames = data.frames;
  console.log("Images:", lectureData.images);
  console.log("Frames:", lectureData.frames);
};

</script>

<style>
/* Your styles here */
</style>
