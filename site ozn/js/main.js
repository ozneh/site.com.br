document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle (Basic implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            // Check if we are in mobile view logic
            // Ideally we would toggle a class like 'active' on nav
            // For now, since CSS sets display:none on mobile, we need a CSS class to override it

            // Simple approach: Add a class to body or nav to show it
            // Assuming we'll add .nav-open styles in CSS or toggle display directly for MVP

            const isFlex = nav.style.display === 'flex';
            if (!isFlex) {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '70px';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'rgba(2, 6, 23, 0.95)';
                nav.style.padding = '20px';
                nav.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            } else {
                nav.style.display = null; // Revert to CSS stylesheet rule
            }
        });
    }

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if we don't want repeat animations
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to major sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Helper to trigger the animation styles when class is added
    // We inject this small CSS rule or handle it in JS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
