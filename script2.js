document.addEventListener('DOMContentLoaded', function() {
    const sliderContent = document.querySelector('.slider-content');
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    function showSlide(index) {
        const slideWidth = slides[0].offsetWidth;
        sliderContent.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    leftArrow.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        showSlide(currentIndex);
    });

    rightArrow.addEventListener('click', function() {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    });

    // Optionally, add touch support for mobile devices
    let startX;
    sliderContent.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    });

    sliderContent.addEventListener('touchmove', function(event) {
        const touchX = event.touches[0].clientX;
        const diffX = startX - touchX;

        if (diffX > 50) {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
        } else if (diffX < -50) {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            showSlide(currentIndex);
        }
    });
});