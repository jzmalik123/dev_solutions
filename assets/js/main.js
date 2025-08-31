document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }
  
  // Navigation scrolling behavior - only for section-based navigation
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Always allow navigation to HTML files or external links - do not interfere
      if (href && (href.startsWith('http') || href.endsWith('.html') || href.includes('.html'))) {
        // Close mobile menu if it's open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          const menuToggle = document.getElementById('menu-toggle');
          if (menuToggle) {
            menuToggle.classList.remove('open');
          }
        }
        return; // Let browser handle the navigation normally
      }
      
      // Only handle section-based navigation (href starting with #)
      if (!href || !href.startsWith('#')) {
        return;
      }
      
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      const targetId = href;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if it's open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('block')) {
        mobileMenu.classList.remove('block');
        mobileMenu.classList.add('hidden');
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
          menuToggle.classList.remove('open');
        }
      }
    });
  });
  
  // Navigation scroll effect
  const navbar = document.getElementById('main-nav');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('open');
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Initialize Swiper for testimonials
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonialSwiper')) {
    const testimonialSwiper = new Swiper('.testimonialSwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
      }
    });
  }
  
  // Career items expansion
  const jobDetailsBtns = document.querySelectorAll('.job-details-btn');
  jobDetailsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const details = this.parentElement.nextElementSibling;
      details.classList.toggle('hidden');
      
      // Update button text
      const langEn = this.querySelector('.lang-en');
      const langSr = this.querySelector('.lang-sr');
      
      if (details.classList.contains('hidden')) {
        if (langEn) langEn.textContent = 'View Details';
        if (langSr) langSr.textContent = 'Pogledaj detalje';
      } else {
        if (langEn) langEn.textContent = 'Hide Details';
        if (langSr) langSr.textContent = 'Sakrij detalje';
      }
    });
  });
  
  // Portfolio filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active state on buttons
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-gray-200', 'text-gray-800');
      });
      this.classList.add('bg-blue-600', 'text-white');
      this.classList.remove('bg-gray-200', 'text-gray-800');
      
      const filterValue = this.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
  
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      let valid = true;
      const fields = ['name', 'email', 'subject', 'message'];
      
      fields.forEach(field => {
        const input = document.getElementById(field);
        const error = document.getElementById(`${field}-error`);
        
        if (input && !input.value.trim()) {
          valid = false;
          if (error) {
            error.textContent = `Please enter your ${field}`;
            error.classList.remove('hidden');
          }
          input.classList.add('border-red-500');
        } else if (input && error) {
          error.classList.add('hidden');
          input.classList.remove('border-red-500');
        }
        
        // Additional validation for email
        if (field === 'email' && input && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            valid = false;
            if (error) {
              error.textContent = 'Please enter a valid email address';
              error.classList.remove('hidden');
            }
            input.classList.add('border-red-500');
          }
        }
      });
      
      if (valid && submitBtn && formMessage) {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        
        // Simulate form submission
        setTimeout(() => {
          formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700');
          formMessage.classList.add('bg-green-100', 'text-green-700');
          
          const language = localStorage.getItem('language') || 'en';
          if (language === 'en') {
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
          } else {
            formMessage.textContent = 'Hvala! Vaša poruka je uspešno poslata.';
          }
          
          // Reset form
          contactForm.reset();
          
          // Reset button state
          submitBtn.disabled = false;
          const language2 = localStorage.getItem('language') || 'en';
          if (language2 === 'en') {
            submitBtn.innerHTML = 'Send Message';
          } else {
            submitBtn.innerHTML = 'Pošalji poruku';
          }
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formMessage.classList.add('hidden');
          }, 5000);
        }, 1500);
      }
    });
  }
  
  // Feedback widget
  const feedbackButton = document.getElementById('feedback-button');
  const feedbackModal = document.getElementById('feedback-modal');
  const closeFeedback = document.getElementById('close-feedback');
  const feedbackForm = document.getElementById('feedback-form');
  const ratingBtns = document.querySelectorAll('.rating-btn');
  
  if (feedbackButton && feedbackModal) {
    feedbackButton.addEventListener('click', function() {
      feedbackModal.classList.remove('hidden');
    });
  }
  
  if (closeFeedback && feedbackModal) {
    closeFeedback.addEventListener('click', function() {
      feedbackModal.classList.add('hidden');
    });
  }
  
  // Close modal when clicking outside
  if (feedbackModal) {
    feedbackModal.addEventListener('click', function(e) {
      if (e.target === feedbackModal) {
        feedbackModal.classList.add('hidden');
      }
    });
  }
  
  // Rating selection
  ratingBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Clear active state
      ratingBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
      });
      
      // Set active state
      this.classList.add('bg-blue-600', 'text-white');
    });
  });
  
  // Feedback form submission
  if (feedbackForm && feedbackModal) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get selected rating
      const selectedRating = document.querySelector('.rating-btn.bg-blue-600')?.getAttribute('data-rating');
      const feedbackText = document.getElementById('feedback-text')?.value;
      
      // Basic validation
      if (!selectedRating) {
        alert('Please select a rating');
        return;
      }
      
      // Simulate form submission
      feedbackModal.classList.add('hidden');
      
      // Reset form
      feedbackForm.reset();
      ratingBtns.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
      });
    });
  }
  
  // Language toggle
  const langEn = document.getElementById('lang-en');
  const langSr = document.getElementById('lang-sr');
  
  // Check if language preference exists in localStorage
  const savedLanguage = localStorage.getItem('language') || 'en';
  setLanguage(savedLanguage);
  
  if (langEn) {
    langEn.addEventListener('click', function() {
      setLanguage('en');
    });
  }
  
  if (langSr) {
    langSr.addEventListener('click', function() {
      setLanguage('sr');
    });
  }
  
  function setLanguage(lang) {
    localStorage.setItem('language', lang);
    
    const enElements = document.querySelectorAll('.lang-en');
    const srElements = document.querySelectorAll('.lang-sr');
    
    if (lang === 'en') {
      // Update toggle state
      if (langEn) {
        langEn.classList.add('text-blue-600');
        langEn.classList.remove('text-gray-400');
      }
      if (langSr) {
        langSr.classList.add('text-gray-400');
        langSr.classList.remove('text-blue-600');
      }
      
      // Show English, hide Serbian
      enElements.forEach(el => el.classList.remove('hidden'));
      srElements.forEach(el => el.classList.add('hidden'));
    } else {
      // Update toggle state
      if (langSr) {
        langSr.classList.add('text-blue-600');
        langSr.classList.remove('text-gray-400');
      }
      if (langEn) {
        langEn.classList.add('text-gray-400');
        langEn.classList.remove('text-blue-600');
      }
      
      // Show Serbian, hide English
      srElements.forEach(el => el.classList.remove('hidden'));
      enElements.forEach(el => el.classList.add('hidden'));
    }
  }
  
  // Implement animated counters
  const counterElements = document.querySelectorAll('.counter-value');
  
  if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
      observer.observe(counter);
    });
  }
  
  function animateCounter(counterElement) {
    const targetValue = parseInt(counterElement.innerText);
    let currentValue = 0;
    const duration = 2000; // ms
    const interval = 20; // ms
    const step = targetValue / (duration / interval);
    
    const timer = setInterval(() => {
      currentValue += step;
      if (currentValue >= targetValue) {
        clearInterval(timer);
        counterElement.innerText = targetValue;
      } else {
        counterElement.innerText = Math.floor(currentValue);
      }
    }, interval);
  }

  // Mobile dropdown toggle
  const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const dropdownMenu = this.nextElementSibling;
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('hidden');
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-chevron-down');
          icon.classList.toggle('fa-chevron-up');
        }
      }
    });
  });

  // Load dynamic content if function exists
  if (typeof loadDynamicContent === 'function') {
    loadDynamicContent();
  }
});
