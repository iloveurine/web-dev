document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop the form from submitting

    var comment = document.getElementById("comment").value.trim();
    var alert = document.getElementById("alert");

    if (comment == "") {
        alert.textContent = "Please fill all fields.";
        alert.style.color = "red";
        return;
    }

    alert.style.color = "green";
    alert.textContent = "Feedback submitted! Thank you!";
});