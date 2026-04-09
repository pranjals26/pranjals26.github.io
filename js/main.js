// Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        html.classList.remove('dark');
    } else {
        html.classList.add('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Scroll-triggered fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeInObserver.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed header
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNav = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-text-primary');
                    link.classList.add('text-text-secondary');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-text-secondary');
                        link.classList.add('text-text-primary');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // Navbar background on scroll
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.style.borderBottomColor = 'rgba(31, 31, 31, 0.8)';
        } else {
            nav.style.borderBottomColor = '#1f1f1f';
        }

        lastScroll = currentScroll;
    });

    // Add staggered animation delay to elements
    document.querySelectorAll('.project-card, .stat-card, .cert-card, .contact-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 50}ms`;
    });

    // Parallax effect for hero background (subtle)
    const hero = document.querySelector('section');
    const bgGrid = document.querySelector('.bg-grid');

    if (hero && bgGrid) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                bgGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Console greeting
    console.log('%c👋 Hey there, curious developer!', 'font-size: 14px; color: #00ff88;');
    console.log('%cThis portfolio was built with vanilla JS & Tailwind CSS.', 'color: #888888;');
    console.log('%cFeel free to reach out at pranjalshukla98@gmail.com', 'color: #888888;');
});