// MIDI note mapping
const MIDI_NOTES = {
    'C4': 60,
    'D4': 62,
    'E4': 64,
    'F4': 65,
    'G4': 67,
    'A4': 69,
    'B4': 71,
    'C5': 72
};

class MIDIController {
    constructor() {
        this.buttonContainer = document.getElementById('midiButtonContainer');
        this.initialiseButtons();
    }

    initialiseButtons() {
        // Create buttons for each MIDI note
        Object.entries(MIDI_NOTES).forEach(([noteName, midiNote]) => {
            const button = document.createElement("button");
            button.textContent = noteName;
            button.classList.add('midi-button');
            button.addEventListener('click', () => this.playNote(midiNote));
            this.buttonContainer.appendChild(button);
        });
    }

    async playNote(midiNote) {
        try {
            // Standard MIDI velocity
            const response = await fetch(`/midi-note?note=${midiNote}&velocity=64`);

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