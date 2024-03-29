<template>
  <!-- <div style=" display: flex; justify-content:center; align-items: center; height: 500px;"> -->

  <div class="bg-white py-4">
    <h1
      style="text-align: center"
      class="text-customgreen text-lg font-bold mr-4 mb-5"
    >
      Capture Face to Signup
    </h1>
    <!-- <input
      type="text"
      required
      v-model="VideoText"
      placeholder="Video"
      class="h-8 border rounded-md mb-3 px-2 w-72"
    /><br /> -->

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
    <div>
      <img ref="image" :src="image" />
    </div>
  </div>
</template>

<script setup>
import { useSignup } from "~/store/signup";
import { ref, onMounted } from "vue";

const config = useRuntimeConfig();
const store = useSignup();
const player = ref(null);
const VideoText = ref(null);
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

function downloadImage(dataUrl, filename = "captured-image.png") {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a); // Required for Firefox
  a.click();
  document.body.removeChild(a);
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
  // downloadImage(imageDataUrl)
  const stream = player.value.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
  apicall(imageDataUrl);
  authToFacia();
}

async function authToFacia() {
  const data = new FormData();
  data.append("client_id", config.public.clientId);
  data.append("client_secret", config.public.clientSecret);

  const response = await fetch(
    "https://app.facia.ai/backend/api/transaction/get-access-token/",
    {
      method: "POST",
      body: data,
    }
  );
  const result = await response.json();
  console.log(result);
  sendDataToFacia(result.result.data.token);
}

async function sendDataToFacia(token) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  // console.log(image);
  const formdata = new FormData();
  formdata.append("file_list[0]", image); // Assuming image is a valid image file
  formdata.append("client_reference", `${store.fName} ${store.lName}`);
  // formdata.append("client_reference", "YourClientReference");
  // formdata.append("allow_override", false);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://app.facia.ai/backend/api/transaction/enroll-face",
      requestOptions
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
}

const apicall = async (imageDataUrl) => {
  console.log("working");

  const res = await $fetch("http://localhost:3001/users/register", {
    method: "post",
    body: {
      firstName: store.fName,
      lastName: store.lName,
      role: store.role,
      image: imageDataUrl,
      // image: VideoText.value,
    },
  });

  const res1 = await $fetch("http://localhost:3001/users/course", {
    method: "post",
    body: {
      courseName: store.StudentCourse,
    },
  });
  console.log(imageDataUrl);
  console.log("ok");
  console.log(res1);

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
