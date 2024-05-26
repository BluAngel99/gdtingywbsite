document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-audio");
    const audioButton = document.getElementById("audio-button");
    const audioIcon = document.getElementById("audio-icon");
    const volumeControl = document.getElementById("volume-control");
    const canvas = document.getElementById("audio-visualizer");
    const canvasCtx = canvas.getContext("2d");

    // Set initial volume to 25%
    audio.volume = 0.25;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioSource = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const scalingFactor = 0.3; // Adjust this value to control the reactivity (lower means less reactive)
    const lengthMultiplier = 2; // Increase this value to extend the line length

    const image = new Image();
    image.src = 'images/tidalwavecircle.jpg'; // Change to the path of your image

    let pulseStartTime = null;
    let startTime = null;
    let isPlaying = false;

    function draw(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsedTime = timestamp - startTime;
        const audioElapsedTime = audio.currentTime * 1000; // Current audio time in milliseconds

        if (audioElapsedTime >= 4500 && !pulseStartTime) {
            pulseStartTime = timestamp;
        }

        // Check if the audio is playing to apply pulsing effect
        const pulse = isPlaying && pulseStartTime ? 1 + 0.02 * Math.sin((2 * Math.PI / 400) * (timestamp - pulseStartTime)) : 1;

        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        const radius = (canvas.width / 3) * pulse; // Apply pulse to radius
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const numBars = 128; // Number of bars to draw
        const barWidth = (2 * Math.PI) / numBars; // Adjust barWidth to distribute bars evenly

        // Draw the filled circle with the image
        canvasCtx.save();
        canvasCtx.beginPath();
        canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        canvasCtx.clip();
        canvasCtx.drawImage(image, centerX - radius, centerY - radius, radius * 2, radius * 2);
        canvasCtx.restore();

        // Draw the visualizer bars
        for (let i = 0; i < numBars; i++) {
            const dataArrayIndex = Math.floor(i * bufferLength / numBars);
            const barHeight = (dataArray[dataArrayIndex] * scalingFactor) * lengthMultiplier;
            const angle = barWidth * i;

            const x1 = centerX + radius * Math.cos(angle);
            const y1 = centerY + radius * Math.sin(angle);
            const x2 = centerX + (radius + barHeight) * Math.cos(angle);
            const y2 = centerY + (radius + barHeight) * Math.sin(angle);

            canvasCtx.strokeStyle = 'rgba(0, 255, 255, 0.8)'; // Neon blue color
            canvasCtx.lineWidth = 2;
            canvasCtx.beginPath();
            canvasCtx.moveTo(x1, y1);
            canvasCtx.lineTo(x2, y2);
            canvasCtx.stroke();
        }
    }

    const resumeAudioContext = () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    };

    // Add event listeners to handle user interaction and resume audio context if necessary
    document.body.addEventListener('click', resumeAudioContext);
    document.body.addEventListener('touchstart', resumeAudioContext);

    audioButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            audioIcon.classList.remove("fa-play");
            audioIcon.classList.add("fa-pause");
        } else {
            audio.pause();
            audioIcon.classList.remove("fa-pause");
            audioIcon.classList.add("fa-play");
        }
    });

    volumeControl.addEventListener("input", (event) => {
        audio.volume = event.target.value;
    });

    image.onload = () => {
        requestAnimationFrame(draw); // Start drawing once the image is loaded
    };

    audio.addEventListener("play", () => {
        isPlaying = true;
    });

    audio.addEventListener("pause", () => {
        isPlaying = false;
        pulseStartTime = null; // Reset pulse start time when paused
    });

    audio.addEventListener("timeupdate", () => {
        if (audio.currentTime < 4.5) {
            pulseStartTime = null; // Reset pulse start time if before 4.5 seconds
        }
    });

    // Check if audio is already playing on DOMContentLoaded
    if (!audio.paused) {
        isPlaying = true;
        audio.play(); // Ensure audio is playing
    }
});
