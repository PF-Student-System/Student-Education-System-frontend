<template>
  <div class="container">
    <main class="container h-screen w-screen flex justify-evenly items-center">
      <NuxtLink to="./humanverification">
        <button
          :disabled="!isLectureDone"
          @click="exammode"
          :class="
            isLectureDone
              ? 'w-60 h-20 bg-customgreen rounded-md justify-center flex items-center text-2xl text-white fond-bold cursor-pointer shadow hover:btnHover'
              : 'w-60 h-20 bg-customgraytext rounded-md justify-center flex items-center text-2xl text-white fond-bold shadow'
          "
        >
          Exam Mode
        </button>
      </NuxtLink>

      <NuxtLink to="./humanverification">
        <div
          @click="lecturemode"
          class="w-60 h-20 bg-customgreen rounded-md justify-center flex items-center text-2xl text-white fond-bold cursor-pointer shadow hover:btnHover"
        >
          Lecture Mode
        </div>
      </NuxtLink>
    </main>
  </div>
</template>
<script setup>
import { useMode } from "~/store/modepath.js";
const store = useMode();
const mode = store.mode;

import { dontletExamBeforeLecture } from "~/store/dontletExamBeforeLecture";
const store1 = dontletExamBeforeLecture();

var isLectureDone = ref(false);
onMounted(() => {
  console.log(store1.lectureCompleted);
  if (store1.lectureCompleted == true) {
    isLectureDone = true;
  } else {
    isLectureDone = false;
  }
});

function exammode() {
  console.log("exam");
  store.exam();
  console.log(store.mode);
}

function lecturemode() {
  console.log("lecture");
  store.lecture();
  console.log(store.mode);
}
</script>
