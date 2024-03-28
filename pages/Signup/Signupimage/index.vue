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
    <!-- <div>
      <img
        ref="image"
        :src="image"
      >
    </div> -->
  </div>
</template>

<script setup>
import { useSignup } from "~/store/signup";
import { ref, onMounted } from "vue";
const store = useSignup();
const player = ref(null);
let image = ref(false);
const captured = ref(false); // State to control the visibility of video/canvas

const constraints = {
  video: {
    width: 720,
    height: 360,
  },
};

async function initCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      player.value.srcObject = stream;
    })
    .catch((error) => {
      console.error("Error accessing webcam:", error);
    });
}

function captureImage() {
  captured.value = true;
  const canvas = document.createElement("canvas");
  canvas.width = player.value.videoWidth;
  canvas.height = 400;
  const context = canvas.getContext("2d");
  context.drawImage(player.value, 0, 0, canvas.width, 400);
  const imageDataUrl = canvas.toDataURL("image/webp");
  image = imageDataUrl;
  const stream = player.value.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
  apicall(imageDataUrl);
}

const apicall = async (imageDataUrl) => {
  const res = await $fetch(
    "https://8c77-202-163-113-83.ngrok-free.app/users/register",
    {
      method: "post",
      body: {
        firstName: store.fName,
        lastName: store.lName,
        role: store.role,
        image: imageDataUrl,
      },
    }
  );

  console.log(res);

  if (res._id) {
    navigateTo("/");
  } else {
    navigateTo("/signup");
  }
};

onMounted(() => {
  initCamera();
});
</script>
