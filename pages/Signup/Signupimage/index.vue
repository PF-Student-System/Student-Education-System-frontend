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
    <div>
      <!-- <img
        ref="image"
        :src="image"
      > -->


      

    </div>
  </div>
</template>

<script setup>

import { useSignup } from "~/store/signup";
import { ref, onMounted } from "vue";
import imageCompression from 'browser-image-compression';
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

async function captureImage() {
  captured.value = true;
    const canvas = document.createElement("canvas");
    canvas.width = player.value.videoWidth;
    canvas.height = 400;
    const context = canvas.getContext("2d");
    context.drawImage(player.value, 0, 0, canvas.width, 400);
    //const imageDataUrl = canvas.toDataURL("image/png");
    //image = imageDataUrl;
    const stream = player.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
console.log(canvas);
    // Compress image right after capturing it
  //const blob = await fetch(canvas.toDataURL()).then(res => res.blob());
 //const blob =await new Promise(resolve=>canvas.toBlob(resolve,'image/png'))
 const blob =await new Promise(resolve=>canvas.toBlob(resolve,'image/webp'))
  console.log(blob)
 const compressedImage = await compressImage(blob);
  console.log('Compressed Image Blob:', compressedImage);
 // image.value = URL.createObjectURL(compressedImage);
  //stopCamera();

  const reader = new FileReader();
  reader.readAsDataURL(compressedImage);
 // reader.onloadend = function (){
//const compressedImageDataUrl = reader.result;
   // apicall(compressedImageDataUrl);
  reader.onloadend = ()=> apicall(reader.result);
 

};


   //apicall(imageDataUrl);
//}

async function compressImage(file) {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
  };
  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Error compressing the image:', error);
    return file; // Return original file on error
  }
};


const apicall = async (imageDataUrl) => {
  const res = await $fetch(
    "https://9a32-39-61-60-56.ngrok-free.app/users/register",
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
  const payload = {
  firstName: store.fName,
  lastName: store.lName,
  role: store.role,
  image: imageDataUrl,
};

console.log('Payload being sent to API:', payload);

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
