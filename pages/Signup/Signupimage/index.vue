<template>
  <!-- <div style=" display: flex; justify-content:center; align-items: center; height: 500px;"> -->
   
   <div class="bg-white py-4 ">
    <h1 style="text-align:center" class="text-customgreen text-lg font-bold mr-4 mb-5">Capture Face to Signup</h1>
    
      
        <div class="flex justify-center mb-5"    >
          <!-- only show video if not Captured -->
          <video class="shadow-xl" ref="player" autoplay v-if="!captured.value" style="  border-radius: 10px;" ></video>
          
        </div>
        <div class="flex justify-center">
<!--           
         <NuxtLink to ="/SelectMode">Selectmode</NuxtLink> -->
         <NuxtLink to ="/SelectMode"><button class="btn hover:btnHover w-72 mt-2" @click="firstfunction" v-if="!captured.value" >Capture</button></NuxtLink>
        </div>
       
    </div>   
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
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

  function firstfunction (){
captureImage();
saveimage();
console.log("firstfunction called")

  };
  
   function captureImage() {
console.log("imagecapture")

     if (player.value  ) {
       captured.value = true;
  //      // Stop video tracks
     player.value.srcObject.getVideoTracks().forEach((track) => track.stop());
     console.log(player.value,'player value');
   } 
  }
 async function saveimage(){
    console.log("saveimage")
   if (player.value){
  
    //using canvas to convert bitmap to dataUrl
    const canvas = document.createElement("canvas");
    const Context = canvas.getContext('2d');
    canvas.width = player.value.videoWidth; // Use the actual video width
    canvas.height = player.value.videoHeight; // Use the actual video height

    Context.drawImage(player.value, 0, 0, canvas.width, canvas.height);
  
    // Convert the canvas content to a Base64 string
    const imageDataUrl = canvas.value.toDataURL('image/png');
    console.log(imageDataUrl);
   }
  }
  
  onMounted(() => {
    initCamera();
  });
  </script>
  
  