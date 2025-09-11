/**
 * Main JavaScript for Nebula Intelligence Website
 * AIris Product Website Interactive Features
 */

class NebulaWebsite {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    this.navMenu = document.getElementById("nav-menu");
    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupSmoothScrolling();
    this.setupMobileMenu();
    this.setupAnimations();
    this.setupVideoPlayer();
    this.setupDownloadButtons();
    this.setupScrollIndicator();
    this.setupContactForm();
    this.startPerformanceAnimations();
  }

  // Navbar scroll effects with performance throttling
  setupScrollEffects() {
    let lastScrollTop = 0;
    let scrollTimeout = null;
    let isScrolling = false;

    // Throttled scroll handler for better performance
    const throttledScrollHandler = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Add/remove scrolled class
          if (scrollTop > 50) {
            this.navbar.classList.add("scrolled");
          } else {
            this.navbar.classList.remove("scrolled");
          }

          // Hide/show navbar on scroll with hardware acceleration
          if (scrollTop > lastScrollTop && scrollTop > 100) {
            this.navbar.style.transform = "translate3d(0, -100%, 0)";
          } else {
            this.navbar.style.transform = "translate3d(0, 0, 0)";
          }

          lastScrollTop = scrollTop;
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    // Debounced scroll end handler
    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Scroll ended - optimize animations
        document.body.classList.remove('scrolling');
      }, 150);
    };

    window.addEventListener("scroll", () => {
      document.body.classList.add('scrolling');
      throttledScrollHandler();
      handleScrollEnd();
    }, { passive: true });
  }

  // Smooth scrolling for navigation links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Use the CSS variable for navbar height for consistency
          const navbarHeight = 80; // var(--navbar-height) = 80px

          // Different padding for different sections
          let extraPadding = 0; // Default padding
          if (targetId === "features") {
            extraPadding = -120; // More negative padding to scroll further down
          } else if (targetId === "demo") {
            extraPadding = -100; // Negative padding for demo section
          } else if (targetId === "screenshots") {
            extraPadding = -60; // Half the negative padding for better positioning
          } else if (targetId === "contact") {
            extraPadding = -150; // More negative padding for contact section
          }

          const targetPosition =
            targetElement.offsetTop - navbarHeight - extraPadding;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Close mobile menu if open
          this.closeMobileMenu();

          // Update active nav link
          this.updateActiveNavLink(targetId);
        }
      });
    });
  }

  // Mobile menu functionality
  setupMobileMenu() {
    if (this.mobileMenuToggle && this.navMenu) {
      this.mobileMenuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMobileMenu();
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!this.navbar.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
    }
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle("mobile-open");
    this.mobileMenuToggle.classList.toggle("active");
    document.body.classList.toggle("mobile-menu-open");
    
    if (this.navMenu.classList.contains("mobile-open")) {
      // Ensure menu is visible (move to body to avoid parent issues)
      document.body.appendChild(this.navMenu);
    } else {
      this.navMenu.style.display = "none";
    }
  }

  closeMobileMenu() {
    this.navMenu.classList.remove("mobile-open");
    this.mobileMenuToggle.classList.remove("active");
    document.body.classList.remove("mobile-menu-open");
    this.navMenu.style.display = "none";
  }

  // Update active navigation link based on scroll position
  updateActiveNavLink(targetId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    const activeLink = document.querySelector(`a[href="#${targetId}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // Intersection Observer for scroll-triggered animations
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document
      .querySelectorAll(
        ".feature-card, .tech-feature, .stat-card, .demo-check-item"
      )
      .forEach((el) => {
        el.classList.add("animate-on-scroll");
        observer.observe(el);
      });

    // Section observer for active nav links
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            this.updateActiveNavLink(sectionId);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Video player functionality
  setupVideoPlayer() {
    const videoPlaceholder = document.querySelector(".video-placeholder");
    const playButton = document.querySelector(".play-button");

    if (videoPlaceholder && playButton) {
      videoPlaceholder.addEventListener("click", () => {
        this.playDemoVideo();
      });
    }
  }

  playDemoVideo() {
    // Placeholder for video player functionality
    // In a real implementation, this would open a modal or embed a video
    alert(
      "Demo video would play here. Replace with actual video player implementation."
    );
  }

  // Download button functionality
  setupDownloadButtons() {
    document.querySelectorAll(".download-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const platform = btn.querySelector(".btn-platform").textContent;
        this.handleDownload(platform);
      });
    });
  }

  // Scroll indicator functionality
  setupScrollIndicator() {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        this.scrollToNextSection();
      });
    }
  }

  scrollToNextSection() {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      // Use the exact same calculation as navbar Features link
      const navbarHeight = 80; // var(--navbar-height) = 80px
      const extraPadding = -120; // Same as Features link
      const targetPosition =
        featuresSection.offsetTop - navbarHeight - extraPadding;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  // Contact form functionality
  setupContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      // Initialize EmailJS
      this.initializeEmailJS();

      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleContactFormSubmit(contactForm);
      });

      // Add real-time validation
      this.setupFormValidation(contactForm);

      // Add spam protection
      this.setupSpamProtection(contactForm);
    }
  }

  // Initialize EmailJS
  initializeEmailJS() {
    // EmailJS configuration - Güvenli konfigürasyon
    if (typeof EMAILJS_CONFIG !== "undefined") {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      this.emailConfig = {
        serviceId: EMAILJS_CONFIG.serviceId,
        templateId: EMAILJS_CONFIG.templateId,
        publicKey: EMAILJS_CONFIG.publicKey,
      };
    } else {
      // Fallback: Güvenli varsayılan değerler
      const config = {
        publicKey: "RCirv8j1Hdd5u3soI",
        serviceId: "service_m8yq9e8",
        templateId: "template_kc8bl1l",
      };

      emailjs.init(config.publicKey);
      this.emailConfig = {
        serviceId: config.serviceId,
        templateId: config.templateId,
        publicKey: config.publicKey,
      };
    }
  }

  setupFormValidation(form) {
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      // Skip hidden spam protection field
      if (input.name === "website") return;

      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        if (input.classList.contains("error")) {
          this.validateField(input);
        }
        // Clear error on input
        this.clearFieldError(input);
      });
    });
  }

  // Setup spam protection
  setupSpamProtection(form) {
    // Honeypot field (already in HTML)
    const honeypot = form.querySelector('input[name="website"]');

    // Rate limiting
    this.formSubmissionCount = 0;
    this.lastSubmissionTime = 0;

    // Add form submission tracking
    form.addEventListener("submit", (e) => {
      const now = Date.now();
      const timeSinceLastSubmission = now - this.lastSubmissionTime;

      // Allow max 3 submissions per minute
      if (timeSinceLastSubmission < 60000 && this.formSubmissionCount >= 3) {
        e.preventDefault();
        this.showNotification(
          "Too many submissions. Please wait a moment before trying again.",
          "error"
        );
        return;
      }

      // Check honeypot
      if (honeypot.value !== "") {
        e.preventDefault();
        console.log("Spam detected - honeypot field filled");
        return;
      }

      this.formSubmissionCount++;
      this.lastSubmissionTime = now;
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = "";

    // Remove existing error styling
    field.classList.remove("error");
    this.clearFieldError(field);

    // Validation rules
    switch (fieldName) {
      case "name":
        if (!value) {
          isValid = false;
          errorMessage = "Name is required";
        } else if (value.length < 2) {
          isValid = false;
          errorMessage = "Name must be at least 2 characters";
        } else if (value.length > 50) {
          isValid = false;
          errorMessage = "Name must be less than 50 characters";
        } else if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(value)) {
          isValid = false;
          errorMessage = "Name can only contain letters and spaces";
        }
        break;

      case "email":
        if (!value) {
          isValid = false;
          errorMessage = "Email is required";
        } else if (!this.isValidEmail(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        } else if (value.length > 100) {
          isValid = false;
          errorMessage = "Email must be less than 100 characters";
        }
        break;

      case "subject":
        if (!value) {
          isValid = false;
          errorMessage = "Subject is required";
        } else if (value.length < 3) {
          isValid = false;
          errorMessage = "Subject must be at least 3 characters";
        } else if (value.length > 100) {
          isValid = false;
          errorMessage = "Subject must be less than 100 characters";
        }
        break;

      case "message":
        if (!value) {
          isValid = false;
          errorMessage = "Message is required";
        } else if (value.length < 10) {
          isValid = false;
          errorMessage = "Message must be at least 10 characters";
        } else if (value.length > 1000) {
          isValid = false;
          errorMessage = "Message must be less than 1000 characters";
        }
        break;
    }

    if (!isValid) {
      field.classList.add("error");
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }

  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }

  handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Remove honeypot field from data
    delete data.website;

    // Validate all fields
    const inputs = form.querySelectorAll("input, select, textarea");
    let isFormValid = true;

    inputs.forEach((input) => {
      if (input.name !== "website" && !this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      // Form validation failed - errors are shown visually on fields
      this.showNotification(
        "Please fix the errors above and try again.",
        "error"
      );
      return;
    }

    // Show loading state
    this.setSubmitButtonLoading(true);

    // Send email using EmailJS
    this.sendEmail(data)
      .then(() => {
        // Success
        form.reset();
        this.showNotification(
          "Message sent successfully! We'll get back to you soon.",
          "success"
        );
        console.log("Contact form submitted successfully:", data);
      })
      .catch((error) => {
        // Error
        console.error("Email sending failed:", error);
        this.showNotification(
          "Sorry, there was an error sending your message. Please try again or contact us directly.",
          "error"
        );
      })
      .finally(() => {
        // Always reset button state
        this.setSubmitButtonLoading(false);
      });
  }

  // Set submit button loading state - Fixed with null checks
  setSubmitButtonLoading(loading) {
    const submitBtn = document.getElementById("submit-btn");
    if (!submitBtn) {
      console.error("Submit button not found");
      return;
    }

    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    if (!btnText || !btnLoading) {
      // Fallback for simple button text
      if (loading) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      }
      return;
    }

    if (loading) {
      submitBtn.disabled = true;
      btnText.style.display = "none";
      btnLoading.style.display = "inline-flex";
    } else {
      submitBtn.disabled = false;
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
    }
  }

  // Send email using EmailJS
  async sendEmail(data) {
    // Check if EmailJS is available
    if (typeof emailjs === "undefined") {
      throw new Error("EmailJS is not loaded");
    }

    // Prepare template parameters - Updated for your template
    const templateParams = {
      name: data.name, // For {{name}} in template
      from_name: data.name, // For {{from_name}} in template
      from_email: data.email, // For {{from_email}} in template
      subject: data.subject, // For {{subject}} in template
      message: data.message, // For {{message}} in template
      to_email:
        typeof getSecureEmail !== "undefined"
          ? getSecureEmail()
          : "nebulaicompany" + "@" + "gmail.com", // Güvenli email adresi
      reply_to: data.email, // For reply functionality
    };

    try {
      // Send email using the correct EmailJS method
      const response = await emailjs.send(
        this.emailConfig.serviceId,
        this.emailConfig.templateId,
        templateParams
      );

      console.log("EmailJS Response:", response);
      return response;
    } catch (error) {
      console.error("EmailJS Error Details:", error);

      // More detailed error handling
      if (error.status === 404) {
        throw new Error(
          "EmailJS service not found. Please check your Service ID and Template ID."
        );
      } else if (error.status === 401) {
        throw new Error(
          "EmailJS authentication failed. Please check your Public Key."
        );
      } else {
        throw new Error(
          `EmailJS error: ${error.text || error.message || "Unknown error"}`
        );
      }
    }
  }

  handleDownload(platform) {
    // Placeholder for download functionality
    // In a real implementation, this would trigger actual downloads
    console.log(`Download for ${platform} initiated`);

    // Show notification
    this.showNotification(
      `Download for ${platform} will begin shortly...`,
      "success"
    );
  }

  // Performance animations for hero section
  startPerformanceAnimations() {
    this.animateProgressBar();
    this.animateStats();
    this.animateTypingEffect();
  }

  animateProgressBar() {
    const progressFill = document.querySelector(".progress-fill");
    if (progressFill) {
      setTimeout(() => {
        progressFill.style.animation = "progressFill 3s ease-in-out infinite";
      }, 1000);
    }
  }

  animateStats() {
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach((stat, index) => {
      setTimeout(() => {
        this.countUpAnimation(stat);
      }, 500 + index * 200);
    });
  }

  countUpAnimation(element) {
    const target = element.textContent;
    const isPercentage = target.includes("%");
    const isTime = target.includes("ms");
    const isCount = target.includes("K+");

    let startValue = 0;
    let endValue;
    let suffix = "";

    if (isPercentage) {
      endValue = parseFloat(target);
      suffix = "%";
    } else if (isTime) {
      endValue = parseFloat(target);
      suffix = "ms";
    } else if (isCount) {
      endValue = parseFloat(target);
      suffix = "K+";
    } else {
      endValue = parseFloat(target) || 0;
    }

    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / endValue));

    const timer = setInterval(() => {
      startValue += endValue / (duration / 16);
      if (startValue >= endValue) {
        startValue = endValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(startValue) + suffix;
    }, 16);
  }

  animateTypingEffect() {
    const badge = document.querySelector(".hero-badge span");
    if (badge) {
      const text = badge.textContent;
      badge.textContent = "";
      badge.style.width = "auto";

      let i = 0;
      const typeInterval = setInterval(() => {
        badge.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(typeInterval);
        }
      }, 50);
    }
  }

  // Utility function to show notifications
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;

    let iconClass = "info-circle";
    if (type === "success") iconClass = "check-circle";
    else if (type === "error") iconClass = "exclamation-circle";
    else if (type === "warning") iconClass = "exclamation-triangle";

    notification.innerHTML = `
      <i class="fas fa-${iconClass}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000); // Show for 5 seconds
  }

  // Utility function for smooth animations
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
}

// Performance-Optimized Stellar background animation system
class StellarBackground {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth <= 768;
    
    if (!this.isReducedMotion) {
      this.createShootingStars();
      this.createFloatingParticles();
    }
  }

  createShootingStars() {
    // Reduce frequency on mobile for better performance
    const interval = this.isMobile ? 8000 : 5000;
    
    setInterval(() => {
      // Don't create stars during scrolling
      if (!document.body.classList.contains('scrolling')) {
        this.createShootingStar();
      }
    }, interval + Math.random() * 3000);
  }

  createShootingStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.cssText = `
      position: fixed;
      width: 2px;
      height: 2px;
      background: rgba(139, 92, 246, 0.8);
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 50}vh;
      animation: shootingStar 2s linear forwards;
      will-change: transform;
      transform: translate3d(0, 0, 0);
    `;

    document.body.appendChild(star);

    setTimeout(() => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    }, 2000);
  }

  createFloatingParticles() {
    // Reduce particles on mobile
    const particleCount = this.isMobile ? 8 : 15;
    
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        this.createParticle();
      }, i * 300);
    }
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.cssText = `
      position: fixed;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      background: rgba(139, 92, 246, ${0.2 + Math.random() * 0.4});
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      animation: floatParticle ${15 + Math.random() * 15}s ease-in-out infinite;
      will-change: transform, opacity;
      transform: translate3d(0, 0, 0);
    `;

    document.body.appendChild(particle);
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.startTime = performance.now();
    this.logPageLoad();
  }

  logPageLoad() {
    window.addEventListener("load", () => {
      const loadTime = performance.now() - this.startTime;
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

      // Log performance metrics
      if ("performance" in window) {
        const perfData = performance.getEntriesByType("navigation")[0];
        console.log("Performance metrics:", {
          domContentLoaded:
            perfData.domContentLoadedEventEnd -
            perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          totalTime: perfData.loadEventEnd - perfData.fetchStart,
        });
      }
    });
  }
}

// Function to scroll to home section when logo is clicked
function scrollToHome() {
  const homeSection = document.getElementById("home");
  if (homeSection) {
    const navbarHeight = 80; // var(--navbar-height) = 80px
    const targetPosition = homeSection.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const website = new NebulaWebsite();
  const stellar = new StellarBackground();
  const monitor = new PerformanceMonitor();

  console.log("🌌 Nebula Intelligence Website Initialized");
  console.log("🚀 AIris Product Website Ready");

  // Initialize Horizontal Gallery Navigation
  initializeGallery();
});

// Horizontal Gallery Navigation
function initializeGallery() {
  const track = document.querySelector(".gallery-track");
  const items = document.querySelectorAll(".gallery-item");
  const pagination = document.querySelector(".gallery-pagination");
  const indicators = document.querySelectorAll(".page-indicator");

  if (!track || !items.length) return;

  let currentIndex = 0;
  const totalItems = items.length;

  // Set track width dynamically based on number of items
  track.style.width = `calc(${totalItems} * 100vw)`;
  
  // Each gallery item should take full viewport width
  items.forEach((item, index) => {
    item.style.width = "100vw";
    item.style.minWidth = "100vw";
  });
  
  // Log initialization only for mobile debugging
  if (window.innerWidth <= 768) {
    console.log(`🎠 Mobile Gallery initialized:`, {
      totalItems: totalItems,
      viewportWidth: window.innerWidth
    });
  }

  // Responsive gallery handling
  function handleResponsiveGallery() {
    const viewportWidth = window.innerWidth;
    
    // Both mobile and desktop: each item takes full viewport width
    // Track width is totalItems * viewport width to hold all slides side by side
    items.forEach((item, index) => {
      item.style.width = `${viewportWidth}px`;
      item.style.minWidth = `${viewportWidth}px`;
      item.style.maxWidth = `${viewportWidth}px`;
    });
    
    const totalTrackWidth = totalItems * viewportWidth;
    track.style.width = `${totalTrackWidth}px`;

    // Keep current slide position but update navigation
    updateNavigation();
  }

  function updateNavigation() {
    // Update pagination indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  function goToSlide(index, isSmooth = false, isMomentum = false) {
    currentIndex = index;
    // Calculate transform based on viewport width
    const viewportWidth = window.innerWidth;
    const translateX = -currentIndex * viewportWidth;

    // DEBUG: Log the calculations (mobile only)
    if (viewportWidth <= 768) {
      console.log(`🎠 Mobile Gallery Debug:`, {
        slideIndex: index,
        viewportWidth: viewportWidth,
        translateX: translateX,
        totalItems: totalItems,
        trackWidth: track.style.width
      });
    }

    // Add appropriate transition class for enhanced animations
    if (isSmooth || isMomentum) {
      const transitionClass = isMomentum
        ? "momentum-transition"
        : "smooth-transition";
      const duration = isMomentum ? 1000 : 700; // Match CSS timing

      track.classList.add(transitionClass);
      setTimeout(() => {
        track.classList.remove(transitionClass);
      }, duration);
    }

    track.style.transform = `translateX(${translateX}px)`;
    updateNavigation();
  }

  // Add pagination click events with smooth transitions
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      // Use smooth transition for pagination clicks
      goToSlide(index, true);
    });
  });

  // Initialize navigation state
  updateNavigation();

  // Handle responsive gallery on resize
  window.addEventListener("resize", () => {
    handleResponsiveGallery();
    // Recalculate current slide position on resize
    goToSlide(currentIndex, false);
  });

  // Initial responsive check
  handleResponsiveGallery();
  
  // Force initial position to slide 0
  setTimeout(() => {
    goToSlide(0, false);
  }, 100);

  // Touch/swipe support for mobile
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isHorizontalSwipe = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isHorizontalSwipe = false;
  });

  track.addEventListener("touchmove", (e) => {
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;

    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(currentY - startY);

    // Only prevent default if this is clearly a horizontal swipe
    if (diffX > diffY && diffX > 10) {
      isHorizontalSwipe = true;
      e.preventDefault(); // Prevent page scroll only for horizontal swipes
    }
  });

  track.addEventListener("touchend", () => {
    if (!isHorizontalSwipe) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < totalItems - 1) {
        // Swipe left - next with smooth animation
        goToSlide(currentIndex + 1, true);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - prev with smooth animation
        goToSlide(currentIndex - 1, true);
      }
    }

    // Reset swipe tracking
    isHorizontalSwipe = false;
  });

  // Modern momentum-based mouse drag system
  let mouseState = {
    startX: 0,
    currentX: 0,
    lastX: 0,
    isDragging: false,
    hasMouseMoved: false,
    dragOffset: 0,
    initialTransform: 0,
    velocity: 0,
    velocityTracker: [],
    momentumID: null,
    lastTime: 0,
  };

  // Momentum animation parameters - Fine-tuned for smooth experience
  const momentumConfig = {
    friction: 0.94, // Higher friction for better control
    minVelocity: 0.3, // Lower threshold for more responsive snapping
    velocityMultiplier: 1.2, // Higher multiplier for more natural feel
    snapThreshold: 0.25, // Earlier snapping for smoother transitions
    maxVelocity: 12, // Slightly lower max for better control
    boundaryBounce: 0.25, // Softer boundary bounce
  };

  function startMomentumAnimation() {
    if (mouseState.momentumID) {
      cancelAnimationFrame(mouseState.momentumID);
    }

    function momentumFrame() {
      // Apply friction to velocity
      mouseState.velocity *= momentumConfig.friction;

      // Move based on velocity
      const currentTransform = getCurrentTransform();
      const newTransform = currentTransform + mouseState.velocity;

      // Calculate which slide we should be at
      const viewportWidth = window.innerWidth;
      const slideWidth = viewportWidth; // Each slide takes full viewport width

      const targetSlideIndex = Math.round(-newTransform / slideWidth);
      const targetSlideIndex_clamped = Math.max(
        0,
        Math.min(totalItems - 1, targetSlideIndex)
      );

      // Check if we're close enough to snap to a slide
      const targetTransform = -targetSlideIndex_clamped * slideWidth;
      const distanceToTarget = Math.abs(newTransform - targetTransform);

      if (
        Math.abs(mouseState.velocity) < momentumConfig.minVelocity ||
        distanceToTarget < slideWidth * momentumConfig.snapThreshold
      ) {
        // Snap to nearest slide with momentum animation
        cancelAnimationFrame(mouseState.momentumID);
        mouseState.momentumID = null;
        currentIndex = targetSlideIndex_clamped;
        goToSlide(currentIndex, false, true); // Use momentum transition
        return;
      }

      // Continue momentum if within bounds
      if (targetSlideIndex >= 0 && targetSlideIndex < totalItems) {
        track.style.transform = `translateX(${newTransform}px)`;
      } else {
        // Bounce back from boundaries
        mouseState.velocity *= -momentumConfig.boundaryBounce;
        if (Math.abs(mouseState.velocity) < momentumConfig.minVelocity) {
          cancelAnimationFrame(mouseState.momentumID);
          mouseState.momentumID = null;
          goToSlide(currentIndex, false, true); // Use momentum transition
          return;
        }
      }

      mouseState.momentumID = requestAnimationFrame(momentumFrame);
    }

    mouseState.momentumID = requestAnimationFrame(momentumFrame);
  }

  function getCurrentTransform() {
    const computedStyle = window.getComputedStyle(track);
    const matrix = computedStyle.transform;
    if (matrix !== "none") {
      const values = matrix.split("(")[1].split(")")[0].split(",");
      return parseFloat(values[4]) || 0;
    }
    // Use viewport width for calculations
    const viewportWidth = window.innerWidth;
    return -currentIndex * viewportWidth;
  }

  function calculateVelocity() {
    if (mouseState.velocityTracker.length < 2) return 0;

    const recent = mouseState.velocityTracker.slice(-5); // Use last 5 points
    let totalVelocity = 0;
    let count = 0;

    for (let i = 1; i < recent.length; i++) {
      const timeDiff = recent[i].time - recent[i - 1].time;
      if (timeDiff > 0) {
        const velocity = (recent[i].x - recent[i - 1].x) / timeDiff;
        totalVelocity += velocity;
        count++;
      }
    }

    return count > 0
      ? (totalVelocity / count) * momentumConfig.velocityMultiplier
      : 0;
  }

  track.addEventListener("mousedown", (e) => {
    // Cancel any ongoing momentum
    if (mouseState.momentumID) {
      cancelAnimationFrame(mouseState.momentumID);
      mouseState.momentumID = null;
    }

    mouseState.startX = e.clientX;
    mouseState.currentX = e.clientX;
    mouseState.lastX = e.clientX;
    mouseState.isDragging = true;
    mouseState.hasMouseMoved = false;
    mouseState.dragOffset = 0;
    mouseState.velocity = 0;
    mouseState.velocityTracker = [];
    mouseState.lastTime = performance.now();

    // Get current transform value
    mouseState.initialTransform = getCurrentTransform();

    // Add dragging class and styles
    track.classList.add("dragging");
    track.style.cursor = "grabbing";
    track.style.userSelect = "none";
    document.body.style.userSelect = "none";

    // Add initial velocity tracking point
    mouseState.velocityTracker.push({
      x: e.clientX,
      time: mouseState.lastTime,
    });

    e.preventDefault();
  });

  track.addEventListener("mousemove", (e) => {
    if (!mouseState.isDragging) return;

    const now = performance.now();
    mouseState.currentX = e.clientX;
    mouseState.hasMouseMoved = true;
    mouseState.dragOffset = mouseState.currentX - mouseState.startX;

    // Track velocity
    mouseState.velocityTracker.push({
      x: e.clientX,
      time: now,
    });

    // Keep only recent tracking points
    if (mouseState.velocityTracker.length > 10) {
      mouseState.velocityTracker.shift();
    }

    // Apply resistance at boundaries
    let resistance = 1;
    if (
      (currentIndex === 0 && mouseState.dragOffset > 0) ||
      (currentIndex === totalItems - 1 && mouseState.dragOffset < 0)
    ) {
      // Elastic resistance at boundaries
      const maxResistance = 150;
      const elasticFactor = Math.min(
        Math.abs(mouseState.dragOffset) / maxResistance,
        1
      );
      resistance = Math.pow(1 - elasticFactor, 2) * 0.5 + 0.1;
    }

    // Apply real-time visual feedback
    const newTransform =
      mouseState.initialTransform + mouseState.dragOffset * resistance;
    track.style.transform = `translateX(${newTransform}px)`;

    mouseState.lastX = mouseState.currentX;
    mouseState.lastTime = now;
  });

  track.addEventListener("mouseup", () => {
    if (!mouseState.isDragging) return;

    // Remove dragging class
    track.classList.remove("dragging");
    document.body.style.userSelect = "";

    if (!mouseState.hasMouseMoved) {
      // Simple click, no momentum
      mouseState.isDragging = false;
      track.style.cursor = "grab";
      track.style.userSelect = "";
      return;
    }

    // Calculate final velocity for momentum
    mouseState.velocity = calculateVelocity();

    // Clamp velocity to prevent extreme speeds
    mouseState.velocity = Math.max(
      -momentumConfig.maxVelocity,
      Math.min(momentumConfig.maxVelocity, mouseState.velocity)
    );

    // Start momentum animation if velocity is significant
    if (Math.abs(mouseState.velocity) > momentumConfig.minVelocity) {
      startMomentumAnimation();
    } else {
      // No significant velocity, just snap to nearest slide
      const viewportWidth = window.innerWidth;
      const currentTransform = getCurrentTransform();
      const nearestSlide = Math.round(-currentTransform / viewportWidth);
      const targetSlide = Math.max(0, Math.min(totalItems - 1, nearestSlide));

      currentIndex = targetSlide;
      goToSlide(currentIndex, true); // Use smooth transition for low velocity
    }

    mouseState.isDragging = false;
    mouseState.hasMouseMoved = false;
    track.style.cursor = "grab";
    track.style.userSelect = "";
  });

  track.addEventListener("mouseleave", () => {
    if (mouseState.isDragging) {
      // Clean up and snap to current slide
      if (mouseState.momentumID) {
        cancelAnimationFrame(mouseState.momentumID);
        mouseState.momentumID = null;
      }

      track.classList.remove("dragging");
      document.body.style.userSelect = "";
      goToSlide(currentIndex, true);

      mouseState.isDragging = false;
      mouseState.hasMouseMoved = false;
      track.style.cursor = "grab";
      track.style.userSelect = "";
    }
  });

  // Set initial cursor style
  track.style.cursor = "grab";
  track.style.transition = "cursor 0.2s ease";

  // Only log for mobile debugging
  if (window.innerWidth <= 768) {
    console.log("🎠 Mobile Gallery Navigation Initialized");
  }
}

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
  /* Animation styles */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  @keyframes shootingStar {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateX(300px) translateY(300px);
      opacity: 0;
    }
  }
  
  @keyframes floatParticle {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-50px) rotate(180deg);
      opacity: 1;
    }
  }
  
  .notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 10000;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }
  
  .notification.success {
    background: linear-gradient(135deg, var(--success), var(--accent-tertiary));
  }
  
  .notification.error {
    background: linear-gradient(135deg, var(--error), #ff4757);
  }
  
  .notification.warning {
    background: linear-gradient(135deg, var(--warning), #ffa502);
  }
  
  /* Mobile menu styles moved to main.css */
`;

document.head.appendChild(style);
