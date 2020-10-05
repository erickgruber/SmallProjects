const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Async functio. Prompt to select media straeeam, pass to video element , then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
        console.log(mediaStream);
    } catch (error) {
        // catch the error
        console.log('Hiba');
    }
}

button.addEventListener('click', async() => {
    // Disable Button
    button.disabled = true;
    //Sstart Picture in Picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disabled = false;
});

// On load
selectMediaStream();