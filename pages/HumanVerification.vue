<template>
  <div>
    <h1 class="text-2xl font-bold pl-2">Human Verification</h1>
    <h2 class="pl-2">
      You need to click on all the boxes. Click on start whenever you are ready!
    </h2>
  </div>
  <div>
    <Box />
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
