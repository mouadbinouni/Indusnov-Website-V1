# Indusnov Website

A modern, responsive corporate website for Indusnov, showcasing industrial maintenance and inspection services.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   
   The site will be available at `http://localhost:3000`

For development with auto-reload:
   ```bash
   npm run dev
   ```

## Configuration

### Form Submission Setup

1. Create a Formspree account at https://formspree.io
2. Create a new form and get your form ID
3. Update the Formspree endpoint in `js/form.js`:
   ```javascript
   this.FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';
   ```

### Replacing Assets

#### Images
- Replace placeholder images in `assets/img/` with your own:
  - `homeimage.png`

#### Icons
- Replace SVG icons in `assets/icons/` with your own:
  - `predictech.png`
  - `drontech.png`
  - `aquascope.png`
  - `ecoscan.png`
  - `skillnov.png`
  - `smartflow.png`

## Technical Details

### Dependencies
- Tailwind CSS via Play CDN
- Local CSS fallback (`css/styles.css`)
- Vanilla JavaScript (ES6)
- No other external dependencies

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Includes fallback styles if Tailwind CDN fails to load

### Features
- Responsive design
- Accessible navigation
- Form validation
- Modal dialogs
- Image lightbox
- Smooth scroll
- Fade-in animations
- Contact form with Formspree integration

## Development

### File Structure
```
site/
├── index.html
├── services.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   ├── nav.js
│   ├── modal.js
│   ├── form.js
│   └── main.js
└── assets/
    ├── icons/
    │  
    │   ├── predictech.png
    │   ├── drontech.png
    │   ├── aquascope.png
    │   ├── ecoscan.png
    │   ├── skillnov.png
    │   └── smartflow.png
    └── img/
        ├── homeimage.png
```
