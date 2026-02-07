const express = require('express');
const cors = require('cors');
const submitRoute = require('./routes/submit');
const webhookRoute = require('./routes/webhook');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/submit', submitRoute);
app.use('/api/webhook', webhookRoute);

// Mock Chatbot Endpoint
app.post('/api/chat', (req, res) => {
    const { query } = req.body;
    console.log(`[Chatbot] Received: ${query}`);
    // In production, this would call Python/NotebookLM API
    res.json({ response: "AI processing..." });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('SaaS Automation Logic Operational');
});
