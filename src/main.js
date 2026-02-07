import { RhythmModule } from './modules/rhythm.js';
import { ProductionModule } from './modules/production.js';
import { EmotionModule } from './modules/emotion.js';
import { MelodyModule } from './modules/melody.js';
import { PsychoacousticsModule } from './modules/psychoacoustics.js';
import { SubmissionModule } from './modules/submission.js';
import { MixingModule } from './modules/mixing.js';
import { ChatbotModule } from './modules/chatbot.js';
import { FaqModule } from './modules/faq.js';
import { ModuleData } from './modules/data.js';

document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentArea = document.getElementById('content-area');
    const dashboardSection = document.getElementById('dashboard');

    // Store references to module renderers
    const moduleMap = {
        'rhythm': RhythmModule,
        'production': ProductionModule,
        'emotion': EmotionModule,
        'melody': MelodyModule,
        'psychoacoustics': PsychoacousticsModule,
        'submission': SubmissionModule,
        'mixing': MixingModule,
        'faq': FaqModule
    };

    // Initialize Chatbot (Always present)
    ChatbotModule.render(); // Just to inject HTML? No, render returns string.
    // Better to append Chatbot HTML to body or use a placeholder.
    // Let's modify main.js to append it.
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const moduleId = btn.getAttribute('data-module');

            // Update nav active state
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Handle Dashboard separately
            if (moduleId === 'dashboard') {
                contentArea.innerHTML = '';
                contentArea.appendChild(dashboardSection);
                dashboardSection.classList.add('active');
                return;
            }

            // Render and initialize the module with random data
            const module = moduleMap[moduleId];
            if (module) {
                // Determine which data variation to use
                const moduleVariations = ModuleData[moduleId];
                let selectedData = null;

                if (moduleVariations && moduleVariations.length > 0) {
                    const randomIndex = Math.floor(Math.random() * moduleVariations.length);
                    selectedData = moduleVariations[randomIndex];
                }

                contentArea.innerHTML = module.render(selectedData);
                const activeModule = contentArea.querySelector('.module');
                if (activeModule) activeModule.classList.add('active');
                module.init(selectedData);
            } else {
                contentArea.innerHTML = `
                    <div class="module active">
                        <h2>Módulo <span class="accent">${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}</span></h2>
                        <p class="glass" style="padding: 2rem; margin-top: 2rem;">La síntesis de investigación para este módulo se está finalizando actualmente. Mantente atento a los insights de 2026.</p>
                    </div>
                `;
            }
        });
    });

    // Initialize Chatbot
    const app = document.getElementById('app');
    const chatbotContainer = document.createElement('div');
    chatbotContainer.innerHTML = ChatbotModule.render();
    app.appendChild(chatbotContainer);
    ChatbotModule.init();

    // Link all CTA buttons to the submission module
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cta-btn')) {
            const submissionModule = moduleMap['submission'];
            if (submissionModule) {
                // Update nav
                navButtons.forEach(b => b.classList.remove('active'));

                contentArea.innerHTML = submissionModule.render();
                const activeModule = contentArea.querySelector('.module');
                if (activeModule) activeModule.classList.add('active');
                submissionModule.init();
            }
        }
    });

    console.log('Reggaeton-Network Initialized');
});
