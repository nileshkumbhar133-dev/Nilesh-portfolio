document.addEventListener('DOMContentLoaded', () => {
    /* ============================
       Typing Animation
    ============================ */
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = "C# Developer";
        let index = 0;
        function type() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        type();
    }

    /* ============================
       Mobile Navigation Toggle
    ============================ */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            // Toggle between hamburger icon and close icon
            hamburger.innerHTML = navLinks.classList.contains('nav-active') ?
                '<i class="fas fa-times"></i>' :
                '<i class="fas fa-bars"></i>';
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }


    /* ============================
       Contact Form Handling
    ============================ */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Please enter a valid email.');
                return;
            }
            // For demo, just log and alert. In real app, send to backend.
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! (This is a demo - no email sent)');
            contactForm.reset();
        });
    }

    /* ============================
       Scroll Reveal Animations
    ============================ */
    // We use the Intersection Observer API to trigger animations when elements enter the viewport.

    const revealElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: "0px 0px -50px 0px" // Offset to trigger slightly before it hits bottom
        };

        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, revealOptions);

        revealElements.forEach(element => {
            revealOnScroll.observe(element);
        });
    }


    /* ============================
       Sticky Navigation & Active Link Highlighting
    ============================ */
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Add 'sticky' class to header on scroll
        header.classList.toggle('sticky', window.scrollY > 0);

        // Highlight active menu item based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Offset for header height
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
});