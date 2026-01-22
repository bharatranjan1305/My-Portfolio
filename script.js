/* ================= SCROLL ANIMATIONS ================= */
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show-items", entry.isIntersecting);
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  },
);

document
  .querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top")
  .forEach((el) => scrollObserver.observe(el));

/* ================= Typed JS ================= */
const typedEl = document.querySelector(".multiple-text");

if (typedEl) {
  new Typed(typedEl, {
    strings: [
      "Full-Stack Developer",
      "Web Developer",
      "Frontend Developer",
      "Ethical Hacker",
    ],
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1200,
    startDelay: 500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });
}


/* ================= SKILLS SECTION ================= */
document.addEventListener("DOMContentLoaded", () => {
  const skillSection = document.querySelector(".skills");
  const bars = document.querySelectorAll(".skill-bar .bar span");
  const circles = document.querySelectorAll(".circle");

  function buildCircles() {
    circles.forEach((elem) => {
      const dots = parseInt(elem.getAttribute("data-dots"));
      const marked = parseInt(elem.getAttribute("data-percent"));
      const percent = Math.floor((dots * marked) / 100);
      const rotate = 360 / dots;

      elem.innerHTML = "";
      for (let i = 0; i < dots; i++) {
        elem.innerHTML += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
      }

      const points = elem.querySelectorAll(".points");
      for (let i = 0; i < percent; i++) {
        setTimeout(() => points[i].classList.add("marked"), i * 25);
      }
    });
  }

  function animateBars() {
    bars.forEach((bar) => {
      let width = "0%";

      if (bar.classList.contains("html")) width = "90%";
      else if (bar.classList.contains("css")) width = "72%";
      else if (bar.classList.contains("javascript")) width = "80%";
      else if (bar.classList.contains("mongodb")) width = "68%";
      else if (bar.classList.contains("react")) width = "75%";
      else if (bar.classList.contains("python")) width = "84%";
      else if (bar.classList.contains("operating-system")) width = "65%";
      else if (bar.classList.contains("linux")) width = "60%";

      bar.style.width = "0%";
      bar.style.transition = "none";
      void bar.offsetWidth;
      bar.style.transition = "width 2s ease-in-out";
      bar.style.width = width;
    });
  }

  function resetAnimations() {
    bars.forEach((bar) => (bar.style.width = "0%"));
    circles.forEach((circle) => (circle.innerHTML = ""));
  }

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateBars();
          buildCircles();
        } else {
          resetAnimations();
        }
      });
    },
    { threshold: 0.3 },
  );

  if (skillSection) skillObserver.observe(skillSection);
});

/* ================= PORTFOLIO MIXITUP================= */
var mixer = mixitup(".portfolio-gallery");

/* ================= ACTIVE MENU ================= */
const menuLinks = document.querySelectorAll("header ul li a");
const sections = document.querySelectorAll("section");

function setActiveMenu() {
  let index = sections.length;

  while (--index >= 0) {
    if (window.scrollY >= sections[index].offsetTop - 150) break;
  }

  menuLinks.forEach((link) => link.classList.remove("active"));
  if (menuLinks[index]) menuLinks[index].classList.add("active");
}

window.addEventListener("scroll", setActiveMenu);
setActiveMenu();

/* ================= STICKY HEADER ================= */
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

/* ================= MOBILE MENU ================= */
const menuIcon = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

menuIcon?.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navlist.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!menuIcon?.contains(e.target) && !navlist?.contains(e.target)) {
    menuIcon?.classList.remove("bx-x");
    navlist?.classList.remove("open");
  }
});

/* ================= CONTACT FORM ================= */
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7nr0dxh",
        "template_jzl52lm",
        "#contact-form",
        "7VysG_iy_FwFYtluv",
      )
      .then(() => {
        contactMessage.textContent = "✅ Message sent successfully!";
        contactMessage.style.color = "green";
        contactForm.reset();

        setTimeout(() => (contactMessage.textContent = ""), 4000);
      })
      .catch(() => {
        contactMessage.textContent = "❌ Message not sent";
        contactMessage.style.color = "red";
      });
  });
}
