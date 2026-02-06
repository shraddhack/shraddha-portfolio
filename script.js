// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Add fade-in class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Typing effect for code card (optional enhancement)
function typeCode() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';

        setTimeout(() => {
            line.style.transition = 'all 0.3s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 100 + 500);
    });
}

// Run typing effect when page loads
window.addEventListener('load', typeCode);

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Parallax effect for hero background
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(parseInt(target));

        if (isNumber) {
            const targetNum = parseInt(target);
            let current = 0;
            const increment = targetNum / 50;
            const suffix = target.replace(/[0-9]/g, '');

            const updateCounter = () => {
                if (current < targetNum) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        }
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(aboutSection);
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Console Easter Egg
console.log('%c Welcome! 👋', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c Shraddha Phadnis - FPGA & Embedded Systems Engineer', 'font-size: 14px; color: #a855f7;');
console.log('%c Interested in collaboration? Reach out via LinkedIn!', 'font-size: 12px; color: #64748b;');
