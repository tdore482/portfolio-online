document.addEventListener('DOMContentLoaded', function() {

    // ============================
    // MOBILE MENU TOGGLE
    // ============================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('show');
            body.classList.toggle('menu-open');
            
            if (navLinks.classList.contains('show')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                body.classList.remove('menu-open');
                menuToggle.textContent = '☰';
            });
        });
    }

    document.addEventListener('click', (e) => {
        if (menuToggle && navLinks && !e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                body.classList.remove('menu-open');
                menuToggle.textContent = '☰';
            }
        }
    });

    // ============================
    // SMOOTH SCROLL FOR HASH LINKS ONLY
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================
    // ACTIVE NAV LINK ON SCROLL
    // ============================
    const navAnchors = document.querySelectorAll('.nav-links a');
    const allSections = document.querySelectorAll('main > section');

    const activateLinkOnScroll = () => {
        let currentSectionId = '';
        
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (window.pageYOffset < 500) {
            currentSectionId = 'home';
        }

        navAnchors.forEach(a => {
            a.classList.remove('active');
            const linkTarget = a.getAttribute('href');
            if ((linkTarget === '#home' && currentSectionId === 'home') || 
                (linkTarget === '#' + currentSectionId)) {
                a.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', activateLinkOnScroll);

    // ============================
    // SCROLL REVEAL FOR SECTIONS
    // ============================
    const sectionsToReveal = document.querySelectorAll('.web-projects, .mobile-projects, .about-section, .contact-section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sectionsToReveal.forEach(section => {
        sectionObserver.observe(section);
    });

    // ============================
    // HERO SLIDER FUNCTIONALITY
    // ============================
    const slides = document.querySelectorAll('.hero-slider-container .slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');

    let currentSlide = 0;
    const totalSlides = slides.length;

    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[n]) {
            slides[n].classList.add('active');
        }
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

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // ============================
    // BACK TO TOP BUTTON
    // ============================
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            if (backToTopBtn) backToTopBtn.classList.add('show');
        } else {
            if (backToTopBtn) backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

// ============================
// MODAL FUNCTIONS
// ============================
function openModal(img) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImage");
    if (modal) {
        modal.style.display = "block";
        if (modalImg) modalImg.src = img.src;
    }
}

function closeModal() {
    const modal = document.getElementById("imgModal");
    if (modal) modal.style.display = "none";
}