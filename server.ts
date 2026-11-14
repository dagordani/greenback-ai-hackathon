import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));

// Initialize server-side Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Server-side GreenBack AI Advisor endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { question, systemContext } = req.body ?? {};

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'A question string is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: question,
      config: {
        systemInstruction:
          typeof systemContext === 'string' && systemContext.trim().length > 0
            ? systemContext
            : "You are GreenBack's helpful internal AI Grant Advisor. Keep answers concise (2-4 sentences), accurate, and friendly.",
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      return res.status(502).json({ error: 'Empty response returned from Gemini.' });
    }

    return res.json({ reply });
  } catch (err) {
    console.error('Gemini API error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate AI advisor response.';
    return res.status(500).json({ error: message });
  }
});

// Server-side proxy for Grants.gov live sweep (avoids browser CORS issues)
app.post('/api/grants/sweep', async (_req, res) => {
  try {
    const upstream = await fetch('https://api.grants.gov/v1/api/search2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rows: 1,
        oppStatuses: 'forecasted|posted',
        eligibilities: '22|23',
        fundingCategories: 'EN|NR',
      }),
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Grants.gov sweep request failed.' });
    }

    const data = await upstream.json();
    const hit = data?.data?.oppHits?.[0] || data?.oppHits?.[0] || null;
    return res.json({ hit });
  } catch (err) {
    console.error('Grants.gov sweep error:', err);
    return res.status(502).json({ error: 'Unable to reach Grants.gov API.' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GreenBack server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
