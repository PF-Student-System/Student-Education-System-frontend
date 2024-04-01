<template>
  <div
    class="border-2 border-customgreen rounded-md mx-10 flex justify-between mt-10 items-center px-5 sticky top-5 bg-white"
    :style="
      textColor === ''
        ? 'border : 2px solid customgreen'
        : `border : 2px solid ${textColor}`
    "
  >
    <h1
      class="text-customgreen ml-5 text-2xl font-bold"
      :style="`color : ${textColor}`"
    >
      Exam
    </h1>
    <p
      class="text-customgreen text-xl"
      :style="`color : ${textColor}`"
      v-show="time"
    >
      Time remaining: {{ displayTime }}
    </p>
    <p
      class="text-customgraytext text-xl font-semibold"
      :style="`color : ${textColor}`"
      v-show="timeUp"
    >
      Times Up!!
    </p>
  </div>
  <p class="text-customgraytext mx-10 mt-4 text-xl">Answer all the questions</p>
  <div
    v-for="(questions, index) in myExam.questions"
    :key="questions.questionText"
    class="card"
  >
    <mcqCard :questions="questions" :questionIndex="index" :timesUp="timeUp" />
  </div>
  <div class="p-10 text-center">
    <nuxt-link to="/ExamStudent/ExamSuccessful">
      <button
        @click="stopactions"
        class="btn hover:btnHover w-[200px] text-xl font-semibold"
      >
        Submit Exam
      </button>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import screenshot from "~/mixins/screenshot";
import { myExam } from "~/utils/exam";
import camScreenshot from "~/mixins/camScreenshot";
import { useImageExams } from "~/store/imageDataForExam";
const store = useImageExams();
import { postScreenShots } from "~/mixins/postDataToApi";
const { sendDatatoApi } = postScreenShots();

const timeLeft = ref(300);
var textColor = ref("");
const timeUp = ref(false);
const time = ref(true);
let countdown: NodeJS.Timeout | null = null;
const { takeScreenshot, stopCaptureScreenshot, takeScreenshotOnLoop, frames } =
  screenshot();
const { startCapture, stopCapture, captureImage, imagearray } = camScreenshot();
const videoref = ref(null);
const keyPressed = ref<string | null>(null);

const displayTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

const handleKeyPress = (event: KeyboardEvent) => {
  keyPressed.value = event.key;
  captureImage();
  takeScreenshotOnLoop();
};

const handleMouseClick = () => {
  captureImage();
  takeScreenshotOnLoop();
};

const startCountdown = () => {
  countdown = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(countdown!);
      timeUp.value = true;
      time.value = false;
    }

    if (timeLeft.value <= 30 && timeLeft.value >= 0) {
      textColor.value = "red";
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
  takeScreenshot();
  startCapture();
  window.addEventListener("keydown", handleKeyPress);
  window.addEventListener("click", handleMouseClick);
});

onUnmounted(() => {
  stopCaptureScreenshot();
  stopCapture();
  window.removeEventListener("keydown", handleKeyPress);
  window.removeEventListener("click", handleMouseClick);
  store.imageDataSavingToPinia(frames, imagearray);
  sendDatatoApi(frames, imagearray);
});

const stopactions = () => {
  stopCaptureScreenshot();
  stopCapture();
};

onBeforeUnmount(async () => {
  if (countdown) {
    clearInterval(countdown);
  }

  const res = await $fetch(
    "https://27c9-110-39-140-214.ngrok-free.app/users/exam",
    {
      method: "post",
      body: {
        isAttempted: true,
        webCamScreenshots: null,
        windowScreenshots: null,
      },
    }
  );
});
</script>

<style scoped></style>
