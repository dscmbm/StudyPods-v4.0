let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


let slideInterval = setInterval(function () {
    plusSlides(1);
}, 2000);

document.querySelectorAll('.slideshow-container').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
        clearInterval(slideInterval);
    });
    item.addEventListener('mouseleave', function () {
        slideInterval = setInterval(function () {
            plusSlides(1);
        }, 2000);
    });
});

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
        plusSlides(-1);
    } else if (event.keyCode === 39) {
        plusSlides(1);
    }
});





document.getElementById("contactForm").addEventListener("submit", function(event){
    event.preventDefault(); 
    document.getElementById("contactForm").reset();
    
    alert("Form submitted successfully!"); 
  });
  