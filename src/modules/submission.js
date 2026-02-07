export const SubmissionModule = {
    render: () => {
        return `
            <section id="submission" class="module">
                <div class="module-header">
                    <h2>Preparación y <span class="accent">Envío</span></h2>
                    <p>Optimiza tus tracks con nuestros servicios profesionales de análisis y masterización.</p>
                </div>

                <div class="submission-container">
                    <div class="card glass submission-info">
                        <h3>Guía Técnica</h3>
                        <ul class="check-list">
                            <li>Formato: <strong>WAV 24-bit</strong></li>
                            <li>Headroom: <strong>-6dB</strong></li>
                            <li>Link: <strong>Google Drive / Dropbox</strong></li>
                        </ul>
                        <div class="gdrive-instruction">
                            <p>Asegúrate de que el enlace sea <strong>público</strong> o con acceso para 'Cualquier persona con el enlace'.</p>
                        </div>
                    </div>

                    <div class="card glass submission-form-card">
                        <h3>Formulario de Solicitud</h3>
                        <form id="submission-form" action="https://formspree.io/f/elemperadoralx@gmail.com" method="POST">
                            <div class="form-group">
                                <label for="name">Nombre / Productor</label>
                                <input type="text" id="name" name="name" required placeholder="Tu nombre artístico">
                            </div>
                            <div class="form-group">
                                <label for="email">Email de Contacto</label>
                                <input type="email" id="email" name="_replyto" required placeholder="tu@email.com">
                            </div>
                            <div class="form-group">
                                <label for="service">Servicio Requerido</label>
                                <select id="service" name="service">
                                    <option value="analisis">Análisis Espectral IA</option>
                                    <option value="master">Masterización Urbana</option>
                                    <option value="atmos">Mezcla Dolby Atmos</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="link">Enlace GDrive (Stems/Mix)</label>
                                <input type="url" id="link" name="link" required placeholder="https://drive.google.com/...">
                            </div>
                            <div class="form-group">
                                <label for="message">Notas adicionales</label>
                                <textarea id="message" name="message" rows="3" placeholder="Detalles de tu track..."></textarea>
                            </div>
                            <button type="submit" class="cta-btn submit-btn">Enviar a Revisión</button>
                        </form>
                        <div id="form-status" class="form-status"></div>
                    </div>
                </div>
            </section>
        `;
    },
    init: () => {
        const form = document.getElementById('submission-form');
        const status = document.getElementById('form-status');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            status.textContent = "Enviando...";
            status.className = "form-status show";

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.textContent = "¡Solicitud enviada con éxito! Te contactaremos pronto.";
                    status.classList.add('success');
                    form.reset();
                } else {
                    status.textContent = "Hubo un problema. Por favor intenta de nuevo.";
                    status.classList.add('error');
                }
            } catch (error) {
                status.textContent = "Error de conexión. Verifica tu internet.";
                status.classList.add('error');
            }
        });
    }
};
