document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to Theodore's Portfolio. Crafted with care.");

    // ============================
    // VARIABLES
    // ============================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const body = document.body;
    const header = document.querySelector('header');

    // ============================
    // MOBILE MENU
    // ============================
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    // Close menu when link is clicked
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // ============================
    // SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.project-card, .section-title, .process-item, .contact-container');
    
    animateElements.forEach(el => {
        // Set initial state via JS to ensure graceful degradation if JS fails
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)";
        observer.observe(el);
    });

    // ============================
    // HEADER SCROLL EFFECT
    // ============================
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.transform = "translateY(0)";
            header.style.background = "transparent";
            header.style.backdropFilter = "none";
        } 
        else if (currentScroll > lastScroll && !body.classList.contains('menu-open')) {
            // Scrolling down
            header.style.transform = "translateY(-100%)";
        } 
        else {
            // Scrolling up
            header.style.transform = "translateY(0)";
            header.style.background = "rgba(5, 5, 5, 0.9)";
            header.style.backdropFilter = "blur(10px)";
        }
        lastScroll = currentScroll;
    });

    // ============================
    // FORM HANDLING
    // ============================
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.innerHTML = 'Message Sent!';
                    btn.style.borderColor = '#5dd18a';
                    btn.style.color = '#5dd18a';
                    form.reset();
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        btn.style.borderColor = '#fff';
                        btn.style.color = '#fff';
                    }, 5000);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                btn.innerHTML = 'Error. Try Again.';
                btn.style.borderColor = '#FF4136';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            }
        });
    }

    // ============================
    // HERO VISUAL SLIDER - ENHANCED FROM SET 1
    // ============================
    const heroSlides = document.querySelectorAll('.hero-visual img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        const totalSlides = heroSlides.length;

        console.log(`Found ${totalSlides} hero slides`);

        // Set total slides count
        if (totalSlidesSpan) {
            totalSlidesSpan.textContent = totalSlides;
        }

        // Initialize: remove all active, show first slide
        heroSlides.forEach(slide => slide.classList.remove('active'));
        if (heroSlides[0]) {
            heroSlides[0].classList.add('active');
            if (currentSlideSpan) {
                currentSlideSpan.textContent = 1;
            }
        }

        function showSlide(n) {
            // Remove active from all slides
            heroSlides.forEach(slide => slide.classList.remove('active'));
            
            // Ensure n is within bounds
            if (heroSlides[n]) {
                heroSlides[n].classList.add('active');
            }
            
            // Update counter
            if (currentSlideSpan) {
                currentSlideSpan.textContent = n + 1;
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Attach button click listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        // Auto-rotate slides every 5 seconds
        if (heroSlides.length > 0) {
            setInterval(nextSlide, 5000);
        }
    } else {
        console.error("No hero slides found! Check your HTML class names.");
    }
});