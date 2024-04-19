// back to top
const backToTop = document.querySelector('.backToTop');

window.addEventListener('scroll', checkHeight)

function checkHeight(){
  if(window.scrollY > 200) {
    backToTop.style.display = "flex"
  }
  else {
    backToTop.style.display = "none"
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})

// contact us form
const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");


function sendEmail(){
  const bodyMeassage = `name: ${fullName.value}<br> email: ${email.value}<br> subject: ${subject.value}<br> message: ${message.value}`;

  Email.send({
      Host : "smtp.elasticemail.com",
      Username : "mohitgaur@AniToonHQ.com",
      Password : "6071A1E40D33C00C54811B83388FA5A2D40E",
      To : "gaurmohit1703@gmail.com",
      From : email.value,
      Subject : subject.value,
      Body : bodyMeassage,
  }).then(
      message => alert("Message sent successfully")
  );
}


// owl carousel

$('.owlCarousel').owlCaraousel({
  loop:true,
  autoplay: true,
  autoplayTimeout: 5000,
})