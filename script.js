const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {  // scroll threshold
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
