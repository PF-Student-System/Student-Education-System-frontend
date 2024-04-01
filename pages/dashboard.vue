<template>
  <div class="flex gap-x-10">
    <dashboardSidebar />
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
