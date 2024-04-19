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

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("contactForm").reset();

    alert("Form submitted successfully!");
});


document.getElementById("doubtForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let question = document.getElementById("question").value;
    let newQuestion = {
        question: question,
        answers: []
    };

    questions.push(newQuestion);


    document.getElementById("doubtForm").reset();
    displayQuestions();
});


function displayQuestions() {
    let questionsContainer = document.getElementById("questionsContainer");
    questionsContainer.innerHTML = "";
    questions.forEach(function (question, index) {
        let questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            <div class="answersContainer"></div>
            <form class="answerForm">
                <div class="form-group">
                    <label for="answer">Your Answer:</label>
                    <textarea class="answerText" rows="3" required></textarea>
                </div>
                <button type="submit">Submit Answer</button>
            </form>
        `;


        questionElement.querySelector(".answerForm").addEventListener("submit", function (event) {
            event.preventDefault();
            let answerText = questionElement.querySelector(".answerText").value;


            question.answers.push(answerText);

            questionElement.querySelector(".answerForm").reset();


            displayAnswers(question, questionElement);
        });
        displayAnswers(question, questionElement);

        questionsContainer.appendChild(questionElement);
    });
}


function displayAnswers(question, questionElement) {
    let answersContainer = questionElement.querySelector(".answersContainer");
    answersContainer.innerHTML = "";

    question.answers.forEach(function (answer, index) {
        let answerElement = document.createElement("div");
        answerElement.classList.add("answer");
        answerElement.innerHTML = `<p><strong>Answer ${index + 1}:</strong> ${answer}</p>`;
        answersContainer.appendChild(answerElement);
    });
}

let questions = [];

displayQuestions();
