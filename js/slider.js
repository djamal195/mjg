// Testimonial Slider JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  if (!testimonials.length || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  let interval;
  
  // Show testimonial at specified index
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    // Show selected testimonial
    testimonials[index].classList.add('active');
  }
  
  // Next testimonial
  function nextTestimonial() {
    currentIndex++;
    if (currentIndex >= testimonials.length) {
      currentIndex = 0;
    }
    showTestimonial(currentIndex);
  }
  
  // Previous testimonial
  function prevTestimonial() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = testimonials.length - 1;
    }
    showTestimonial(currentIndex);
  }
  
  // Start automatic sliding
  function startAutoSlide() {
    interval = setInterval(nextTestimonial, 5000);
  }
  
  // Stop automatic sliding
  function stopAutoSlide() {
    clearInterval(interval);
  }
  
  // Event listeners
  nextBtn.addEventListener('click', () => {
    nextTestimonial();
    stopAutoSlide();
    startAutoSlide();
  });
  
  prevBtn.addEventListener('click', () => {
    prevTestimonial();
    stopAutoSlide();
    startAutoSlide();
  });
  
  // Pause auto-slide when hovering over testimonials
  document.querySelector('.testimonials-slider').addEventListener('mouseenter', stopAutoSlide);
  document.querySelector('.testimonials-slider').addEventListener('mouseleave', startAutoSlide);
  
  // Initialize
  showTestimonial(currentIndex);
  startAutoSlide();
});