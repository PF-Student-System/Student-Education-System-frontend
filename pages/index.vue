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
let image = ref(false); // Use ref(null) to correctly initialize the canvas
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
  // tracks.forEach((track) => {
  //   track.stop();
  // });
  // apicall(imageDataUrl);
  authToFacia();
  // console.log(imageDataUrl);
}
onMounted(() => {
  
  initCamera();
});



async function authToFacia() {
  const data = new FormData();
  data.append("client_id", config.public.clientId);
  data.append("client_secret", config.public.clientSecret);

  const response = await fetch("https://app.facia.ai/backend/api/transaction/get-access-token", {
    method: "POST",
    body: data,
  });
  const result = await response.json();
  console.log(result);
  createTransactionFacia(result.result.data.token)
  // sendDataToFacia(result.result.data.token)
}

async function createTransactionFacia(token) {
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+ token);

var formdata = new FormData();
formdata.append("type", "face_search");
formdata.append("file", image);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://app.facia.ai/backend/api/transaction/create-transaction", requestOptions)
  .then(response => response.text())
  .then(result => {
    let data = JSON.parse(result)
    console.log(data)
    console.log('-------->',data.result.data.reference_id)
    faciaFaceSearch(token, data.result.data.reference_id);
  })
  .catch(error => console.log('error', error));
    
}





async function faciaFaceSearch(token , reference_id) {
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+ token);

var formdata = new FormData();
formdata.append("reference_id", reference_id);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
console.log("hello")

fetch("https://app.facia.ai/backend/api/transaction/face-search-result", requestOptions)
  .then(response => response.text())
  .then(
    result => {
    let data1 = result
    data1 = JSON.parse(data1);
    console.log('-------->',data1)
})
  .catch(error => console.log('error', error));


}







async function sendDataToFacia(token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    console.log(image)
    const formdata = new FormData();
    formdata.append("file_list[0]", image); // Assuming image is a valid image file
    // formdata.append("client_reference", "YourClientReference");
    // formdata.append("allow_override", false);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://app.facia.ai/backend/api/transaction/enroll-face", requestOptions);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log('Error:', error);
    }
}











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
