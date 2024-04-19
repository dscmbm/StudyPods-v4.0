document.addEventListener("DOMContentLoaded", function() {
    var postForm = document.getElementById("post-form");
    var postContent = document.getElementById("post-content");

    postForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        submitPost();
    });

    postContent.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent adding newline
            submitPost();
        }
    });

    function submitPost() {
        // Get the post content
        var postContentValue = postContent.value.trim(); // Trim any leading/trailing whitespace

        if (postContentValue !== "") {
            // Create a new post element
            var postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = '<div class="post-content">' + postContentValue + '</div>';

            // Append the post to the post container
            document.getElementById('post-container').appendChild(postElement);

            // Clear the post form
            postContent.value = '';
        }
    }
});