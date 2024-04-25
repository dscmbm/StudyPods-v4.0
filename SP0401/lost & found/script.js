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
  

document.getElementById("lostFoundForm").addEventListener("submit", function(event){
    event.preventDefault(); 
    const itemType = document.getElementById("itemType").value;
    const itemName = document.getElementById("itemName").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const photo = document.getElementById("photo").files[0]; 
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const imageSrc = event.target.result;
        const lostFoundDetailsBox = `
            <div class="lost-found-details-box">
                <img src="${imageSrc}" alt="Item Photo">
                <p><strong>Type:</strong> ${itemType}</p>
                <p><strong>Name:</strong> ${itemName}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Location:</strong> ${location}</p>
                <div class="comments-section">
                    <h3>Comments</h3>
                    <textarea id="comment-${itemName}" class="comment-textarea" placeholder="Leave your comment here..."></textarea>
                    <button class="comment-button" onclick="addComment('${itemName}')">Add Comment</button>
                    <div id="comments-${itemName}" class="comments"></div>
                </div>
            </div>
        `;
        
        document.getElementById("lostFoundItems").innerHTML += lostFoundDetailsBox;

        
        document.getElementById("lostFoundForm").reset();
       
        alert("Details submitted successfully!");
    };
    reader.readAsDataURL(photo);
});

function addComment(itemName) {
    const commentTextarea = document.getElementById(`comment-${itemName}`);
    const comment = commentTextarea.value;
    const commentsDiv = document.getElementById(`comments-${itemName}`);
    commentsDiv.innerHTML += `<p>${comment}</p>`;
    commentTextarea.value = "";
}
