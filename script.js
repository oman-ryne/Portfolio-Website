// script.js
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const currentTheme = localStorage.getItem("theme");

// Set the initial theme
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    updateThemeIcons(true);
  }
} else {
  // Default to light theme if no preference is set
  document.documentElement.setAttribute("data-theme", "light");
  updateThemeIcons(false);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    updateThemeIcons(false);
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    updateThemeIcons(true);
  }
}

function updateThemeIcons(isDark) {
  const icons = document.querySelectorAll(".theme-toggle i");
  icons.forEach(icon => {
    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);
  });
}

// Event listeners for theme toggles
if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

if (themeToggleMobile) {
  themeToggleMobile.addEventListener("click", toggleTheme);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        icon.classList.remove("open");
      }
    }
  });
});

// Animate skill bars on scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    if (isElementInViewport(bar)) { // Remove the extra parenthesis
      bar.style.width = width;
    }
  });
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.skill-card, .project-card, .details-container, .contact-info-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
  
  animateSkillBars();
}

// Text animation
function textAnimation() {
  const text = document.querySelector(".sec-text");
  if (text) {
    const textLoad = () => {
      setTimeout(() => {
        text.textContent = "Web Developer";
      }, 0);
      setTimeout(() => {
        text.textContent = "CyberSecurity Enthusiast";
      }, 4000);
    };
    textLoad();
    setInterval(textLoad, 8000);
  }
}

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.skill-card, .project-card, .details-container, .contact-info-card');
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Initialize skill bars
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    bar.style.width = '0';
  });
  
  // Trigger animation for elements already in view
  setTimeout(() => {
    animateOnScroll();
    textAnimation();
  }, 100);
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);