
// SoundEngine.ts - A lightweight Web Audio API synthesizer for the app

class SoundEngine {
    private context: AudioContext | null = null;
    private masterGain: GainNode | null = null;

    constructor() {
        try {
            // Initialize AudioContext lazily on user interaction usually, 
            // but we prepare the standard here.
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.context = new AudioContextClass();
                this.masterGain = this.context.createGain();
                this.masterGain.connect(this.context.destination);
                this.masterGain.gain.value = 0.3; // Default volume (not too loud)
            }
        } catch (e) {
            console.error("Web Audio API not supported", e);
        }
    }

    private init() {
        if (this.context?.state === 'suspended') {
            this.context.resume();
        }
    }

    public playClick() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        // Ultra-short, high frequency "crystal" click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.context.currentTime + 0.05);

        gain.gain.setValueAtTime(0, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, this.context.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.05);

        // Crunchy haptic feedback
        this.vibrate(15);
    }

    public playHover() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        // Subtle "air" sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, this.context.currentTime);

        gain.gain.setValueAtTime(0, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, this.context.currentTime + 0.02);
        gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.1);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.1);
    }

    public playSiren() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        const lfo = this.context.createOscillator(); // Low Frequency Oscillator for the siren pitch

        osc.connect(gain);
        gain.connect(this.masterGain);

        // LFO controls the pitch of the main oscillator
        lfo.connect(osc.frequency);

        // Alarm sound
        osc.type = 'sawtooth';
        osc.frequency.value = 400; // Base frequency

        // LFO settings (Rise and fall)
        lfo.type = 'sine';
        lfo.frequency.value = 2; // 2 cycles per second
        const lfoGain = this.context.createGain();
        lfoGain.gain.value = 300; // Pitch range +/- 300Hz
        lfo.disconnect();
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        // Volume envelope
        gain.gain.setValueAtTime(0, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, this.context.currentTime + 0.5);
        gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 3);

        osc.start(this.context.currentTime);
        lfo.start(this.context.currentTime);

        osc.stop(this.context.currentTime + 3);
        lfo.stop(this.context.currentTime + 3);
    }

    public playPowerUp() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const currentTime = this.context.currentTime;

        // Play a major triad arpeggio
        [440, 554.37, 659.25, 880].forEach((freq, i) => {
            const osc = this.context!.createOscillator();
            const gain = this.context!.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain!);

            osc.type = 'sine';
            osc.frequency.value = freq;

            const startTime = currentTime + (i * 0.1);
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.2, startTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);

            osc.start(startTime);
            osc.stop(startTime + 0.8);
        });
    }

    // Cinematic startup sound - a warm, welcoming tone
    public playStartup() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const currentTime = this.context.currentTime;

        // Deep warm bass note
        const bassOsc = this.context.createOscillator();
        const bassGain = this.context.createGain();
        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);

        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(55, currentTime); // Low A
        bassOsc.frequency.exponentialRampToValueAtTime(110, currentTime + 1);

        bassGain.gain.setValueAtTime(0, currentTime);
        bassGain.gain.linearRampToValueAtTime(0.3, currentTime + 0.3);
        bassGain.gain.linearRampToValueAtTime(0, currentTime + 1.5);

        bassOsc.start(currentTime);
        bassOsc.stop(currentTime + 1.5);

        // Shimmering high notes (like a sunrise)
        [880, 1318.5, 1760].forEach((freq, i) => {
            const osc = this.context!.createOscillator();
            const gain = this.context!.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain!);

            osc.type = 'sine';
            osc.frequency.value = freq;

            const startTime = currentTime + 0.3 + (i * 0.15);
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.1, startTime + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 1.2);

            osc.start(startTime);
            osc.stop(startTime + 1.2);
        });
    }

    // Satisfying "calculation complete" chime
    public playCalculationComplete() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const currentTime = this.context.currentTime;

        // Two-note "ding-dong" confirmation
        const notes = [659.25, 523.25]; // E5 -> C5 (major third down - very satisfying)

        notes.forEach((freq, i) => {
            const osc = this.context!.createOscillator();
            const gain = this.context!.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain!);

            osc.type = 'sine';
            osc.frequency.value = freq;

            const startTime = currentTime + (i * 0.15);
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

            osc.start(startTime);
            osc.stop(startTime + 0.5);
        });
    }

    // Typing feedback - very subtle
    public playTyping() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'sine';
        osc.frequency.value = 600 + Math.random() * 200; // Slight variation

        gain.gain.setValueAtTime(0, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, this.context.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.03);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.03);
    }

    // Remove person sound - descending "woosh"
    public playRemove() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        // Descending pitch (opposite of add)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.context.currentTime + 0.15);

        gain.gain.setValueAtTime(0, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, this.context.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.15);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.15);

        this.vibrate(30);
    }

    // Pop sound for main icon tap - bubbly and satisfying
    public playPop() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        // Quick pitch sweep up then down (pop effect)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.context.currentTime + 0.03);
        osc.frequency.exponentialRampToValueAtTime(200, this.context.currentTime + 0.08);

        gain.gain.setValueAtTime(0, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, this.context.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.1);

        this.vibrate(20);
    }

    // Haptic vibration (if supported)
    public vibrate(duration: number | number[] = 50) {
        if ('vibrate' in navigator) {
            navigator.vibrate(duration);
        }
    }

    // Celebration fanfare - confetti moment!
    public playCelebration() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const currentTime = this.context.currentTime;

        // Triumphant ascending arpeggio (C major → G major → high C)
        const celebrationNotes = [
            { freq: 523.25, time: 0 },       // C5
            { freq: 659.25, time: 0.08 },    // E5
            { freq: 783.99, time: 0.16 },    // G5
            { freq: 1046.5, time: 0.24 },    // C6
            { freq: 1318.5, time: 0.35 },    // E6 (peak)
        ];

        celebrationNotes.forEach(({ freq, time }) => {
            const osc = this.context!.createOscillator();
            const gain = this.context!.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain!);

            osc.type = 'sine';
            osc.frequency.value = freq;

            const startTime = currentTime + time;
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.3, startTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

            osc.start(startTime);
            osc.stop(startTime + 0.4);
        });

        // Festive haptic pattern: quick bursts
        this.vibrate([30, 50, 30, 50, 60]);
    }

    // Success haptic - two quick taps
    public vibrateSuccess() {
        this.vibrate([20, 40, 20]);
    }

    // Mode change haptic - single medium tap
    public vibrateModeChange() {
        this.vibrate(40);
    }

    // Error/warning haptic - longer vibration
    public vibrateError() {
        this.vibrate(100);
    }

    // Click haptic - short and crunchy
    public vibrateClick() {
        this.vibrate(15);
    }

    // Input focus haptic - ultra subtle
    public vibrateInput() {
        this.vibrate(8);
    }

    // Add person haptic - ascending burst
    public vibrateAdd() {
        this.vibrate([10, 20, 15, 30, 20]);
    }

    // Remove person haptic - descending
    public vibrateRemove() {
        this.vibrate([30, 20, 10]);
    }

    // Copy haptic - satisfying double tap
    public vibrateCopy() {
        this.vibrate([25, 50, 25]);
    }

    // Scroll haptic - tiny tick
    public vibrateTick() {
        this.vibrate(5);
    }

    // Play copy sound with haptic
    public playCopy() {
        this.init();
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        // Quick ascending "blip" - satisfying copy sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, this.context.currentTime + 0.08);

        gain.gain.setValueAtTime(0, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, this.context.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.1);

        this.vibrateCopy();
    }
}

export const soundEngine = new SoundEngine();
