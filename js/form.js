// Form handling and validation
class ContactForm {
    constructor() {
        // Configure your Formspree endpoint here
        this.FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';
        
        this.form = document.getElementById('contact-form');
        this.submitButton = this.form?.querySelector('button[type="submit"]');
        this.init();
    }

    init() {
        if (!this.form) return;

        // Pre-fill service if provided in URL
        this.preFillService();

        // Form submission handler
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                await this.submitForm();
            }
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.required) {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            }
        });

        // Email validation on input
        const emailInput = this.form.querySelector('#email');
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                this.validateEmail(emailInput);
            });
        }
    }

    preFillService() {
        const urlParams = new URLSearchParams(window.location.search);
        const service = urlParams.get('service');
        const serviceSelect = this.form.querySelector('#service');
        
        if (service && serviceSelect) {
            serviceSelect.value = service;
        }
    }

    validateField(field) {
        const errorId = `${field.id}-error`;
        let existingError = document.getElementById(errorId);
        
        if (field.required && !field.value.trim()) {
            if (!existingError) {
                const error = document.createElement('div');
                error.id = errorId;
                error.className = 'text-red-600 text-sm mt-1';
                error.textContent = `${field.labels[0].textContent.replace(' *', '')} is required`;
                field.parentNode.appendChild(error);
            }
            field.classList.add('border-red-500');
            return false;
        } else {
            if (existingError) {
                existingError.remove();
            }
            field.classList.remove('border-red-500');
            return true;
        }
    }

    validateEmail(emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorId = 'email-format-error';
        let existingError = document.getElementById(errorId);

        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            if (!existingError) {
                const error = document.createElement('div');
                error.id = errorId;
                error.className = 'text-red-600 text-sm mt-1';
                error.textContent = 'Please enter a valid email address';
                emailInput.parentNode.appendChild(error);
            }
            emailInput.classList.add('border-red-500');
            return false;
        } else {
            if (existingError) {
                existingError.remove();
            }
            emailInput.classList.remove('border-red-500');
            return true;
        }
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('input[required], textarea[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        const emailInput = this.form.querySelector('#email');
        if (emailInput && !this.validateEmail(emailInput)) {
            isValid = false;
        }

        return isValid;
    }

    async submitForm() {
        if (!this.submitButton) return;

        // Show loading state
        const originalText = this.submitButton.textContent;
        this.submitButton.disabled = true;
        this.submitButton.innerHTML = `
            <svg class="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;

        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showSuccess();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.handleError();
        } finally {
            // Reset button state
            this.submitButton.disabled = false;
            this.submitButton.textContent = originalText;
        }
    }

    showSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
        successMessage.innerHTML = `
            <strong class="font-bold">Thank you!</strong>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
        `;

        this.form.parentNode.insertBefore(successMessage, this.form);
        this.form.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    handleError() {
        // Create error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
        errorMessage.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <p>Sorry, there was a problem sending your message. Please try again or contact us directly at 
                <a href="mailto:contact@indusnov.com" class="underline">contact@indusnov.com</a>
            </p>
        `;

        this.form.parentNode.insertBefore(errorMessage, this.form);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});