export const RhythmModule = {
    render: (data) => {
        if (!data) return '';
        return `
            <section id="rhythm" class="module">
                <div class="module-header">
                    <h2>${data.title}</h2>
                    <p>${data.desc}</p>
                </div>

                <div class="sequencer-container glass">
                    <div class="sequencer-header">
                        <h3>Secuenciador Dembow</h3>
                        <div class="controls">
                            <label>BPM: <input type="number" id="bpm-input" value="94" min="80" max="120"></label>
                            <button id="play-btn">Reproducir Beat</button>
                        </div>
                    </div>
                    
                    <div class="grid-visualizer">
                        <div class="track">
                            <span class="track-label">KICK</span>
                            <div class="steps" id="kick-steps">
                                ${Array(8).fill(0).map((_, i) => `<div class="step ${[0, 3, 4, 7].includes(i) ? 'active' : ''}"></div>`).join('')}
                            </div>
                        </div>
                        <div class="track">
                            <span class="track-label">SNARE</span>
                            <div class="steps" id="snare-steps">
                                ${Array(8).fill(0).map((_, i) => `<div class="step ${[3, 7].includes(i) ? 'active' : ''}"></div>`).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="insights-box">
                        <h4>Insight Dinámico</h4>
                        <p><strong>${data.insights[0].h}:</strong> ${data.insights[0].p}</p>
                    </div>
                </div>

                <div class="trend-card glass">
                    <h3>${data.insights[1].h}</h3>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">${data.insights[1].p}</p>
                </div>

                <div class="low-end-box glass" style="margin-top: 2rem;">
                    <h3>${data.extra.h}</h3>
                    <p>${data.extra.p}</p>
                </div>
            </section>
        `;
    },
    init: () => {
        const playBtn = document.getElementById('play-btn');
        if (!playBtn) return;
        let isPlaying = false;

        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playBtn.textContent = isPlaying ? 'Detener' : 'Reproducir Beat';
            playBtn.classList.toggle('playing');
        });
    }
};
