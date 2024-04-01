export default function camScreenshot() {
  let intervalId: NodeJS.Timeout | null;
  let counter = 1;
  let imagearray: string[] = [];

  function startCapture() {
    captureImage();
    intervalId = setInterval(captureImage, 4000);
  }

  function stopCapture() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  async function captureImage() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL("image/jpeg");
        imagearray.push(imageDataURL);
        counter++;
        stream.getTracks().forEach((track) => track.stop());
        console.log(imagearray);
      };
      video.play();
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  }

  return {
    captureImage,
    startCapture,
    stopCapture,
    imagearray,
  };
}
