// Initialize Swiper Slider - Exactly like greenmaidcleaners.nl
document.addEventListener("DOMContentLoaded", function () {
  // Swiper Configuration
  const swiper = new Swiper(".heroSwiper", {
    // Core settings
    loop: true,
    speed: 800,

    // Autoplay
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Navigation
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: false,
    },

    // Effects
    effect: "slide",
    fadeEffect: {
      crossFade: false,
    },

    // Touch
    allowTouchMove: true,
    touchRatio: 1,
    touchAngle: 45,

    // Keyboard
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Mousewheel
    mousewheel: {
      forceToAxis: true,
      sensitivity: 1,
      eventsTarget: ".swiper",
    },
  });

  // Enhanced Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeInUp");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(
      ".stat-card, .approach-card, .program-card, .timeline-item, .gallery-item, .testimonial-item, .partner-item",
    )
    .forEach((el) => {
      observer.observe(el);
    });

  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
      if (navMenu.classList.contains("active")) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
    });

    // Close menu when clicking on links
    document.querySelectorAll(".nav-link, .nav-cta").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
        document.body.classList.remove("menu-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
        document.body.classList.remove("menu-open");
      }
    });

    // Close menu when clicking the close button (X)
    navMenu.addEventListener("click", (e) => {
      if (
        e.target === navMenu ||
        e.target.textContent === "✕" ||
        e.target.closest("::before")
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
        document.body.classList.remove("menu-open");
      }
    });

    // Close menu on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
        document.body.classList.remove("menu-open");
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Counter animation for statistics
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + "+";
    }, 20);
  };

  // Trigger counter animation when visible
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          const text = entry.target.textContent;
          const number = parseInt(text.replace(/[^0-9]/g, ""));
          animateCounter(entry.target, number);
          entry.target.classList.add("animated");
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(".stat-number").forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Gallery lightbox effect
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.innerHTML =
    '<div class="lightbox-content"><img src="" alt=""><button class="lightbox-close">&times;</button></div>';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Form validation enhancement
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      let isValid = true;
      const requiredFields = form.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add("error");
          isValid = false;
        } else {
          field.classList.remove("error");
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Show error message
        const errorMsg = document.createElement("div");
        errorMsg.className = "form-error";
        errorMsg.textContent = "Please fill in all required fields.";
        errorMsg.style.cssText =
          "color: #ef4444; margin-top: 1rem; text-align: center;";
        form.appendChild(errorMsg);
        setTimeout(() => errorMsg.remove(), 3000);
      }
    });
  });

  // Add loading states to buttons
  const buttons = document.querySelectorAll(".cta-button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.classList.contains("loading")) {
        this.classList.add("loading");
        this.disabled = true;
        this.innerHTML = '<span class="spinner"></span> Loading...';

        // Simulate loading (remove in production)
        setTimeout(() => {
          this.classList.remove("loading");
          this.disabled = false;
          this.innerHTML = this.getAttribute("data-original-text") || "Submit";
        }, 2000);
      }
    });
  });

  // Parallax effect for hero sections
  const parallaxElements = document.querySelectorAll(".hero-content");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll(
    ".stat-card, .approach-card, .program-card",
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // FAQ accordion (resources page)
  document.querySelectorAll(".faq-header").forEach((header) => {
    header.addEventListener("click", () => {
      const faqItem = header.closest(".faq-item");
      const wasActive = faqItem.classList.contains("active");
      document
        .querySelectorAll(".faq-item")
        .forEach((item) => item.classList.remove("active"));
      if (!wasActive) faqItem.classList.add("active");
    });
  });

  console.log("TODFCO Website Initialized Successfully! 🚀");
});

// Gallery Lightbox Functionality
class GalleryLightbox {
  constructor() {
    this.lightbox = document.getElementById("gallery-lightbox");
    this.lightboxImage = document.getElementById("lightbox-image");
    this.lightboxTitle = document.getElementById("lightbox-title");
    this.lightboxDescription = document.getElementById("lightbox-description");
    this.lightboxDate = document.getElementById("lightbox-date");
    this.currentImageSpan = document.getElementById("current-image");
    this.totalImagesSpan = document.getElementById("total-images");
    this.prevBtn = document.querySelector(".lightbox-prev");
    this.nextBtn = document.querySelector(".lightbox-next");
    this.closeBtn = document.querySelector(".lightbox-close");
    this.loading = document.querySelector(".lightbox-loading");

    this.currentIndex = 0;
    this.galleryItems = [];
    this.isOpen = false;

    this.init();
  }

  init() {
    // Collect all gallery items
    this.galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

    if (this.galleryItems.length === 0) {
      console.log("No gallery items found");
      return;
    }

    // Update total images counter
    this.totalImagesSpan.textContent = this.galleryItems.length;

    // Add click handlers to gallery items
    this.galleryItems.forEach((item, index) => {
      item.style.cursor = "pointer";
      item.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.currentIndex = index;
        this.openLightbox();
      });
    });

    // Close button handler
    this.closeBtn.addEventListener("click", () => {
      this.closeLightbox();
    });

    // Overlay click to close
    this.lightbox.addEventListener("click", (e) => {
      if (
        e.target === this.lightbox ||
        e.target.classList.contains("lightbox-overlay")
      ) {
        this.closeLightbox();
      }
    });

    // Navigation handlers
    this.prevBtn.addEventListener("click", () => {
      this.navigate(-1);
    });

    this.nextBtn.addEventListener("click", () => {
      this.navigate(1);
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.isOpen) return;

      if (e.key === "Escape") {
        this.closeLightbox();
      } else if (e.key === "ArrowLeft") {
        this.navigate(-1);
      } else if (e.key === "ArrowRight") {
        this.navigate(1);
      }
    });

    console.log(
      "Gallery lightbox initialized with",
      this.galleryItems.length,
      "items",
    );

    // Setup touch gestures for mobile
    this.setupTouchGestures();
  }

  openLightbox() {
    this.isOpen = true;
    this.lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    this.loadImage(this.currentIndex);
  }

  closeLightbox() {
    this.isOpen = false;
    this.lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  loadImage(index) {
    const item = this.galleryItems[index];
    if (!item) return;

    // Show loading
    this.loading.style.display = "block";
    this.lightboxImage.style.opacity = "0";

    const img = item.querySelector("img");
    const title = item.querySelector("h3")?.textContent || "";
    const description = item.querySelector("p")?.textContent || "";
    const date = item.querySelector(".gallery-date")?.textContent || "";

    // Create new image to preload
    const newImg = new Image();
    newImg.onload = () => {
      this.lightboxImage.src = newImg.src;
      this.lightboxTitle.textContent = title;
      this.lightboxDescription.textContent = description;
      this.lightboxDate.textContent = date;
      this.currentImageSpan.textContent = index + 1;

      // Hide loading, show image
      this.loading.style.display = "none";
      this.lightboxImage.style.opacity = "1";
    };

    newImg.onerror = () => {
      console.error("Failed to load image:", img.src);
      this.loading.style.display = "none";
    };

    newImg.src = img.src;
  }

  navigate(direction) {
    this.currentIndex += direction;

    // Wrap around
    if (this.currentIndex < 0) {
      this.currentIndex = this.galleryItems.length - 1;
    } else if (this.currentIndex >= this.galleryItems.length) {
      this.currentIndex = 0;
    }

    this.loadImage(this.currentIndex);
  }

  // Touch gesture support
  setupTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      if (!this.isOpen) return;
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      if (!this.isOpen) return;

      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;

      // Minimum swipe distance
      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
          // Swipe right - previous image
          this.navigate(-1);
        } else {
          // Swipe left - next image
          this.navigate(1);
        }
      }
    };

    // Add touch event listeners
    this.lightbox.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    this.lightbox.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
  }
}

// Initialize gallery lightbox
document.addEventListener("DOMContentLoaded", () => {
  new GalleryLightbox();
});

// Initialize Swiper Slider
$(document).ready(function () {
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 1000,
  });
});

// Owl Carousel for Partners
$(document).ready(function () {
  $(".partners-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true,
      },
      480: {
        items: 2,
        nav: false,
        dots: true,
      },
      768: {
        items: 3,
        nav: true,
        dots: true,
      },
      1024: {
        items: 4,
        nav: true,
        dots: true,
      },
      1200: {
        items: 5,
        nav: true,
        dots: true,
      },
    },
  });

  // Set dynamic copyright year
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
