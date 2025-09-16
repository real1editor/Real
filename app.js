// Configuration
const PORTFOLIO = [
  {title: "YouTube - Hair Oil Edit", url: "https://youtube.com/watch?v=xxx"},
  {title: "TikTok Viral Edit", url: "https://vm.tiktok.com/xxx"},
  {title: "Reels - Before/After", url: "https://instagram.com/p/xxx"},
  {title: "Corporate Brand Video", url: "https://vimeo.com/xxx"},
  {title: "Documentary Short Film", url: "https://youtube.com/watch?v=xxx"},
  {title: "Product Launch Video", url: "https://youtube.com/watch?v=xxx"}
];

// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}));

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Check for saved theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

// Sticky Navbar
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "var(--shadow)";
  }
});

// Populate portfolio
const portfolioGrid = document.getElementById("portfolioGrid");
PORTFOLIO.forEach(item => {
  const portfolioItem = document.createElement("div");
  portfolioItem.className = "portfolio-item fade-in";
  portfolioItem.innerHTML = `
    <div class="portfolio-image">
      <i class="fas fa-video"></i>
      <div class="play-icon"><i class="fas fa-play"></i></div>
    </div>
    <div class="portfolio-info">
      <h3>${item.title}</h3>
      <p>Click to view this project on the respective platform.</p>
    </div>
  `;
  
  portfolioItem.addEventListener("click", () => {
    window.open(item.url, "_blank");
  });
  
  portfolioGrid.appendChild(portfolioItem);
});

// Scroll Animation
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(element => {
  observer.observe(element);
});

// Form Submissions
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    const j = await res.json();
    if (j.ok) { 
      alert("✅ Registration sent!"); 
      form.reset(); 
    } else {
      alert("❌ Error: " + (j.error || "server"));
    }
  } catch(err) { 
    alert("⚠️ Network error"); 
    console.error(err); 
  }
});

document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  
  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    const j = await res.json();
    if (j.ok) { 
      alert("💬 Feedback sent — thank you!"); 
      form.reset(); 
    } else {
      alert("❌ Error sending feedback");
    }
  } catch(err) { 
    alert("⚠️ Network error"); 
    console.error(err); 
  }
});
