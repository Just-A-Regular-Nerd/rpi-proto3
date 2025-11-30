const Speaker = require('speaker');
const { Readable } = require('stream');

function playSineWave(frequency) {
    const sampleRate = 44100;
    const channels = 1;
    const duration = 1;

    const speaker = new Speaker({
        channels: channels,
        bitDepth: 16,
        sampleRate: sampleRate
    });

    const audioStream = new Readable({
        read(size) {
            const buffer = Buffer.alloc(size);
            for(let i = 0; i < size; i += 2) {
                const sample = Math.sin((i / sampleRate) * frequency * 2 * Math.PI);
                const intSample = Math.floor(sample * 32767);
                buffer.writeInt16LE(intSample, i);
            }
            this.push(buffer);
        },
        // End stream after duration
        destroy() {
            setTimeout(() => {
                this.push(null);
            }, duration * 1000);
        }
    });

    audioStream.pipe(speaker);
}

// Example usage
playSineWave(700);