document.addEventListener('DOMContentLoaded', function() {

    // --- Hamburger Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                }
            });
        });
    }

    // --- Smooth Scroll for All Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const navAnchors = document.querySelectorAll('.nav-links a');
    const allSections = document.querySelectorAll('main > section');

    const activateLinkOnScroll = () => {
        let currentSectionId = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) { // Offset to trigger a bit earlier
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Handle case for the top of the page (hero section)
        if (window.pageYOffset < 500) {
            currentSectionId = 'home';
        }

        navAnchors.forEach(a => {
            a.classList.remove('active');
            // The hero section's conceptual link is 'Home'
            const linkTarget = a.getAttribute('href');
            if ( (linkTarget === '#home' && currentSectionId === 'home') || (linkTarget === '#' + currentSectionId) ) {
                 a.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', activateLinkOnScroll);


    // --- Scroll Reveal for Sections ---
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

});


function openModal(img) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById("imgModal").style.display = "none";
}


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

// Set total slides count
totalSlidesSpan.textContent = totalSlides;

// Show specific slide
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
    currentSlideSpan.textContent = n + 1;
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Event listeners
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// ============================
// SCROLL REVEAL FOR SECTIONS
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections
const sections = document.querySelectorAll('.web-projects, .mobile-projects, .about-section, .contact-section');
sections.forEach(section => observer.observe(section));

// ============================
// BACK TO TOP BUTTON
// ============================
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
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

// ============================
// MOBILE MENU TOGGLE
// ============================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Close menu when a link is clicked
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
}

// ============================
// SMOOTH SCROLL FOR NAV LINKS
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});