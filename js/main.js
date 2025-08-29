document.addEventListener('DOMContentLoaded', function() {
    // Navbar elements
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    const navbarHeight = navbar.offsetHeight;

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position to account for fixed navbar height
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Navbar show/hide on scroll
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled-down', 'scrolled-up');
            navbar.classList.add('py-3');
            navbar.classList.remove('py-2', 'shadow-xl');
            lastScroll = currentScroll;
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scrolled-down')) {
            // Scroll down - hide navbar
            navbar.classList.remove('scrolled-up');
            navbar.classList.add('scrolled-down');
            navbar.style.transform = `translateY(-${navbarHeight}px)`;
        } else if (currentScroll < lastScroll && (navbar.classList.contains('scrolled-down') || currentScroll < lastScroll - 5)) {
            // Scroll up - show navbar
            navbar.classList.remove('scrolled-down');
            navbar.classList.add('scrolled-up');
            navbar.style.transform = 'translateY(0)';
            
            // Add shadow when scrolled down
            if (currentScroll > 50) {
                navbar.classList.add('shadow-xl');
                navbar.classList.add('py-2');
                navbar.classList.remove('py-3');
            } else {
                navbar.classList.add('py-3');
                navbar.classList.remove('py-2', 'shadow-xl');
            }
        }
        
        lastScroll = currentScroll;

        // Scroll to top button visibility
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.classList.remove('hidden', 'opacity-0');
            scrollToTopBtn.classList.add('opacity-100');
        } else {
            scrollToTopBtn.classList.remove('opacity-100');
            scrollToTopBtn.classList.add('opacity-0');
            // Delay hiding to allow fade-out animation
            setTimeout(() => {
                if (document.body.scrollTop < 100 && document.documentElement.scrollTop < 100) {
                    scrollToTopBtn.classList.add('hidden');
                }
            }, 200);
        }
    }


    // Initial check in case page loads scrolled
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Fade-in animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
