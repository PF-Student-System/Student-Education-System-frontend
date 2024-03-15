import { defineStore } from "pinia";
export const dontletExamBeforeLecture = defineStore("dontletExamBeforeLecture", () => {
  const lectureCompleted = ref(false);
  function completeLecture() {
    lectureCompleted.value = true;
    console.log("----->",lectureCompleted);
  }
//   function exam() {
//     mode.value = "exam";
//   }

  return {completeLecture , lectureCompleted};
});
