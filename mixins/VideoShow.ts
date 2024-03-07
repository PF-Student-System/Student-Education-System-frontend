import { ref, onUnmounted } from "vue";

//Video Show mixin
export function slideShow(){
    let slideshowInterval: NodeJS.Timeout | null = null;
    const currentImage = ref<string>('');
    const startSlideshow = (images: string[] )=>{
        console.log("Images",images);
        if (images.length === 0) {
          alert("No images captured to start the slideshow.");
          return;
        }
        
        alert("Slideshow started!"); // Alert the user that the slideshow has started.
        let index = 0;
        clearInterval(slideshowInterval as NodeJS.Timeout);
        slideshowInterval = setInterval(() => {
          if (index >= images.length) {
            index = 0; // Loop back to the first image
          }
          currentImage.value = images[index++];
          console.log("Current Images",currentImage)
        }, 1000);
      };

      const stopSlideshow = () => {
        clearInterval(slideshowInterval as NodeJS.Timeout);
      };

        onUnmounted(() => {
            stopSlideshow();
        });

      return{
        startSlideshow,
        stopSlideshow,
        currentImage,
      }
}

