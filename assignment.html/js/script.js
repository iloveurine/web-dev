document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Dynamic On-Scroll Element Animation
    const fadeElements = document.querySelectorAll(".fade-in");
    
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        elementObserver.observe(element);
    });

    // 2. Resource Manager Download Simulation Interaction
    const downloadActionButtons = document.querySelectorAll(".btn-download");
    downloadActionButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const documentAsset = this.getAttribute("data-asset") || "Document package";
            
            // UI Visual Feedback Loop
            const initialText = this.innerText;
            this.innerText = "Processing Package...";
            this.style.opacity = "0.7";
            
            setTimeout(() => {
                alert(`SUCCESS: "${documentAsset}" has been compiled from the APU Student Server! The local front-end distribution file is downloading.`);
                this.innerText = initialText;
                this.style.opacity = "1";
            }, 800);
        });
    });

    // 3. Dynamic Homepage Interactive Hero Interface Router
    const exploreActionTrigger = document.getElementById("action-explore");
    if (exploreActionTrigger) {
        exploreActionTrigger.addEventListener("click", function() {
            alert("Nothing Special Only A Button");
        });
    }
});