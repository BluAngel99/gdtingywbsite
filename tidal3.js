document.addEventListener("DOMContentLoaded", () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.classList.remove('inactive');
            } else {
                slide.classList.remove('active');
                slide.classList.add('inactive');
            }
        });
    }

    function handleScroll(event) {
        const delta = Math.sign(event.deltaY);
        if (delta > 0) {
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }
        showSlide(currentSlide);
    }

    window.addEventListener('wheel', handleScroll);
    showSlide(currentSlide);
});
