// Main JavaScript File

// DOM elements
const header = document.getElementById("header")
const menuToggle = document.querySelector(".menu-toggle")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-menu a")
const vehicleFilters = document.querySelectorAll(".filter-btn")
const vehicleCards = document.querySelectorAll(".vehicle-card")

// Handle Header Scroll
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
}

// Mobile Menu Toggle
function toggleMenu() {
  navMenu.classList.toggle("active")
}

// Close menu when clicking on a link
function closeMenu() {
  navMenu.classList.remove("active")
}

// Handle Vehicle Filtering
function filterVehicles(filter) {
  // Remove active class from all filter buttons
  vehicleFilters.forEach((btn) => {
    btn.classList.remove("active")
  })

  // Add active class to clicked filter button
  this.classList.add("active")

  // Filter vehicles
  vehicleCards.forEach((card) => {
    if (filter === "all" || card.dataset.category === filter) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementPosition < windowHeight - 100) {
      const animationType = element.dataset.animation || "fade-in"
      element.classList.add(animationType)
    }
  })
}

// Form Submission - COMMENTÉ POUR UTILISER LE NOUVEAU SYSTÈME DE FORMULAIRE
/*
function handleFormSubmission(e) {
  e.preventDefault()
  alert("Votre demande a été envoyée. Nous vous contacterons bientôt!")
  e.target.reset()
}
*/

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Scroll event for header
  window.addEventListener("scroll", handleScroll)

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu)
  }

  // Close menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu)
  })

  // Vehicle filtering
  vehicleFilters.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")
      filterVehicles.call(this, filter)
    })
  })

  // Animation on scroll
  window.addEventListener("scroll", animateOnScroll)
  // Trigger once on page load
  animateOnScroll()

  // Form submissions - COMMENTÉ POUR UTILISER LE NOUVEAU SYSTÈME DE FORMULAIRE
  const bookingForm = document.getElementById("booking-form")
  const contactForm = document.getElementById("contact-form")

  if (bookingForm) {
    bookingForm.addEventListener("submit", handleFormSubmission)
  }

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmission)
  }
  */

  // Initialize active nav link based on scroll position
  updateActiveNavLink()
  window.addEventListener("scroll", updateActiveNavLink)
})

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-menu a")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}