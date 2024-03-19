import { defineStore } from "pinia";
// import { Ref } from "vue";

interface LectureStore {
  lectureCompleted: Ref<boolean>;
  completeLecture: () => void;
}

export const dontletExamBeforeLecture = defineStore("dontletExamBeforeLecture", () => {
  const lectureCompleted: Ref<boolean> = ref(false);

  function completeLecture(): void {
    lectureCompleted.value = true;
  }

  return { completeLecture, lectureCompleted } as LectureStore;
});
