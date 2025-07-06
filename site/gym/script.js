document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > heroHeight - 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // About Slider
    const slides = document.querySelectorAll('.slide');
    const sliderBtns = document.querySelectorAll('.slider-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        sliderBtns.forEach(btn => btn.classList.remove('active'));
        
        slides[index].classList.add('active');
        sliderBtns[index].classList.add('active');
        currentSlide = index;
    }
    
    sliderBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide change
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
    
    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        const nameError = name.nextElementSibling;
        if (name.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.classList.add('show');
            isValid = false;
        } else {
            nameError.classList.remove('show');
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailError = email.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailError.classList.add('show');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailError.classList.add('show');
            isValid = false;
        } else {
            emailError.classList.remove('show');
        }
        
        // Phone validation (optional)
        const phone = document.getElementById('phone');
        const phoneError = phone.nextElementSibling;
        const phoneRegex = /^[0-9]{10,15}$/;
        if (phone.value.trim() !== '' && !phoneRegex.test(phone.value)) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneError.classList.add('show');
            isValid = false;
        } else {
            phoneError.classList.remove('show');
        }
        
        // Message validation
        const message = document.getElementById('message');
        const messageError = message.nextElementSibling;
        if (message.value.trim() === '') {
            messageError.textContent = 'Message is required';
            messageError.classList.add('show');
            isValid = false;
        } else {
            messageError.classList.remove('show');
        }
        
        if (isValid) {
            // Form is valid, you can submit it here
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });
    
    // Animated Counter
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements with gsap-animate class
    gsap.utils.toArray('.gsap-animate').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Animate sections when they come into view
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Start counter animation when stats section is in view
    const statsSection = document.querySelector('.stats');
    
    ScrollTrigger.create({
        trigger: statsSection,
        start: 'top 80%',
        onEnter: animateCounters
    });
    
    // Dark/Light Theme Toggle
    const themeToggle = document.querySelector('.dark-mode-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Optionally store preference
        if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('theme', 'dark');
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
          localStorage.setItem('theme', 'light');
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
      });
      // On load, set theme from storage
      if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});