
<template >
  
     <div class="bg-white py-4 ">
    <h1 style="text-align:center " class="text-customgreen text-2xl font-bold mr-4 mb-5">Scan Your Face to Login</h1>
      
    <div class="flex justify-center mb-5 ">
        <!-- only show video if not Captured -->
        <video class="shadow-xl" ref="player"  autoplay v-if="!captured.value" style="  border-radius: 10px;"  ></video> 
      </div>

      <div  class="flex justify-center" >
       <NuxtLink to="/SelectMode"> <button   class="btn hover:btnHover text-lg font-semibold w-72 mt-2" @click="captureImage" v-if="!captured.value" >Login</button></NuxtLink>
      </div>
     
       <!-- To show the captured image we use canvas  -->
      <!-- <div>
        <canvas  ref="canvas" width="720" height="360" v-if="!captured.value"  ></canvas>
      </div> -->
       
    </div>    
</template>
<script setup>
import { ref, onMounted } from 'vue';

const player = ref(null);
//const canvas = ref(null); // Use ref(null) to correctly initialize the canvas
const captured = ref(false); // State to control the visibility of video/canvas

const constraints = {
  video: {
    width: 720 ,
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

    const canvas =  document.createElement("canvas")
   // canvas.width = constraints.video.width;
   // canvas.height = constraints.video.height;
   canvas.width = 1260;
   canvas.height = 720;
    const context = canvas.getContext('2d');
    context.drawImage(player.value, 0, 0, canvas.width, canvas.height);
console.log(context);
  const imageDataUrl =  canvas.toDataURL('image/png');
    console.log(imageDataUrl);

}
onMounted(() => {
  initCamera();
});



</script>


