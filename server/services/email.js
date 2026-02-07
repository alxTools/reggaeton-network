// Mock Email Service
// In production, use nodemailer or SendGrid

module.exports = {
    sendConfirmation: async (email, ticketId) => {
        console.log(`[Email Service] Sending confirmation to ${email} for Ticket ${ticketId}`);
        console.log(`   > Subject: Recibimos tu track - Ticket ${ticketId}`);
        console.log(`   > Body: Tu track está en la cola de análisis. Te notificaremos pronto.`);
        return true;
    },

    sendAnalysisResult: async (email, proposal) => {
        console.log(`[Email Service] Sending Analysis & Proposal to ${email}`);
        console.log(`   > Subject: Tu Análisis de Reggaeton-Network está listo`);
        console.log(`   > Body: ${proposal.summary}`);
        console.log(`   > Quote: ${proposal.quote}`);
        return true;
    }
};
