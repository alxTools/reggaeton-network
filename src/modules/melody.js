export const MelodyModule = {
    render: (data) => {
        if (!data) return '';
        return `
            <section id="melody" class="module">
                <div class="module-header">
                    <h2>${data.title}</h2>
                    <p>${data.desc}</p>
                </div>

                <div class="melody-grid">
                    <div class="card glass">
                        <h3>${data.insights[0].h}</h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">${data.insights[0].p}</p>
                    </div>

                    <div class="card glass">
                        <h3>${data.insights[1].h}</h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">${data.insights[1].p}</p>
                    </div>
                </div>

                <div class="scale-insight glass" style="margin-top: 2rem;">
                    <h3>${data.extra.h}</h3>
                    <p>${data.extra.p}</p>
                </div>
            </section>
        `;
    },
    init: () => {
        console.log('Melody Module Initialized');
    }
};
