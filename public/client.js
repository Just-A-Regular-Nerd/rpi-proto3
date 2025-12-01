// MIDI note mapping
const MIDI_NOTES = [
    'C4',
    'D4',
    'E4',
    'F4',
    'G4',
    'A4',
    'B4',
    'C5'
];

class MIDIController {
    constructor() {
        this.buttonContainer = document.getElementById('midiButtonContainer');
        this.initialiseButtons();
    }

    initialiseButtons() {
        // Create buttons for each MIDI note
        MIDI_NOTES.forEach(note => {
            const button = document.createElement("button");
            button.textContent = note;
            button.classList.add('midi-button');
            button.addEventListener('click', () => this.playNote(note));
            this.buttonContainer.appendChild(button);
        });
    }

    async playNote(midiNote) {
        try {
            // Standard MIDI velocity
            const response = await fetch(`/midi-note?note=${midiNote}`);

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