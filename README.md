# GreenBack

**Connect your books. See the green money your business qualifies for. Get it.**

GreenBack is a full-stack environmental and clean-energy grant discovery, ledger verification, and pre-filled application workspace tailored for Utah small and medium-sized businesses.

## Features

- **4-Step Guided Onboarding**: Collects business profile, Utah county classification, and accounting/CRM connection preferences.
- **Ledger-Backed Grant Matching**: Dynamically scores local Utah DEQ, Rocky Mountain Power Wattsmart, and federal USDA REAP grants based on revenue, cash reserves, fuel/utility spend, and rural/urban county status.
- **Live Federal Grant Sweep**: Server-side `/api/grants/sweep` proxy queries the official Grants.gov search API for matching small-business energy opportunities.
- **Pre-Filled Application Workflow**: Generates editable grant justification narratives backed by accounting line-item citations, saves drafts, and displays review timeline & approval predictions after submission.
- **GreenBack AI Advisor**: Powered server-side via `@google/genai` (`gemini-4-hydrogen`) through `/api/ai/chat`, keeping API keys safely on the backend.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React
- **Backend**: Node.js, Express, `@google/genai`
- **Build Tool**: Vite

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env` and set your Gemini API key:
   ```env
   GEMINI_API_KEY="your_gemini_api_key"
   ```

3. **Run in development**:
   ```bash
   npm run dev
   ```
   The app runs on [http://localhost:3000](http://localhost:3000).

4. **Build & run in production**:
   ```bash
   npm run build
   npm start
   ```
