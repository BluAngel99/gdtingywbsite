document.addEventListener('DOMContentLoaded', function() {
    let currentSlideIndex = 0;

    function showSlide(slideIndex) {
        var slides = document.querySelectorAll('.slide');
        if (slideIndex < 0 || slideIndex >= slides.length) {
            console.error("Invalid slide index: " + slideIndex);
            return;
        }

        var currentSlide = slides[currentSlideIndex];
        var nextSlide = slides[slideIndex];

        if (currentSlideIndex !== slideIndex) {
            currentSlide.classList.remove('active');
            currentSlide.classList.add('slide-exit');
            nextSlide.classList.remove('hidden'); // Ensure next slide is visible
            nextSlide.classList.add('slide-enter');

            // Trigger reflow to enable transition
            void nextSlide.offsetWidth;

            nextSlide.classList.remove('slide-enter');
            nextSlide.classList.add('slide-enter-active');
            currentSlide.classList.add('slide-exit-active');

            currentSlide.addEventListener('transitionend', function handler() {
                currentSlide.classList.remove('slide-exit-active', 'slide-exit', 'active');
                currentSlide.classList.add('hidden'); // Hide the current slide
                nextSlide.classList.add('active');
                nextSlide.classList.remove('slide-enter-active');
                currentSlide.removeEventListener('transitionend', handler);
            });
        }

        currentSlideIndex = slideIndex;
    }

    function nextSlide() {
        var slides = document.querySelectorAll('.slide');
        var nextSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(nextSlideIndex);
    }

    function prevSlide() {
        var slides = document.querySelectorAll('.slide');
        var prevSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
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
});
