<template>
  <div class="flex justify-center">
    <div class="w-[90%] p-10 rounded-md shadow-2xl h-full mt-5 mb-5">
      <div class="text-center">
        <h1 class="text-2xl font-bold pl-2 pt-3 text-customgrayheading">
          Human Verification
        </h1>
        
        <h2 id="secondtext" class="pl-2 pt-2 pb-5 text-customgraytext">
          You need to click on all the boxes. 
        </h2>
      </div>
      <div>
        <Box />
      </div>
    </div>
  </div>
</template>

<script>
import Box from "../components/Box.vue";
export default {
  components: {
    Box,
  },
};
</script>

<style scoped></style>
