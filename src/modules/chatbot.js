export const ChatbotModule = {
    render: () => {
        return `
            <div id="chatbot-widget" class="chatbot-widget">
                <div class="chatbot-header">
                    <div class="header-info">
                        <div class="avatar">🤖</div>
                        <div>
                            <h4>Emperador AI</h4>
                            <span class="status">En línea - Conectado a 5 Notebooks</span>
                        </div>
                    </div>
                    <button id="close-chat" class="close-btn">&times;</button>
                </div>
                <div id="chat-messages" class="chat-messages">
                    <div class="message bot">
                        <p>Hola. Soy tu asistente de producción urbana. Tengo acceso a toda la investigación sobre Ritmo, Melodía, Emoción, Producción y Psicoacústica.</p>
                        <p>¿En qué puedo ayudarte hoy?</p>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Pregunta sobre BPM, Sidechain, etc...">
                    <button id="send-btn" class="send-btn">➤</button>
                </div>
            </div>
            <button id="chatbot-trigger" class="chatbot-trigger">
                💬 AI Assistant
            </button>
        `;
    },
    init: () => {
        const widget = document.getElementById('chatbot-widget');
        const trigger = document.getElementById('chatbot-trigger');
        const closeBtn = document.getElementById('close-chat');
        const sendBtn = document.getElementById('send-btn');
        const input = document.getElementById('chat-input');
        const messagesContainer = document.getElementById('chat-messages');

        // Toggle Widget
        trigger.addEventListener('click', () => {
            widget.classList.add('open');
            trigger.style.display = 'none';
        });

        closeBtn.addEventListener('click', () => {
            widget.classList.remove('open');
            trigger.style.display = 'flex';
        });

        // Send Message Logic
        const sendMessage = async () => {
            const text = input.value.trim();
            if (!text) return;

            // Add User Message
            addMessage(text, 'user');
            input.value = '';

            // Simulate AI Typing
            const loadingId = addLoading();

            try {
                // Here we would call the backend API
                // const response = await fetch('/api/chat', { body: JSON.stringify({ query: text }) });
                // const data = await response.json();

                // Mock Response for Simulation
                setTimeout(() => {
                    removeLoading(loadingId);
                    const mockResponse = generateMockResponse(text);
                    addMessage(mockResponse, 'bot');
                }, 1500);
            } catch (e) {
                removeLoading(loadingId);
                addMessage("Error de conexión con el cerebro digital.", 'bot');
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        function addMessage(text, sender) {
            const div = document.createElement('div');
            div.className = `message ${sender}`;
            div.innerHTML = `<p>${text}</p>`;
            messagesContainer.appendChild(div);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function addLoading() {
            const id = 'loading-' + Date.now();
            const div = document.createElement('div');
            div.id = id;
            div.className = 'message bot';
            div.innerHTML = '<p class="typing">Escribiendo...</p>';
            messagesContainer.appendChild(div);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            return id;
        }

        function removeLoading(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
        }

        function generateMockResponse(query) {
            const q = query.toLowerCase();
            if (q.includes('bpm') || q.includes('tempo')) return "Para el Reggaeton 2026, el estándar 'de calle' está entre 92-96 BPM. Si buscas algo más comercial o 'Pop-Urbano', puedes subir a 105 BPM. El Afro-beat fusión funciona bien en 110+.";
            if (q.includes('kick') || q.includes('bombo')) return "El Kick debe golpear en -6dB a -3dB. Recuerda usar Sidechain en el bajo (50Hz) para dejar espacio. La tendencia actual es un Kick con transitorios muy marcados (clicky) pero con cuerpo.";
            if (q.includes('master') || q.includes('lufs')) return "El objetivo para streaming es -14 LUFS integrado, pero en el género urbano, los masters 'Digitales' para YouTube/SoundCloud suelen ir a -7.5 o -8 LUFS para competir en volumen percibido. Dolby Atmos requiere estricto -18 LUFS.";
            return "Interesante pregunta. Basado en mis módulos de investigación, te sugiero revisar la sección de 'Producción' para detalles técnicos o 'Psicoacústica' para entender el impacto en el oyente. ¿Quieres que analice tu track específicamente? Ve a la sección de Envíos.";
        }
    }
};
