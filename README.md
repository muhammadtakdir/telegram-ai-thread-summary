# Contextual Thread Summary Pill (Designers × AI Submission)

> **Submission for Telegram @designers**  
> **Concept:** Contextual Thread Summary Pill & Instant Jump Navigation  
> **Author:** Muhammad Takdir, S.T., M.I.Kom.  
> **Tech Stack:** React 19, TypeScript 5.7, Vite 6, Telegram Web K / Desktop Architecture

---

## 💡 Concept Overview

In active groups, supergroups, and forum topics, catching up on 50–200 unread messages is often overwhelming. Traditional chat interfaces only give users a blunt choice: read every single bubble or hit "Jump to bottom" and risk missing critical decisions.

The **Contextual Thread Summary Pill** introduces a native, non-intrusive floating element that lives right above the unread arrow:
1. **Dynamic Pill (`✨ Ringkas Topik Ini / Catch Up`)**: Dynamically indicates the number of unread messages and subtle shimmering AI glow.
2. **Contextual Flyout Drawer (Solid & Dark-mode Native)**: Instantly presents:
   - **Executive Overview**: What the discussion is actually about.
   - **Action Items & Key Decisions**: Explicit deliverables extracted by local/on-device AI.
3. **Direct Jump & Flash Highlight**: Clicking any action point automatically scrolls the conversation to the exact origin message and triggers a gentle spotlight flash.
4. **Instant Catch-up**: "Tandai Sudah Dibaca" clears the unread badge and dismisses the flyout in one seamless interaction.

---

## 🚀 Getting Started & Local Development

### 1. Clone & Run Prototype
```bash
git clone https://github.com/muhammadtakdir/telegram-ai-thread-summary.git
cd telegram-ai-thread-summary
npm install
npm run dev # runs on http://127.0.0.1:4173
```

### 2. Visual Previews & Demo Video
- **Screenshot 1 (AI Pill):** `preview_pill.png`
- **Screenshot 2 (Contextual Drawer):** `preview_open.png`
- **Interactive Demo Video:** `telegram_ai_thread_summary_demo.mp4` (1080p 30fps H.264)
- **Google Drive Mirror:** [Demo Video on Drive](https://drive.google.com/file/d/1fDWwLGdOGAPSQnez-C01WlK0msrlOrbi/view?usp=drivesdk)

---

## 🛠 Integration into Telegram Client

This component is crafted as zero-dependency vanilla React/TypeScript modular components, making it directly portable into:
- `morethanwords/tweb` (Telegram Web K)
- `Ajaxy/telegram-tt` (Telegram Web A)
- Qt/C++ binding logic for `telegramdesktop/tdesktop`

### Key Files:
- `src/types.ts`: Chat, Topic, and AI Summary data schemas.
- `src/App.tsx`: Full interactive forum chat view with dynamic pill, drawer, and highlight triggers.
- `src/index.css`: Telegram native dark theme styling, keyframes, and custom scrollbars.
