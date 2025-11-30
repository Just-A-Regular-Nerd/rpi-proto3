const express = require('express');
const path = require('path');
const midi = require('midi')
const { spawn } = require('child_process');
const app = express();
const port = 3000;

// MIDI input setup
const input = new midi.Input();

// Find and open the first available MIDI input device
function setupMIDIInput() {
    const inputCount = input.getPortCount();
    if (inputCount > 0) {
        console.log(`Available MIDI Input Ports: ${inputCount}`);

        // Open the first available port
        input.openPort(0);

        // MIDI message handler
        input.on('message', (deltaTime, message) => {
            // message format: [status, data1, data2]
            const [status, note, velocity] = message;

            // check if it's a note on event
            if ((status & 0xF0) === 0x90 && velocity > 0) {
                playMIDINote(note, velocity);
            }
        });
    } else {
        console.error('No MIDI input devices found');
    }
}

// Play MIDI Note using FluidSynth
function playMIDINote(note, velocity) {
    // Use FluidSynth to play the note
    const fluidsynth = spawn('fluidsynth', [
        '-ni', // No interactive mode
        '/usr/share/sounds/sf2/FluidR3_GM.sf2', // Default soundfont
        '-r', '44100', // Sample rate
        '-f', '-' // Read from stdin
    ]);

    // Send MIDI note on command
    fluidsynth.stdin.write(`noteon 0 ${note} ${velocity}\n`);
    fluidsynth.stdin.write(`noteoff 0 ${note} ${velocity}\n`);
    fluidsynth.stdin.end();
}

// Web server routes
app.get('/midi-note', (req, res) => {
    const { note, velocity } = req.query;

    if (note && velocity) {
        playMIDINote(
            parseInt(note, 10),
            parseInt(velocity, 10)
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
    setupMIDIInput();
});

// Cleanup on exit
process.on('SIGINT', () => {
    input.closePort();
    process.exit();
});