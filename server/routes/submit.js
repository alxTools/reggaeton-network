const express = require('express');
const router = express.Router();
const notionService = require('../services/notion');
const emailService = require('../services/email');

router.post('/', async (req, res) => {
    try {
        const { name, email, service, link, message } = req.body;
        console.log('[Submission] Received new track from:', name);

        // 1. Add to Notion Queue
        const ticketId = await notionService.addToQueue({
            name, email, service, link, message, status: 'Queue'
        });

        // 2. Send Confirmation Email
        await emailService.sendConfirmation(email, ticketId);

        res.status(200).json({ success: true, message: 'Submission received', ticketId });
    } catch (error) {
        console.error('[Error] Submission failed:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
