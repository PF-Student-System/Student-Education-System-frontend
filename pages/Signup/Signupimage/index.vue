<template>
  <!-- <div style=" display: flex; justify-content:center; align-items: center; height: 500px;"> -->

  <div class="bg-white py-4">
    <h1
      style="text-align: center"
      class="text-customgreen text-lg font-bold mr-4 mb-5"
    >
      Capture Face to Signup
    </h1>

    <div class="flex justify-center mb-5">
      <!-- only show video if not Captured -->
      <video
        class="shadow-xl"
        ref="player"
        autoplay
        v-if="!captured.value"
        style="border-radius: 10px"
      ></video>
    </div>
    <div class="flex justify-center">
      <!--           
         <NuxtLink to ="/SelectMode">Selectmode</NuxtLink> -->

      <button
        class="btn hover:btnHover w-72 mt-2"
        @click="captureImage"
        v-if="!captured.value"
      >
        Capture
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSignup } from "~/store/signup";
import { ref, onMounted } from "vue";
const store = useSignup();
const player = ref(null);

const captured = ref(false); // State to control the visibility of video/canvas

const constraints = {
  video: {
    width: 720,
    height: 360,
  },
};

async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (player.value) {
      player.value.srcObject = stream;
    }
  } catch (e) {
    console.error(`navigator.getUserMedia error: ${e.toString()}`);
  }
}

function captureImage() {
  captured.value = true;
  // Stop video tracks
  player.value.srcObject.getVideoTracks().forEach((track) => track.stop());

  const canvas = document.createElement("canvas");
  // canvas.width = constraints.video.width;
  // canvas.height = constraints.video.height;
  canvas.width = 1260;
  canvas.height = 720;
  const context = canvas.getContext("2d");
  context.drawImage(player.value, 0, 0, canvas.width, canvas.height);
  console.log(context);
  const imageDataUrl = canvas.toDataURL("image/png");
  // console.log(imageDataUrl);
  apicall(imageDataUrl);
}

function apicall(imageDataUrl) {
  const newobj = {
    firstname: store.fName,
    lastname: store.lName,
    role: store.role,
    image: imageDataUrl,
  };
  console.log(newobj);
  navigateTo("/");
}

onMounted(() => {
  initCamera();
});
</script>
