<template>
  <div class="text-center bg-customgraytext px-4">
    <h1>Lecture</h1>
    <button class="btn" @click="examFinsihed">Finish Lecture</button>
  </div>
</template>

<script setup>
import {ref} from "vue";

const video=ref(null);

const examFinsihed=()=>{
  console.log("Lecture Finished successfully");
}
 
</script>
