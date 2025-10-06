// Initialize all features and animations
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once the animation is complete, stop observing
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px'
    });

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Scroll to hash if present in URL
    if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Update URL without triggering a scroll
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // Initialize lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
});