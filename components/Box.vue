<template>
  <div class="grid grid-cols-7 grid-rows-7">
    <div v-for="box in boxes" :key="box.id">
      <div
        :class="{
          'w-36 bg-customgreen h-12 m-2 flex items-center justify-center text-white cursor-pointer':
            !disabled && !box.checked,
          'bg-blue-500 text-black': box.checked,
          'opacity-50 cursor-not-allowed': disabled,
        }"
        @click="boxClicked(box)"
        :disabled="disabled"
      >
        {{ box.id }}
      </div>
    </div>
  </div>
  <div
    class="btn w-24 h-12 m-2 text-center hover:btnHover cursor-pointer font-2xl font-semibold pt-3"
    @click="startClicked"
  >
    Start
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const boxes = ref([]);
const disabled = ref(true);

onMounted(() => {
  createBoxes();
});

function createBoxes() {
  for (let i = 0; i < 49; i++) {
    boxes.value.push({ id: i, checked: false });
  }
}

function startClicked(id) {
  disabled.value = false;
}

function boxClicked(id) {
  if (disabled.value) return;
  box.checked = !box.checked;
}
</script>

<style scoped></style>
