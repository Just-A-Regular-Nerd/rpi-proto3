const express = require('express');
const path = require('path');
const player = require('node-wav-player');
const app = express();
const port = 3000;

// Play MIDI Note via appropriate wave file
function playMIDINote(note) {
    console.log('Playing note: ' + note);
    player.play({
        path: './sounds/' + note + '.wav',
    }).then(() => {
        console.log(`${note} played successfully`);
    }).catch((error) => {
        console.error(error);
    });
}

// Web server routes
app.get('/midi-note', (req, res) => {
    const { note } = req.query;

    if (note) {
        playMIDINote(
            note
        );
        res.json({status: 'Note played'});
    } else {
        res.status(400).json({error: 'Invalid MIDI parameters'});
    }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Cleanup on exit
process.on('SIGINT', () => {
    process.exit();
});