import html2canvas from "html2canvas";

export default function screenshot () {
    let frames: string[] = [];
    let intervalId: ReturnType<typeof setInterval>;

    async function takeScreenshot() {
        takeScreenshotOnLoop();
        intervalId = setInterval(takeScreenshotOnLoop, 4000);
    }  
    async function takeScreenshotOnLoop() {
        const { scrollX, scrollY, innerWidth, innerHeight } = window;
        const visibleArea = {
            x: scrollX,
            y: scrollY,
            width: innerWidth,
            height: innerHeight
        };
    
        const canvas = await html2canvas(document.documentElement, visibleArea);
        const imageUrl = canvas.toDataURL();
        frames.push(imageUrl);
        console.log('Screenshot taken', frames);
    }
    
    function stopCaptureScreeenshot() {
        clearInterval(intervalId);
    }

    return {
        takeScreenshotOnLoop,
        takeScreenshot,
        stopCaptureScreeenshot,
        frames,
    };
}
