import { ref, onUnmounted } from 'vue';

export function useWebcamRecorder() {
  const images = ref<string[]>([]);
  const videoElement = ref<HTMLVideoElement | null>(null);
  const isCapturing = ref<boolean>(false);
  const currentImage = ref<string>('');
  let captureInterval: NodeJS.Timeout | null = null;
  let slideshowInterval: NodeJS.Timeout | null = null;

  const startCapture = async (videoRef: HTMLVideoElement) => {
    isCapturing.value = true;
    videoElement.value = videoRef;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoElement.value) {
        videoElement.value.srcObject = stream;
        videoElement.value.play();
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

  const startSlideshow = () => {
    if (images.value.length === 0) {
      alert("No images captured to start the slideshow.");
      return;
    }
  
    alert("Slideshow started!"); // Alert the user that the slideshow has started.
    let index = 0;
    clearInterval(slideshowInterval as NodeJS.Timeout);
    slideshowInterval = setInterval(() => {
      if (index >= images.value.length) {
        index = 0; // Loop back to the first image
      }
      currentImage.value = images.value[index++];
    }, 1000);
  };
  

  const stopSlideshow = () => {
    clearInterval(slideshowInterval as NodeJS.Timeout);
  };

  onUnmounted(() => {
    stopCapture();
    stopSlideshow();
  });

  return {
    images,
    isCapturing,
    currentImage,
    videoElement,
    startCapture,
    stopCapture,
    startSlideshow,
    stopSlideshow,
  };
}
