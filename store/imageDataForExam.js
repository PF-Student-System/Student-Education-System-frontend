import { defineStore } from "pinia";
export const useImageExams = defineStore("imageDataForExam", () => {
  let imgArrayWebShots = ref([]);
  let imgArrayCamShots = ref([]);

  function imageDataSavingToPinia( arrWebShots , arrCamShots) {
    imgArrayWebShots = arrWebShots;
    imgArrayCamShots = arrCamShots;
  }

  return {imageDataSavingToPinia , imgArrayWebShots , imgArrayCamShots};
});
