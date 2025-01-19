document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn') || (() => {
        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn';
        btn.innerHTML = `<span></span><span></span><span></span>`;
        navbar.querySelector('.nav-content').appendChild(btn);
        return btn;
    })();
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links a');

    // Navbar scroll effect
    const handleNavbarScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile menu
    const closeMobileMenu = () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    };
    allNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Highlight active link
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        allNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
        });
    });

    // Scroll-triggered animations
    const scrollAnimations = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollAnimations.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Add observer to elements with animation classes
    document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right, .scale-in').forEach(element => {
        scrollAnimations.observe(element);
    });

    // Project card hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typewriter effect
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i++);
                setTimeout(typeWriter, 100);
            }
        };
        new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) typeWriter();
        }).observe(heroTitle);
    }
});
