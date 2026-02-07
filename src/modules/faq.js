import { ModuleData } from './data.js';

export const FaqModule = {
    render: () => {
        let html = `
            <section id="faq" class="module">
                <div class="module-header">
                    <h2>Centro de <span class="accent">Conocimiento</span></h2>
                    <p>Base de datos de investigación completa (35+ Insights)</p>
                </div>
                <div class="faq-container">
        `;

        // Iterate over each category in ModuleData
        for (const [category, items] of Object.entries(ModuleData)) {
            // Capitalize category name
            const catName = category.charAt(0).toUpperCase() + category.slice(1);

            html += `<h3 class="faq-category-title">${catName}</h3>`;
            html += `<div class="faq-group">`;

            items.forEach((item, index) => {
                html += `
                    <details class="faq-item glass">
                        <summary>
                            <span class="faq-q">${item.title}</span>
                            <span class="icon">+</span>
                        </summary>
                        <div class="faq-answer">
                            <p class="main-desc">${item.desc}</p>
                            <ul class="insight-list">
                                ${item.insights.map(ins => `
                                    <li><strong>${ins.h}:</strong> ${ins.p}</li>
                                `).join('')}
                            </ul>
                            <div class="extra-box">
                                <strong>💡 ${item.extra.h}:</strong> ${item.extra.p}
                            </div>
                        </div>
                    </details>
                `;
            });

            html += `</div>`; // End faq-group
        }

        html += `
                </div>
                <div class="cta-container" style="text-align: center; margin-top: 3rem;">
                    <p>¿Tienes una pregunta específica?</p>
                    <button class="cta-btn chatbot-trigger-btn">Preguntar a Emperador AI</button>
                </div>
            </section>
        `;
        return html;
    },
    init: () => {
        // Optional: Add animation or exclusive open logic here
        const details = document.querySelectorAll('.faq-item');

        details.forEach(targetDetail => {
            targetDetail.addEventListener('click', () => {
                // Close others if you want exclusive accordion (optional)
                // details.forEach(detail => {
                //     if (detail !== targetDetail) {
                //         detail.removeAttribute('open');
                //     }
                // });
            });
        });

        // Link the specific chatbot trigger button within FAQ
        const faqChatBtn = document.querySelector('.chatbot-trigger-btn');
        if (faqChatBtn) {
            faqChatBtn.addEventListener('click', () => {
                const widget = document.getElementById('chatbot-widget');
                const trigger = document.getElementById('chatbot-trigger');
                if (widget && trigger) {
                    widget.classList.add('open');
                    trigger.style.display = 'none';
                }
            });
        }
    }
};
