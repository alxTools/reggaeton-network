// Mock Notion Service
// In production, use @notionhq/client

module.exports = {
    addToQueue: async (data) => {
        console.log('[Notion Service] Adding to database:', data);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Return a fake ticket ID
        return `TICKET-${Math.floor(Math.random() * 10000)}`;
    },

    updateStatus: async (ticketId, status) => {
        console.log(`[Notion Service] Updating ticket ${ticketId} to status: ${status}`);
        return true;
    }
};
