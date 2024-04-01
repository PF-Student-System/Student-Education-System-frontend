import { defineStore } from "pinia";

interface LectureStore {
  lectureCompleted: Ref<boolean>;
  completeLecture: () => void;
}

export const dontletExamBeforeLecture = defineStore(
  "dontletExamBeforeLecture",
  () => {
    const lectureCompleted: Ref<boolean> = ref(true);

    function completeLecture(): void {
      lectureCompleted.value = true;
    }

    return { completeLecture, lectureCompleted } as LectureStore;
  }
);
