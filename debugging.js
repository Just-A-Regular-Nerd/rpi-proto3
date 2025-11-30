const Speaker = require('speaker');
const { Readable } = require('stream');

function playPianoSound(frequency, duration) {
    const sampleRate = 44100;
    const channels = 1;
    const attackTime = 0.05; // seconds
    const decayTime = 0.1; // seconds
    const sustainLevel = 0.5; // 50% level
    const releaseTime = 0.1; // seconds

    const speaker = new Speaker({
        channels: channels,
        bitDepth: 16,
        sampleRate: sampleRate
    });

    const audioStream = new Readable({
        read(size) {
            const buffer = Buffer.alloc(size);
            const totalSamples = Math.ceil(sampleRate * duration);
            const attackSamples = Math.ceil(sampleRate * attackTime);
            const decaySamples = Math.ceil(sampleRate * decayTime);
            const releaseSamples = Math.ceil(sampleRate * releaseTime);

            for (let i = 0; i < totalSamples; i++) {
                const t = i / sampleRate;

                let amplitude = 0;

                // Envelope: Attack
                if (i < attackSamples) {
                    amplitude = i / attackSamples;
                }
                // Envelope: Decay
                else if (i < attackSamples + decaySamples) {
                    amplitude = 1 - ((i - attackSamples) / decaySamples) * (1 - sustainLevel);
                }
                // Envelope: Sustain
                else if (i < totalSamples - releaseSamples) {
                    amplitude = sustainLevel;
                }
                // Envelope: Release
                else {
                    amplitude = sustainLevel - (sustainLevel * (i - (totalSamples - releaseSamples)) / releaseSamples);
                }

                const sample = Math.sin(2 * Math.PI * frequency * t) * amplitude;
                const intSample = Math.floor(sample * 32767); // 16-bit PCM
                buffer.writeInt16LE(intSample, Math.floor(i * 0.5)); // Little Endian (16-bit)
            }
            this.push(buffer);
            if (totalSamples > size / 2) {
                this.destroy(); // End the stream after the last note
            }
        }
    });

    audioStream.pipe(speaker);
}

// Example Usage
playPianoSound(440, 1); // Plays A4 for 1 second
