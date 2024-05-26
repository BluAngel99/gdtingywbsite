document.addEventListener("DOMContentLoaded", () => {
    let currentSlide = 1;
    let isScrolling = false; // To prevent rapid scrolling

    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function loadGif(slide) {
        const gif = slide.querySelector('.gif-overlay img');
        if (gif && gif.dataset.src) {
            gif.src = gif.dataset.src;
        }
    }

    function unloadGif(slide) {
        const gif = slide.querySelector('.gif-overlay img');
        if (gif && gif.src) {
            gif.dataset.src = gif.src;
            gif.removeAttribute('src');
        }
    }

    function showSlide(slideIndex) {
        slides.forEach((slide, index) => {
            if (index + 1 === slideIndex) {
                slide.classList.add('active');
                slide.classList.remove('inactive');
                loadGif(slide);
                // Add animation class if it's the first time the slide is shown
                if (!slide.classList.contains('animated')) {
                    slide.classList.add('animated');
                }
            } else {
                slide.classList.remove('active');
                slide.classList.add('inactive');
                unloadGif(slide);
            }
        });
    }

    function handleScroll(event) {
        if (isScrolling) return; // Prevent multiple rapid scrolls

        isScrolling = true;
        const delta = Math.sign(event.deltaY);
        if (delta > 0) {
            currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
        } else {
            currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
        }
        showSlide(currentSlide);

        setTimeout(() => {
            isScrolling = false;
        }, 800); // Adjust the delay to suit the transition speed
    }

    window.addEventListener('wheel', handleScroll);

    showSlide(currentSlide);
});
