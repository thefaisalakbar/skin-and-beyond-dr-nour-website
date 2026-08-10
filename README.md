# Skin & Beyond by Dr. Nour — Website

Bilingual (English / Arabic, full RTL) marketing site + AI lead-capture
chatbot for Dr. Nour's dermatology practice in Dubai.

## Run locally

```
npm install
npm run dev
```

Then open the local URL Vite prints (typically http://localhost:5173).

## Build for production

```
npm run build
```

Output goes to `dist/` — deploy that folder to any static host (Vercel,
Netlify, Cloudflare Pages, etc).

## Where things live

| What | File |
|---|---|
| All site copy (EN + AR) | `src/i18n.js` |
| Clinic contact details, hours, webhook URL | `src/clinicInfo.js` |
| All page sections | `src/App.jsx` |
| Chatbot widget | `src/components/Chatbot.jsx` |
| Brand colors / fonts | `tailwind.config.js` |
| Doctor's photo | `public/dr-nour-headshot.jpg` |
| Chatbot AI system prompt (paste into n8n) | `CHATBOT_SYSTEM_PROMPT.md` |

## Before going live — placeholders to replace

Search for `PLACEHOLDER` across `src/clinicInfo.js` and `src/i18n.js`. You need:

- Real clinic address, phone, WhatsApp number, email
- Google Maps embed URL (optional, `clinicInfo.mapEmbedUrl`)
- Real patient testimonials (currently 3 placeholder cards)
- Insurance partner logos (currently 4 placeholder tiles)
- Additional clinic/working photography for the Gallery section
  (currently only the one supplied headshot is real; the rest are
  clearly marked "photo to be added" tiles, not stock images)
- FAQ answers — defaults are dermatology-appropriate but should be
  confirmed by Dr. Nour

## Chatbot

The widget is wired to the n8n webhook in `src/clinicInfo.js`
(`chatWebhookUrl`). It gates the conversation behind a short lead form
(name, phone, email, optional question, consent) before opening the chat,
and passes those details plus the visitor's language to the webhook on
every message. See `CHATBOT_SYSTEM_PROMPT.md` for the AI agent's system
prompt — paste it into the n8n AI Agent node.
