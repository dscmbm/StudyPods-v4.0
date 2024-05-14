document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
  
    let currentColor = 'black'; // Default color
  
    // Function to draw on canvas
    function draw(e) {
      if (e.buttons !== 1) return; // If mouse button not pressed
      ctx.fillStyle = currentColor;
      ctx.fillRect(e.offsetX, e.offsetY, 10, 10);
    }
  
    // Event listener to draw when mouse is moved while clicked
    canvas.addEventListener('mousemove', draw);
  
    // Event listener to change color when a color is clicked
    const colors = document.querySelectorAll('.color');
    colors.forEach(color => {
      color.addEventListener('click', function() {
        currentColor = color.style.backgroundColor;
      });
    });
  });
  