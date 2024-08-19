let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");
let slideshowTimeout;

function showSlides() {
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Increment slide index and reset if necessary
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    // Display the current slide
    slides[slideIndex].style.display = "block";

    // Set timeout to automatically change slide after 5 seconds
    slideshowTimeout = setTimeout(showSlides, 5000);
}

// Function to move to next or previous slide
function plusSlides(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    showSlides();
    clearTimeout(slideshowTimeout); // Clear previous timeout
    slideshowTimeout = setTimeout(showSlides, 5000); // Set new timeout
}

// Function to set current slide
function currentSlide(n) {
    slideIndex = n;
    showSlides();
    clearTimeout(slideshowTimeout); // Clear previous timeout
    slideshowTimeout = setTimeout(showSlides, 5000); // Set new timeout
}

// Initial call to start the slideshow
showSlides();

// Optional: Add event listeners to dots for manual navigation
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function() {
        currentSlide(i);
    });
}
