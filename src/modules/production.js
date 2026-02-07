export const ProductionModule = {
    render: (data) => {
        if (!data) return '';
        return `
            <section id="production" class="module">
                <div class="module-header">
                    <h2>${data.title}</h2>
                    <p>${data.desc}</p>
                </div>

                <div class="vocal-chain-grid">
                    <div class="card glass">
                        <h3>${data.insights[0].h}</h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">${data.insights[0].p}</p>
                    </div>

                    <div class="card glass">
                        <h3>${data.insights[1].h}</h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">${data.insights[1].p}</p>
                    </div>
                </div>

                <div class="low-end-box glass" style="margin-top: 2rem;">
                    <h3>${data.extra.h}</h3>
                    <p>${data.extra.p}</p>
                </div>
                
                <button class="cta-btn" style="margin-top: 2rem; width: 100%;">Solicitar Análisis de este Módulo</button>
            </section>
        `;
    },
    init: () => {
        console.log('Production Module Initialized with dynamic data');
    }
};
