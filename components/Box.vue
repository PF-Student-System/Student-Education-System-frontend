<template>
  <div class="grid grid-cols-7 grid-rows-7">
    <div v-for="box in boxes" :key="box.id">
      <div
        :class="{
          'w-36 bg-customgreen h-12 m-2 flex items-center justify-center text-white cursor-pointer':
            !disabled && !box.checked,
          'bg-blue-500 text-blue w-36 h-12 m-2 flex items-center justify-center cursor-pointer':
            box.checked,
          'opacity-50 cursor-not-allowed': disabled,
          selected: box.selected,
        }"
        @click="boxClicked(box)"
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
const boxes = ref([]);
const disabled = ref(true);
const counter = ref(0);

onMounted(() => {
  createBoxes();
});

function createBoxes() {
  for (let i = 0; i < 49; i++) {
    boxes.value.push({ id: i, checked: false, selected: false });
  }
  console.log(boxes);
}

function startClicked() {
  disabled.value = false;
}

function boxClicked(box) {
  if (disabled.value) return;
  if (!box.checked) {
    counter.value++;
  }
  box.checked = true;
  console.log(box.checked);
  box.selected = true;

  if (counter.value === 49) {
    console.log("logic working");
    navigateTo("/");
  }
}
</script>

<style scoped>
.selected {
  background-color: #0f172a;
}
</style>
