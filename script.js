
            // Loading animation
      window.addEventListener('load', function() {
          const loadingOverlay = document.getElementById('loadingOverlay');
          if (loadingOverlay) {
              loadingOverlay.classList.add('fade-out');
              setTimeout(() => {
                  loadingOverlay.style.display = 'none';
              }, 500);
          }
      });

      // Create floating particles
      function createParticles() {
          const particlesContainer = document.getElementById('particles');
          if (!particlesContainer) return;
          
          const numParticles = 50;

          for (let i = 0; i < numParticles; i++) {
              const particle = document.createElement('div');
              particle.className = 'particle';
              particle.style.left = Math.random() * 100 + '%';
              particle.style.top = Math.random() * 100 + '%';
              particle.style.animationDelay = Math.random() * 6 + 's';
              particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
              particlesContainer.appendChild(particle);
          }
      }

      // Initialize particles
      createParticles();

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                  const navbarHeight = document.querySelector('.navbar').offsetHeight;
                  const targetPosition = target.offsetTop - navbarHeight;
                  
                  window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                  });
              }
          });
      });

      // Update active navigation link on scroll
      function updateActiveNavLink() {
          const sections = document.querySelectorAll('section');
          const navLinks = document.querySelectorAll('.nav-link');
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          
          let current = '';
          sections.forEach(section => {
              const sectionTop = section.offsetTop - navbarHeight - 50;
              const sectionBottom = sectionTop + section.offsetHeight;
              
              if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                  current = section.getAttribute('id');
              }
          });

          navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${current}`) {
                  link.classList.add('active');
              }
          });
      }

      // Throttle scroll events for better performance
      function throttle(func, limit) {
          let inThrottle;
          return function() {
              const args = arguments;
              const context = this;
              if (!inThrottle) {
                  func.apply(context, args);
                  inThrottle = true;
                  setTimeout(() => inThrottle = false, limit);
              }
          }
      }

      // Add scroll effect to navbar and update active links
      const handleScroll = throttle(function() {
          const navbar = document.querySelector('.navbar');
          
          // Add/remove scrolled class to navbar
          if (window.scrollY > 0) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }
          
          // Update active navigation link
          updateActiveNavLink();
      }, 16); // ~60fps

      window.addEventListener('scroll', handleScroll);

      // Form submission with validation
      document.querySelector('form').addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form fields
          const name = this.querySelector('input[type="text"]').value.trim();
          const email = this.querySelector('input[type="email"]').value.trim();
          const subject = this.querySelector('input[placeholder="Subject"]').value.trim();
          const message = this.querySelector('textarea').value.trim();
          
          // Basic validation
          if (!name || !email || !subject || !message) {
              alert('Please fill in all fields.');
              return;
          }
          
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
              alert('Please enter a valid email address.');
              return;
          }
          
          // Show loading state
          const submitBtn = this.querySelector('button[type="submit"]');
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
          submitBtn.disabled = true;
          
          // Simulate form submission (replace with actual form handling)
          setTimeout(() => {
              alert('Thank you for your message! I\'ll get back to you soon.');
              this.reset();
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
          }, 1500);
      });

      // Add intersection observer for animations
      const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');
              }
          });
      }, observerOptions);

      // Observe elements for animation
      document.addEventListener('DOMContentLoaded', function() {
          const animateElements = document.querySelectorAll('.project-card, .skill-category, .contact-form');
          animateElements.forEach(el => observer.observe(el));
      });

      // Add typing effect to hero title (optional enhancement)
      function typeWriter(element, text, speed = 50) {
          element.innerHTML = '';
          let i = 0;
          
          function type() {
              if (i < text.length) {
                  element.innerHTML += text.charAt(i);
                  i++;
                  setTimeout(type, speed);
              }
          }
          
          type();
      }

      // Initialize typing effect on load
      window.addEventListener('load', function() {
          const heroTitle = document.querySelector('.hero-title');
          if (heroTitle) {
              const originalText = heroTitle.textContent;
              setTimeout(() => {
                  typeWriter(heroTitle, originalText, 100);
              }, 1000);
          }
      });

      // Add smooth hover effects for project cards
      document.querySelectorAll('.project-card').forEach(card => {
          card.addEventListener('mouseenter', function() {
              this.style.transform = 'translateY(-10px) scale(1.02)';
          });
          
          card.addEventListener('mouseleave', function() {
              this.style.transform = 'translateY(0) scale(1)';
          });
      });

      // Add parallax effect to hero section
      window.addEventListener('scroll', throttle(function() {
          const hero = document.querySelector('.hero');
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          
          if (hero) {
              hero.style.transform = `translateY(${rate}px)`;
          }
      }, 16));

      // Mobile menu close on link click
      document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', function() {
              const navbarCollapse = document.querySelector('.navbar-collapse');
              if (navbarCollapse.classList.contains('show')) {
                  const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                  bsCollapse.hide();
              }
          });
      });

      // Add keyboard navigation support
      document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
              const navbarCollapse = document.querySelector('.navbar-collapse');
              if (navbarCollapse.classList.contains('show')) {
                  const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                  bsCollapse.hide();
              }
          }
      });

      document.getElementById('currentYear').textContent = new Date().getFullYear();

      // Performance optimization: Preload critical images
      function preloadImages() {
          const images = [
              // Add any image URLs you want to preload
          ];
          
          images.forEach(src => {
              const img = new Image();
              img.src = src;
          });
      }

      // Initialize preloading
      preloadImages();
         