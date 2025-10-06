// Modal and lightbox functionality
class Modal {
    constructor() {
        // Contact modal elements
        this.contactModal = document.getElementById('contact-modal');
        this.contactFrame = document.getElementById('contact-frame');
        this.contactButtons = document.querySelectorAll('.contact-service-btn');
        
        // Lightbox elements
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxClose = document.getElementById('lightbox-close');
        this.galleryImages = document.querySelectorAll('.gallery-image');
        
        this.init();
    }

    init() {
        // Contact modal initialization
        if (this.contactButtons) {
            this.contactButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const service = e.target.dataset.service;
                    this.openContactModal(service);
                });
            });
        }

        // Gallery lightbox initialization
        if (this.galleryImages) {
            this.galleryImages.forEach(img => {
                img.addEventListener('click', () => this.openLightbox(img.src, img.alt));
            });
        }

        // Close button handlers
        const closeButtons = document.querySelectorAll('[aria-label="Close modal"], [aria-label="Close lightbox"]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Close on outside click
        [this.contactModal, this.lightbox].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) this.closeModal();
                });
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    openContactModal(service) {
        if (!this.contactModal || !this.contactFrame) return;
        
        this.contactModal.classList.remove('hidden');
        this.contactFrame.src = `contact.html${service ? '?service=' + encodeURIComponent(service) : ''}`;
        this.trapFocus(this.contactModal);
        document.body.style.overflow = 'hidden';
    }

    openLightbox(src, alt) {
        if (!this.lightbox || !this.lightboxImage) return;
        
        this.lightboxImage.src = src;
        this.lightboxImage.alt = alt;
        this.lightbox.classList.remove('hidden');
        this.trapFocus(this.lightbox);
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        [this.contactModal, this.lightbox].forEach(modal => {
            if (modal && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
        document.body.style.overflow = '';
    }

    trapFocus(element) {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusable = element.querySelectorAll(focusableElements)[0];
        const focusables = element.querySelectorAll(focusableElements);
        const lastFocusable = focusables[focusables.length - 1];

        element.addEventListener('keydown', (e) => {
            const isTabPressed = e.key === 'Tab';
            if (!isTabPressed) return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });

        firstFocusable.focus();
    }
}

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', () => {
    new Modal();
});