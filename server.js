const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Basic route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle sound playing
app.get('/play-sound', (req, res) => {
    // Sound playing logic to be implemented
    console.log('Sound play requested');
    res.json({status: 'Sound triggered'});
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});