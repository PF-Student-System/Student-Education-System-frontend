import { defineStore } from "pinia";

interface ImageExamsStore {
  imgArrayWebShots: Ref<any[]>;
  imgArrayCamShots: Ref<any[]>;
  imageDataSavingToPinia: (arrWebShots: any[], arrCamShots: any[]) => void;
}

export const useImageExams = defineStore("imageDataForExam", () => {
  const imgArrayWebShots: Ref<any[]> = ref([]);
  const imgArrayCamShots: Ref<any[]> = ref([]);

  function imageDataSavingToPinia(
    arrWebShots: any[],
    arrCamShots: any[]
  ): void {
    imgArrayWebShots.value = arrWebShots;
    imgArrayCamShots.value = arrCamShots;
  }

  return {
    imageDataSavingToPinia,
    imgArrayWebShots,
    imgArrayCamShots,
  } as ImageExamsStore;
});
