document.addEventListener('DOMContentLoaded', function() {
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
});
