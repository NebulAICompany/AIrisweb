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

  // Navbar scroll effects
  setupScrollEffects() {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Add/remove scrolled class
      if (scrollTop > 50) {
        this.navbar.classList.add("scrolled");
      } else {
        this.navbar.classList.remove("scrolled");
      }

      // Hide/show navbar on scroll
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        this.navbar.style.transform = "translateY(-100%)";
      } else {
        this.navbar.style.transform = "translateY(0)";
      }

      lastScrollTop = scrollTop;
    });
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
      this.mobileMenuToggle.addEventListener("click", () => {
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
  }

  closeMobileMenu() {
    this.navMenu.classList.remove("mobile-open");
    this.mobileMenuToggle.classList.remove("active");
    document.body.classList.remove("mobile-menu-open");
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
      // Fallback: Environment variables veya güvenli değerler
      const publicKey =
        process.env.EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY_HERE";
      const serviceId =
        process.env.EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID_HERE";
      const templateId =
        process.env.EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID_HERE";

      emailjs.init(publicKey);
      this.emailConfig = {
        serviceId: serviceId,
        templateId: templateId,
        publicKey: publicKey,
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

// Stellar background animation system
class StellarBackground {
  constructor() {
    this.createShootingStars();
    this.createFloatingParticles();
  }

  createShootingStars() {
    setInterval(() => {
      this.createShootingStar();
    }, 3000 + Math.random() * 5000);
  }

  createShootingStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.cssText = `
      position: fixed;
      width: 2px;
      height: 2px;
      background: linear-gradient(45deg, white, #8b5cf6);
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 50}vh;
      animation: shootingStar 2s linear forwards;
    `;

    document.body.appendChild(star);

    setTimeout(() => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    }, 2000);
  }

  createFloatingParticles() {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        this.createParticle();
      }, i * 200);
    }
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.cssText = `
      position: fixed;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      background: rgba(139, 92, 246, ${0.3 + Math.random() * 0.7});
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      animation: floatParticle ${10 + Math.random() * 20}s ease-in-out infinite;
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

  // Responsive gallery handling
  function handleResponsiveGallery() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1400;

    if (isMobile || isTablet) {
      // On mobile/tablet, reset transform to show first slide
      track.style.transform = "translateX(0)";
      currentIndex = 0;
      updateNavigation();
    }
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

  function goToSlide(index) {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1400;

    if (isMobile || isTablet) {
      // On mobile/tablet, just update current index without transform
      currentIndex = index;
      updateNavigation();
      return;
    }

    currentIndex = index;
    const translateX = -currentIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
    updateNavigation();
  }

  // Add pagination click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Initialize navigation state
  updateNavigation();

  // Handle responsive gallery on resize
  window.addEventListener("resize", handleResponsiveGallery);

  // Initial responsive check
  handleResponsiveGallery();

  // Touch/swipe support for mobile
  let startX = 0;
  let currentX = 0;

  track.addEventListener("touchstart", (e) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      startX = e.touches[0].clientX;
    }
  });

  track.addEventListener("touchmove", (e) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      currentX = e.touches[0].clientX;
      e.preventDefault(); // Prevent page scroll during swipe
    }
  });

  track.addEventListener("touchend", () => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < totalItems - 1) {
        // Swipe left - next
        goToSlide(currentIndex + 1);
        console.log("Swiped left - Next slide");
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - prev
        goToSlide(currentIndex - 1);
        console.log("Swiped right - Previous slide");
      }
    }
  });

  console.log("🎠 Horizontal Gallery Navigation Initialized");
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
  
  /* Mobile menu styles */
  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      top: var(--navbar-height);
      left: 0;
      right: 0;
      background: linear-gradient(135deg, rgba(13, 2, 33, 0.95), rgba(26, 11, 46, 0.9));
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(139, 92, 246, 0.2);
      flex-direction: column;
      padding: 2rem;
      gap: 1.5rem;
      transform: translateY(-100%);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 999;
    }
    
    .nav-menu.mobile-open {
      display: flex;
      transform: translateY(0);
      opacity: 1;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
    
    body.mobile-menu-open {
      overflow: hidden;
    }
  }
`;

document.head.appendChild(style);
