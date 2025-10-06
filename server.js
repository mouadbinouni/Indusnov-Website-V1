const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Debug logging for static files
app.use((req, res, next) => {
    console.log(`Requested: ${req.path}`);
    next();
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Define routes for specific pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Handle 404 - Page not found
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Indusnov website is running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop the server');
});