document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    
    elementsToAnimate.forEach(element => {
      element.classList.add('fade-in'); // You can change this to the animation class you want to use
    });
  });