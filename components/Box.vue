<template>
  <div class="grid grid-cols-7 grid-rows-7">
    <div
      v-for="box in boxes"
      :key="box.id"
      class="flex justify-center pt-3 m-auto"
    >
      <div
        :class="{
          'w-28 bg-customgreen h-12 m-2 flex items-center justify-center text-white cursor-pointer ':
            !disabled && !box.checked,
          'bg-blue-500 text-blue w-28 h-12 m-2 flex items-center justify-center cursor-pointer text-white':
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
  <div class="text-center pt-10" >
    <button v-show="isVisible"
      class="btn text-center w-[100px] hover:btnHover cursor-pointer font-2xl font-semibold"
      @click="startClicked" 
    >
      Start
    </button>
  </div>
</template>

<script  lang="ts">

import { useMode } from "~/store/modepath";
// import {  Ref } from 'vue';
export default {
  setup() {
    const store = useMode();
    const mode = store.mode;
    const isVisible = ref(true);  // Controls visibility of the element
    
    interface Box {
      id: number;
      checked: boolean;
      selected: boolean;
    }

    const boxes = ref<Box[]>([]);
    const disabled = ref<boolean>(true);
    const counter = ref<number>(0);
    
    onMounted(() => {
      createBoxes();
    });

    function createBoxes() {
      for (let i = 0; i < 49; i++) {
        boxes.value.push({ id: i, checked: false, selected: false });
      }
    }

    function startClicked() {
       disabled.value = false;
       isVisible.value = false; 
      // Hide the element
     
      
    }

    function boxClicked(box: Box) {
      if (disabled.value) return;
      if (!box.checked) {
        counter.value++;
      }
      box.checked = true;
      box.selected = true;

      if (counter.value === 49) {
        if (mode === "exam") {
          navigateTo("/examstudent");
        } else if (mode === "lecture") {
          navigateTo("/lectures");
        } else {
          console.log("not working");
        }
      }
    }

    return {
      boxes,
      disabled,
      counter,
      startClicked,
      boxClicked,
      isVisible,
    };
  },
};
</script>

<style scoped>
.selected {
  background-color: #0f172a;
}
</style>
