<template>
  <!-- <div style=" display: flex; justify-content:center; align-items: center; height: 500px;"> -->
   
   <div class="bg-white py-4 ">
    <h1 style="text-align:center" class="text-customgreen text-lg font-bold mr-4 mb-5">Capture Face</h1>
    
      
        <div class="flex justify-center mb-5"    >
          <!-- only show video if not Captured -->
          <video ref="player" autoplay v-if="!captured.value" style="  border-radius: 10px;" ></video>
          
        </div>
        <div class="flex justify-center">
          <button class="btn hover:btnHover w-72 mt-2" @click="captureImage" v-if="!captured.value" >Capture</button>
        </div>
       
        <div>
          <!-- To show the captured image we use canvas  -->
          <canvas  ref="canvas" width="400" height="600" v-if="!captured.value"  ></canvas>
        </div>
         
       
    </div>   
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const player = ref(null);
  const canvas = ref(null); // Use ref(null) to correctly initialize the canvas
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
    if (player.value && canvas.value ) {
      const context = canvas.value.getContext('2d');
      context.drawImage(player.value, 0, 0, canvas.value.width, canvas.value.height);
      
      captured.value = true;
       // Stop video tracks
    player.value.srcObject.getVideoTracks().forEach((track) => track.stop());
    //console.log(canvas.value,'canvas value')
    console.log(context);
  }
   
    
  }
  
  onMounted(() => {
    initCamera();
  });
  </script>
  
  