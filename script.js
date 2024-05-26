let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const muteButtons = document.querySelectorAll('.mute-button');
const volumeSliders = document.querySelectorAll('.volume-slider');
const audioPlayers = document.querySelectorAll('.audio-player');
let isMuted = false;


muteButtons.forEach(button => {
    const icon = button.querySelector('i');
    icon.classList.add('fa-volume-up');
});

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
            slide.classList.remove('hidden');
            playAudio(i);
        } else {
            slide.classList.remove('active');
            slide.classList.add('hidden');
            pauseAudio(i);
        }
    });
    console.log(`Showing slide ${index}`);
}

function playAudio(index) {
    if (audioPlayers[index] && !isMuted) {
        audioPlayers[index].play().catch(error => {
            console.error('Error playing audio:', error);
            document.addEventListener('click', () => {
                audioPlayers[index].play();
            }, { once: true });
        });
    }
}

function pauseAudio(index) {
    if (audioPlayers[index]) {
        audioPlayers[index].pause();
        audioPlayers[index].currentTime = 0;
    }
}

function toggleMute(event) {
    isMuted = !isMuted;
    const button = event.target.closest('.mute-button');
    const icon = button.querySelector('i');
    audioPlayers.forEach(audio => {
        audio.muted = isMuted;
    });
    muteButtons.forEach(button => {
        const icon = button.querySelector('i');
        icon.classList.toggle('fa-volume-mute', isMuted);
        icon.classList.toggle('fa-volume-up', !isMuted);
    });
}

function setVolume(event) {
    const volume = event.target.value;
    const slide = event.target.closest('.slide');
    const audio = slide.querySelector('.audio-player');
    audio.volume = volume;
}

document.addEventListener('click', () => {
    slides.forEach((slide, i) => {
        if (slide.classList.contains('active')) {
            playAudio(i);
        }
    });
}, { once: true });

muteButtons.forEach(button => {
    button.addEventListener('click', toggleMute);
});

volumeSliders.forEach(slider => {
    slider.addEventListener('input', setVolume);
});

document.querySelector('.left-arrow')?.addEventListener('click', () => {
    slideIndex = (slideIndex > 0) ? slideIndex - 1 : slides.length - 1;
    showSlide(slideIndex);
});

document.querySelector('.right-arrow')?.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
});


showSlide(slideIndex);









/* document.addEventListener('DOMContentLoaded', function() {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= slides.length) {
            console.error("Invalid slide index: " + slideIndex);
            return;
        }

        slides.forEach((slide, index) => {
            if (index === slideIndex) {
                slide.classList.add('active');
                slide.classList.remove('hidden');
            } else {
                slide.classList.remove('active');
                slide.classList.add('hidden');
            }
        });

        currentSlideIndex = slideIndex;
    }

    function nextSlide() {
        let nextSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(nextSlideIndex);
    }

    function prevSlide() {
        let prevSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        showSlide(prevSlideIndex);
    }

    function openNav() {
        document.getElementById("sidebar").style.width = "250px";
        document.querySelector(".openbtn").classList.add("open");
    }

    function closeNav() {
        document.getElementById("sidebar").style.width = "0";
        document.querySelector(".openbtn").classList.remove("open");
    }

    window.showSlide = showSlide;
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    window.openNav = openNav;
    window.closeNav = closeNav;


    showSlide(currentSlideIndex);
}); */
