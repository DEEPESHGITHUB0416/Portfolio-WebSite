// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form Submission
document.querySelector('.booking-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Appointment request sent! We will contact you shortly.');
  this.reset();
});

// Testimonial Carousel (Simple Version)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
  testimonials.forEach((card, i) => {
    card.style.display = i === index ? 'block' : 'none';
  });
}

// Auto-rotate testimonials every 5s
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Initialize
showTestimonial(0);