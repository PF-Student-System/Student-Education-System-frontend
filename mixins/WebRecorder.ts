import { ref, onUnmounted } from 'vue';

export function useWebcamRecorder() {
  const images = ref<string[]>([]);
  const videoElement = ref<HTMLVideoElement | null>(null);
  const isCapturing = ref<boolean>(false);
  let captureInterval: ReturnType<typeof setInterval>;

  const startCapture = async (videoRef: HTMLVideoElement) => {
    isCapturing.value = true;
    videoElement.value = videoRef;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoElement.value) {
        videoElement.value.srcObject = stream;
        videoElement.value.play();
        console.log('hello');
        clearInterval(captureInterval as NodeJS.Timeout);
        captureInterval = setInterval(() => {
          const canvas = document.createElement('canvas');
          canvas.width = videoElement.value?.videoWidth || 0;
          canvas.height = videoElement.value?.videoHeight || 0;
          const context = canvas.getContext('2d');
          context?.drawImage(videoElement.value as CanvasImageSource, 0, 0, canvas.width, canvas.height);
          images.value.push(canvas.toDataURL('image/jpeg'));
          
        }, 4000);
      }
    } catch (error) {
      console.error('Error accessing the webcam', error);
    }
  };

  const stopCapture = () => {
    isCapturing.value = false;
    clearInterval(captureInterval as NodeJS.Timeout);
    if (videoElement.value && videoElement.value.srcObject) {
      const srcObject = videoElement.value.srcObject;
      if (srcObject instanceof MediaStream) {
        const tracks = srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.value.pause();
        videoElement.value.srcObject = null;
        alert("video files generated!");
      } else {
        console.error("Invalid srcObject type:", srcObject);
      }
    }
  };



  onUnmounted(() => {
    stopCapture();
  });

  return {
    images,
    isCapturing,
    startCapture,
    stopCapture,
  };
}
