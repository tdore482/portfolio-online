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
            // The hero section's conceptual link is 'About'
            const linkTarget = a.getAttribute('href');
            if ( (linkTarget === '#about' && currentSectionId === 'home') || (linkTarget === '#' + currentSectionId) ) {
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


