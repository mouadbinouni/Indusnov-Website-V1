// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden');
        
        // ARIA attributes
        mobileMenuButton.setAttribute('aria-expanded', isMenuOpen.toString());
        
        // Update button icon for accessibility
        const label = isMenuOpen ? 'Close menu' : 'Open menu';
        mobileMenuButton.setAttribute('aria-label', label);
    }

    // Click handler
    mobileMenuButton?.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            toggleMenu();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });
});