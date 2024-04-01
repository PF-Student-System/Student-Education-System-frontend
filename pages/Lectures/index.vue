<template>
  <div class="flex flex-col items-center">
    <div class="w-[80%]">
      <handlingLectures @lectureFinished="handleLectureFinished" />
      <nuxt-link to="/lectures/lectureSuccessful" class="no-underline">
        <button
          :disabled="!finishEnabled"
          class="btn font-bold py-2 px-4 mt-8 mb-8"
        >
          Finish Lecture
        </button>
      </nuxt-link>
    </div>
    <!-- Display the slideshow buttons and image -->
    <!-- <div class="m-4">
      <button @click="startSlideshow(lectureData.images)">Start Images Slideshow</button>
      <button @click="startSlideshow(lectureData.frames)">Start Frames Slideshow</button>
      <img :src="currentImage" alt="currentImages" v-if="currentImage">
    </div> -->
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { slideShow } from "@/mixins/VideoShow";
import { dontletExamBeforeLecture } from "~/store/dontletExamBeforeLecture";
const store = dontletExamBeforeLecture();

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
onMounted(async () => {
  // const res = await $fetch("http://localhost:3001/user/lactures", {
  //   method: "GET",
  //   headers: {
  //     Authorization:
  //       "Bearer " +
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDY1NjAzZWM0MmY4NDE1MDcwMWJlYiIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzExNjk5ODkwLCJleHAiOjE3MTE3MDM0OTB9.UGT5kFzoLgegnV2U7-_xYCNTMvmr_sxnd3SyHfw3O44",
  //   },
  // });
  // console.log(res.JSON.lacture);
  // try {
  //     const response = await this.$axios.get('https://568e-202-163-113-83.ngrok-free.app/user/lactures');
  //     const items = response.data;
  //     // Print items to the console
  //     console.log('Items:', items);
  //   } catch (error) {
  //     console.error('There was a problem with the fetch operation:', error);
  //   }
});

onUnmounted(() => {
  store.completeLecture();
  console.log("completed");
});
</script>

<style>
/* Your styles here */
</style>
