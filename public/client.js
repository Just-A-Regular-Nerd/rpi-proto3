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

const BLACK_NOTES = new Set(['C#4','D#4','F#4','G#4','A#4']);

class MIDIController {
    constructor() {
        this.buttonContainer = document.getElementById('midiButtonContainer');
        this.initialiseButtons();
    }

    initialiseButtons() {
        // Create an array of the note names in the order they appear in MIDI_NOTES
        const noteNames = Object.keys(MIDI_NOTES);

        noteNames.forEach((displayName, i) => {
            const button = document.createElement('button');
            button.textContent = displayName;

            // Decide colour
            if (BLACK_NOTES.has(displayName)) {
                button.classList.add('midi-button', 'black');
                // i is the index of the current note in the ordered list
                const idx = i;               // <-- now a valid index
                // you can use idx here if needed (e.g., for positioning)
            } else {
                button.classList.add('midi-button', 'white');
            }

            button.addEventListener('click', () => this.playNote(displayName));
            this.buttonContainer.appendChild(button);
        });
    }


    async playNote(midiNote) {
        try {
            // Standard MIDI velocity
            let mappedNote = MIDI_NOTES[midiNote];
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