// ===================== NAVBAR SCROLL =====================
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) { 
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ===================== ABOUT TITLE ANIMATION =====================
import { animate, splitText, stagger } from 'https://esm.sh/animejs';

const { chars } = splitText('#about-title', {
    words: false,
    chars: true
});

animate(chars, {
    y: [
        { to: '-2.75rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
    ],
    rotate: { from: '-1turn', delay: 0 },
    delay: stagger(50),
    ease: 'inOutCirc',
    loopDelay: 2000,
    loop: true
});

// ===================== NAME LETTER ANIMATION =====================
const nameEl = document.getElementById("name-animate");
const text = nameEl.textContent;

// Wrap each letter in a span
nameEl.innerHTML = text
    .split("")
    .map(char => char === " " ? `<span class="letter">&nbsp;</span>` : `<span class="letter">${char}</span>`)
    .join("");

const letters = nameEl.querySelectorAll(".letter");

// Animate letters one by one in 5 seconds total
const totalDuration = 5;
const staggerTime = totalDuration / letters.length;

gsap.fromTo(
    letters,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.3, stagger: staggerTime, ease: "power3.out" }
);

// ===================== ACTIVE SECTION HIGHLIGHT =====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


const skillBoxes = document.querySelectorAll(".skill-box");

skillBoxes.forEach(box => {
    const desc = box.querySelector(".skill-description");

    // create a timeline for smooth "roll down" effect
    const tl = gsap.timeline({ paused: true });
    tl.to(desc, {
        opacity: 1,
        y: 20,      // moves downward
        duration: 0.6,
        ease: "power3.out"
    });

    box.addEventListener("mouseenter", () => tl.play());
    box.addEventListener("mouseleave", () => tl.reverse());
});


const skillBox = document.querySelector('.skill-description');
const container = document.querySelector('.skill-container');

// Number of stars
const starCount = 5;
const stars = [];

// Octagon points as percentages
const points = [
    {x: 0.3, y: 0}, {x: 0.7, y: 0},
    {x: 1, y: 0.3}, {x: 1, y: 0.7},
    {x: 0.7, y: 1}, {x: 0.3, y: 1},
    {x: 0, y: 0.7}, {x: 0, y: 0.3},
    {x: 0.3, y: 0} // close path
];

const boxWidth = skillBox.offsetWidth;
const boxHeight = skillBox.offsetHeight;

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    container.appendChild(star);
    return {
        el: star,
        progress: Math.random() * (points.length - 1),
        speed: 0.01 + Math.random() * 0.01
    };
}

for (let i = 0; i < starCount; i++) {
    stars.push(createStar());
}

function animateStars() {
    stars.forEach(star => {
        star.progress += star.speed;
        if (star.progress >= points.length - 1) star.progress = 0;

        // Calculate position along path
        const index = Math.floor(star.progress);
        const nextIndex = index + 1;
        const t = star.progress - index;

        const p1 = points[index];
        const p2 = points[nextIndex];

        const x = (p1.x + (p2.x - p1.x) * t) * boxWidth - 3;
        const y = (p1.y + (p2.y - p1.y) * t) * boxHeight - 3;

        star.el.style.left = x + 'px';
        star.el.style.top = y + 'px';
    });

    requestAnimationFrame(animateStars);
}

animateStars();
