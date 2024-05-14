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


document.getElementById("bookForm").addEventListener("submit", function(event){
    event.preventDefault();
    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const availability = document.getElementById("availability").value;
    const bookImage = document.getElementById("bookImage").files[0]; 
    const email = document.getElementById("email").value;
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const imageSrc = event.target.result;
        const bookDetailsBox = `
            <div class="book-details-box">
                <img src="${imageSrc}" alt="Book Image">
                <p><strong>Title:</strong> ${bookTitle}</p>
                <p><strong>Author:</strong> ${bookAuthor}</p>
                <p><strong>Availability:</strong> ${availability}</p>
                <p><strong>Email:</strong> ${email}</p>
                <div class="comments-section">
                    <h3>Comments</h3>
                    <textarea id="comment-${bookTitle}" class="comment-textarea" placeholder="Leave your comment here..."></textarea>
                    <button class="comment-button" onclick="addComment('${bookTitle}')">Add Comment</button>
                    <div id="comments-${bookTitle}" class="comments"></div>
                </div>
            </div>
        `;
        
       
        document.getElementById("bookDetailsContainer").innerHTML += bookDetailsBox;

        alert("Details submitted successfully!");

      
        document.getElementById("bookForm").reset();
    };
    
   
    reader.readAsDataURL(bookImage);
});

function addComment(bookTitle) {
    const commentTextarea = document.getElementById(`comment-${bookTitle}`);
    const comment = commentTextarea.value;
    const commentsDiv = document.getElementById(`comments-${bookTitle}`);
    commentsDiv.innerHTML += `<p>${comment}</p>`;
    
   
    commentTextarea.value = "";
}
