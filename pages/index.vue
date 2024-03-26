<template>
  <div class="bg-white py-4">
    <h1
      style="text-align: center"
      class="text-customgreen text-2xl font-bold mr-4 mb-5"
    >
      Scan Your Face to Login
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
      <input
          type="text"
          required
          v-model="VideoText"
          placeholder="Video"
          class="h-8 border rounded-md mb-3 px-2 w-72"
        /><br />
    </div>

    <div class="flex justify-center">
      <button
        class="btn hover:btnHover text-lg font-semibold w-72 mt-2"
        @click="captureImage"
        v-if="!captured.value"
      >
        Login
      </button>
    </div>

    <!-- To show the captured image we use canvas  -->
    <!-- <div>
      <img ref="image" :src="image" />
    </div> -->
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import pako from "pako";


const config = useRuntimeConfig()
const VideoText = ref(null);
const player = ref(null);
let image = ref(null); // Use ref(null) to correctly initialize the canvas
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

        // console.log(process.server)
        console.log(config.public.clientSecret)
}

function captureImage() {
  captured.value = true;
  const canvas = document.createElement("canvas");
  canvas.width = player.value.videoWidth;
  canvas.height = 400;
  const context = canvas.getContext("2d");
  context.drawImage(player.value, 0, 0, canvas.width, 400);
  const imageDataUrl = canvas.toDataURL("image/webp");
  const stream = player.value.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
  apicall(imageDataUrl);
  console.log(imageDataUrl);
}
onMounted(() => {
  
  initCamera();
});

const apicall = async (imageDataUrl) => {
  const compressedData = pako.gzip(imageDataUrl);
  const compressedBase64 = btoa(
    String.fromCharCode.apply(null, compressedData)
  );
  console.log(compressedBase64);
  // const webpImage = new Image();
  // webpImage.src = imageDataUrl;
  // document.body.appendChild(webpImage);
  const res = await $fetch(
    "https://381f-110-39-140-214.ngrok-free.app/users/login",
    {
      method: "post",
      body: {
        image: VideoText.value,
      },
    }
  );

  if (res) {
    // console.log("ok");
    console.log(res)
    if (res.message) {
      console.log(res.message);
      navigateTo("/signup");
    } else {
      if (res.user.role === "teacher") {
        navigateTo("/dashboard");
      } else if (res.user.role === "student") {
        navigateTo("/selectmode");
      } else {
        console.log("couldnt find role");
      }
    }
  } else {
    console.log("request failed");
  }
};
</script>
