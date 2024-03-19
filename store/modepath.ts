import { defineStore } from "pinia";
// import { Ref } from "vue";

interface ModeStore {
  mode: Ref<string>;
  lecture: () => void;
  exam: () => void;
}

export const useMode = defineStore("modepath", () => {
  const mode: Ref<string> = ref("");

  function lecture(): void {
    mode.value = "lecture";
  }

  function exam(): void {
    mode.value = "exam";
  }

  return { mode, lecture, exam } as ModeStore;
});
