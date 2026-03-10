// Initialize Swiper Slider - Exactly like greenmaidcleaners.nl
document.addEventListener('DOMContentLoaded', function() {
    // Swiper Configuration
    const swiper = new Swiper('.heroSwiper', {
        // Core settings
        loop: true,
        speed: 800,
        
        // Autoplay
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        
        // Navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false
        },
        
        // Effects
        effect: 'slide',
        fadeEffect: {
            crossFade: false
        },
        
        // Touch
        allowTouchMove: true,
        touchRatio: 1,
        touchAngle: 45,
        
        // Keyboard
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        
        // Mousewheel
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
            eventsTarget: '.swiper'
        },
        
        // Lazy loading
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 1
        },
        
        // Breakpoints
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });
    
    // Enhanced Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add body lock when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Premium Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let scrollDirection = 'down';
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        scrollDirection = currentScroll > lastScroll ? 'down' : 'up';
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.85)';
            header.style.backdropFilter = 'blur(25px)';
            header.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.1)';
            
            // Hide/show header on scroll
            if (scrollDirection === 'down' && currentScroll > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'none';
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Enhanced Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 92; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Premium Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100); // Stagger animations
            }
        });
    }, observerOptions);
    
    // Observe elements with enhanced selectors
    document.querySelectorAll('.service-card, .services-preview h2').forEach(el => {
        observer.observe(el);
    });
    
    // Enhanced Button Effects
    document.querySelectorAll('button, .cta-button, .booking-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
        
        // Add hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Premium Ripple Effect
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    let x, y;
    if (event) {
        x = event.clientX - rect.left - size / 2;
        y = event.clientY - rect.top - size / 2;
    } else {
        x = rect.width / 2 - size / 2;
        y = rect.height / 2 - size / 2;
    }
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced Ripple Styles
const rippleStyles = `
    button, .cta-button, .booking-btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Add enhanced styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Enhanced Window Resize Handler
function handleResize() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768 && hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// Enhanced Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard shortcuts info
console.log('%c🚀 TODFCO Website Controls:', 'color: #2563eb; font-size: 16px; font-weight: bold');
console.log('%c• Arrow Keys: Navigate slides', 'color: #64748b;');
console.log('%c• Mousewheel: Navigate slides', 'color: #64748b;');
console.log('%c• Touch/Swipe: Navigate slides', 'color: #64748b;');
