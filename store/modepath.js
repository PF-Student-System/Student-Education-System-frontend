import { defineStore } from "pinia";
export const useMode = defineStore("modepath", () => {
  const mode = ref("");
  function lecture() {
    mode.value = "lecture";
  }
  function exam() {
    mode.value = "exam";
  }

  return { mode, lecture, exam };
});
