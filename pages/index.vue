<template>
  <div class="text-center mt-36 font-bold text-2xl">
    <h1>Sign In</h1>
    <div style="border: 2px solid black; width:400px; height: 400px;">
      <video ref="player" controls autoplay></video>
    </div>
    <div>
      <button class="btn" @click="captureImage">Capture</button>
    </div>
    <canvas ref="canvas" width="500" height="400"></canvas>
  </div>
  <div>
    <button class="btn">Sign in</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const player = ref(null);
const canvas = ref(null);

const constraints = {
  video: {
    width: 1280,
    height: 720
  }
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
  if (player.value && canvas.value) {
    const context = canvas.value.getContext('2d');
    context.drawImage(player.value, 0, 0, canvas.value.width, canvas.value.height);
    player.srcObject.getVideoTracks().forEach(track => track.stop());
  }
}

onMounted(() => {
  initCamera();
});
</script>
