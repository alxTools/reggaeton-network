const express = require('express');
const router = express.Router();
const aiService = require('../services/ai');
const emailService = require('../services/email');

// Simulating a webhook endpoint that Notion would call when a status changes
router.post('/notion-update', async (req, res) => {
    try {
        const { ticketId, status, clientEmail, trackLink } = req.body;

        if (status === 'Processing') {
            console.log(`[Webhook] Ticket ${ticketId} moved to Processing. Initiating AI Analysis...`);

            // 1. Generate Analysis via AI
            const analysisReport = await aiService.analyzeTrack(trackLink);

            // 2. Generate Quote/Proposal
            const proposal = aiService.generateProposal(analysisReport);

            // 3. Send Analysis Email to Client
            await emailService.sendAnalysisResult(clientEmail, proposal);

            console.log(`[Webhook] Analysis sent to ${clientEmail}`);
        }

        res.status(200).send('Webhook received');
    } catch (error) {
        console.error('[Error] Webhook processing failed:', error);
        res.status(500).send('Webhook Error');
    }
});

module.exports = router;
