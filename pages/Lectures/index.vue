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
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { dontletExamBeforeLecture } from "~/store/dontletExamBeforeLecture";
const store = dontletExamBeforeLecture();

const finishEnabled = ref(false);
const lectureData = reactive({ images: [], frames: [] });

const handleLectureFinished = (data) => {
  finishEnabled.value = true;
  lectureData.images = data.imagearray;
  lectureData.frames = data.frames;
  console.log("Images:", lectureData.images);
  console.log("Frames:", lectureData.frames);
};
onUnmounted(() => {
  store.completeLecture();
});
</script>
