# SaaS Backend Architecture Design

## 1. Server Structure
- **Runtime**: Node.js (Express)
- **Database (Mock/Interface)**: Notion API (for Queue Management)
- **Email Service**: Nodemailer / SendGrid

## 2. Workflows

### Workflow A: Submission
1. **Trigger**: POST /api/submit (from Frontend Form)
2. **Action 1**: Validate inputs (Link, Email, Service).
3. **Action 2**: Create entry in Notion Database "Reggaeton Queue".
    - Fields: Name, Email, Service, Link, Status="Queue".
4. **Action 3**: Send Confirmation Email to Client.
    - Template: "We received your track. You are position #X in the queue."

### Workflow B: Analysis & Proposal (The "Processing" Trigger)
1. **Trigger**: Webhook or Polling on Notion Database.
    - Detect change: Status moves from "Queue" -> "Processing".
    - *Alternative (MVP)*: Admin dashboard button "Send Proposal".
2. **Action**: Generate Analysis Report (using NotebookLM Agent).
    - Query: "Analyze this track [Link] based on Reggaeton 2026 standards."
3. **Action**: Send Proposal Email.
    - Content: Analysis Summary + Quote for Mixing/Mastering.
    - Link to payment (Stripe/PayPal).

## 3. Chatbot Integration
- Endpoint: POST /api/chat
- Logic: Forwards user query to NotebookLM via MCP.
- Context: Uses the 5 core notebooks (Rhythm, Melody, etc.) as the knowledge base.
