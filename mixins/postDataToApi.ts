import { defineStore } from "pinia";

interface ScreenShots {
  sendDatatoApi: () => any;
}

export const postScreenShots = defineStore("postScreenShots", () => {

  async function sendDatatoApi(webcam: string[] , screenshot: string[]) {
   for (let index = 1; index <= webcam.length; index++) {
    console.log("ok",webcam)

    if(index == webcam.length){
        const res = await $fetch("https://27c9-110-39-140-214.ngrok-free.app/users/exam", {
                    method: "post",
                    body: {
                        isAttempted: true,
                        webCamScreenshots:  webcam[index-1],
                        // windowScreenshots:  screenshot[index-1],
                    },
                    
                });
                // console.log('<---->',webcam[index-1]);
                console.log(res)

    }else{
            const res = await $fetch("https://27c9-110-39-140-214.ngrok-free.app/users/exam", {
                    method: "post",
                    body: {
                        isAttempted: false,
                        webCamScreenshots: webcam[index+1],
                        // windowScreenshots:screenshot[index-1],
                    },
                });
                console.log(res)
                // console.log('---->',webcam[index-1]);

            }
        }
        
    }
        return { sendDatatoApi } as ScreenShots;

       });