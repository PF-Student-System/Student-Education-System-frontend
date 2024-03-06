
<template >
  <div style="border: 2px solid black; width: 1000px; height: 510px; margin:auto; background-color:aquamarine">
    <h1 style="text-align: center;">Sign In Page</h1>
      <div style="border: 2px solid black; display: flex; justify-content:center; align-items: center; height: 400px; ">
        <!-- only show video if not Captured -->
        <video ref="player"  autoplay v-if="!captured.value" style="height: 400px; width: 400px;" ></video>
        
      </div>
      <div>
        <button class="btn" @click="captureImage" v-if="!captured.value" >SignIn</button>
        <!-- <button class="btn" @click="gotoSignuppage"  >SignUp</button> -->
        <NuxtLink to="/Signup" class="btn">SignUp</NuxtLink>
      </div>
     
      <div>
        <!-- To show the captured image we use canvas  -->
        <canvas  ref="canvas" width="400" height="400" v-if="!captured.value"  ></canvas>
      </div>
       
    </div>    
</template>


