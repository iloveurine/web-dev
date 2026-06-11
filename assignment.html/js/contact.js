document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop the form from submitting

    var message = document.getElementById("message").value.trim();
    var alert = document.getElementById("alert");

    if (message == "") {
        alert.textContent = "Please enter a message.";
        alert.style.color = "red";
        return
    }

    alert.style.color = "green"
    alert.textContent = "Form submitted! We'll contact you back as soon as possible!"
});