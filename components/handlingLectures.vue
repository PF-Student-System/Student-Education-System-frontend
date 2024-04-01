<template>
  <div class="mt-8 flex justify-center">
    <!-- Video Player with a static source -->
    <div v-if="!loaded" class="loader animate-spin"></div>
    <video
      v-if="loaded"
      ref="videoPlayer"
      controls
      class="w-full shadow-lg rounded-lg"
      @ended="handleVideoEnd"
    >
      <source :src="link" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import screenshot from "@/mixins/screenshot";
import camScreenshot from "@/mixins/camScreenshot";
import { useAuth } from "@/store/auth";
const store = useAuth();
const videoPlayer = ref(null);
const loaded = ref(false);
let link = "";

const emits = defineEmits(["lectureFinished"]);

const { takeScreenshot, stopCaptureScreenshot, frames } = screenshot();
const { startCapture, stopCapture, imagearray } = camScreenshot();
onBeforeMount(async () => {
  console.log("..>>>>>>>>>>>" + store.token);
  const res = await $fetch("http://localhost:3001/user/lactures", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + store.token,
    },
  });
  link = res.JSON.lacture;
  loaded.value = true;
  console.log(link);
});
onMounted(async () => {
  takeScreenshot();
  startCapture();
});

const handleVideoEnd = () => {
  stopCapture();
  stopCaptureScreenshot();

  emits("lectureFinished", { imagearray, frames });
  console.log("frames from", frames);
  console.log("imagearray", imagearray);
};
</script>

<style scoped>
.loader {
  border: 10px solid #0f172a;
  border-top: 10px solid #00c16a;
  border-right: 10px solid #00c16a;
  border-bottom: 10px solid #00c16a;
  border-radius: 90%;
  margin-top: 120px;
  margin-bottom: 120px;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
</style>
