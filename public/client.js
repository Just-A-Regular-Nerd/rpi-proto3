// MIDI note mapping
const MIDI_NOTES = {
    'C4': 'C4',
    'C#4': 'CZ4',
    'D4': 'D4',
    'D#4': 'DZ4',
    'E4': 'E4',
    'F4': 'F4',
    'F#4': 'FZ4',
    'G4': 'G4',
    'G#4': 'GZ4',
    'A4': 'A4',
    'A#4': 'AZ4',
    'B4': 'B4',
    'C5': 'C5'
};

// Meme note mapping
const MEME_NOTES = {
    'D5': 'xp-critbat',
    'E5': 'xp-balloon',
    'F5': 'xp-critstop',
    'G5': 'xp-default',
    'A5': 'xp-err',
    'B5': 'xp-insert',
    'C6': 'xp-logon',
    'D6': 'xp-notify',
    'E6': 'notify-discord',
    'F6': 'notify-fb',
    'G6': 'notify-teams'
}

const BLACK_NOTES = new Set(['C#4','D#4','F#4','G#4','A#4']);

let memeMode = false;
let noteCount = 0;

class MIDIController {
    constructor() {
        this.buttonContainer = document.getElementById('midiButtonContainer');
        this.informationContainer = document.getElementById('midiInformationContainer');
        this.initialiseButtons();
    }

    // Create a button that toggles meme mode
    createMemeModeToggle() {
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Super Secret Mode';
        toggleButton.classList.add('meme-mode-toggle');

        toggleButton.addEventListener('click', () => {
            memeMode = !memeMode;

            this.buttonContainer.innerText = '';
            this.initialiseButtons();
        });

        this.buttonContainer.parentElement.insertBefore(toggleButton, this.informationContainer);
    }

    initialiseButtons() {
        const noteNames = !memeMode ? Object.keys(MIDI_NOTES) : Object.keys(MEME_NOTES);

        noteNames.forEach((displayName, i) => {
            const button = document.createElement('button');
            button.textContent = displayName;

            // Decide colour
            if (BLACK_NOTES.has(displayName)) {
                button.classList.add('midi-button', 'black');
            } else {
                button.classList.add('midi-button', 'white');
            }

            button.addEventListener('click', () => this.playNote(displayName));
            this.buttonContainer.appendChild(button);
        });
    }

    async playNote(midiNote) {
        // Meme mode code
        noteCount++;
        if(noteCount === 15) {
            this.createMemeModeToggle();
        }

        try {
            // Standard MIDI velocity
            let mappedNote = !memeMode ? MIDI_NOTES[midiNote] : MEME_NOTES[midiNote];
            const response = await fetch(`/midi-note?note=${mappedNote}`);

            if (!response.ok) {
                throw new Error('Failed to play note');
            }
            const result = await response.json();
            console.log(result.status);
        } catch (error) {
            console.log('Error playing MIDI note: ', error);
        }
    }
}

// Initialise MIDI controller
document.addEventListener('DOMContentLoaded', () => {
    new MIDIController();
});