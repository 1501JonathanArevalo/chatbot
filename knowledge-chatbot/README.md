# 🤖 Knowledge Management Chatbot

A modern, multilingual AI chatbot focused on knowledge management, ethics, and human development — built with **Node.js**, **Express**, and the **OpenAI API**.

---

## ✨ Description

This project is an academic full-stack web application that integrates an AI chatbot capable of conversing in **Spanish and English**. The bot automatically detects the user's language and responds in kind, while promoting core values: ethics, autonomy, responsibility, and human development.

The project embodies the following institutional declaration:

> *"Soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del diálogo y la construcción, como ideal regulativo; me dirijo, controlo y dicto mis propias leyes."*

---

## 🛠 Technologies

| Layer      | Technology                |
|------------|---------------------------|
| Frontend   | HTML5, CSS3, JavaScript   |
| Backend    | Node.js, Express.js       |
| AI         | OpenAI API (GPT-4.1 Mini) |
| Tooling    | dotenv, cors              |

---

## 🏗 Architecture

```
Browser (client/)
    │
    │  HTTP POST /chat  (fetch API)
    ▼
Express Server (server/server.js)
    │
    │  OpenAI SDK
    ▼
OpenAI API (GPT-4.1 Mini)
    │
    ▼
Response → Express → Browser (rendered in chat UI)
```

**Frontend** communicates with the **backend** via a single REST endpoint (`POST /chat`). The backend forwards the user message and conversation history to the OpenAI API, then returns the reply to the browser.

---

## 📁 Project Structure

```
knowledge-chatbot/
│
├── server/
│   ├── server.js          ← Express app + OpenAI integration
│   ├── package.json       ← Node dependencies
│   ├── .env.example       ← Environment variable template
│   └── README.md          ← Server documentation
│
├── client/
│   ├── index.html         ← Main HTML page
│   ├── style.css          ← Dark dashboard styles
│   └── app.js             ← Fetch API + chat logic
│
└── README.md              ← This file
```

---

## ⚙ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/knowledge-chatbot.git
cd knowledge-chatbot
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and replace `your_api_key_here` with your real OpenAI API key:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
PORT=3000
```

---

## 🔑 Getting Your OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account.
3. Click **"Create new secret key"**.
4. Copy the key and paste it into your `.env` file.

---

## ▶ Running Locally

```bash
cd server
node server.js
```

Then open your browser at: **[http://localhost:3000](http://localhost:3000)**

The Express server serves both the API and the static frontend files.

---

## 🌐 Features

- ✅ Real-time AI chat powered by GPT-4.1 Mini
- ✅ Automatic language detection (Spanish / English)
- ✅ Conversation history sent with each request for context
- ✅ Animated typing indicator while the bot responds
- ✅ Error handling for API and network failures
- ✅ "Clear chat" button to reset the conversation
- ✅ Responsive design for desktop and mobile
- ✅ Dark dashboard aesthetic (blue-cyan palette)

---

## 🧠 Frontend / Backend Flow

```
1.  User types a message and presses Enter or clicks Send
2.  app.js sends POST /chat with { message, history[] }
3.  server.js receives the request
4.  server.js builds the messages array:
      [system_prompt, ...history, user_message]
5.  server.js calls openai.chat.completions.create(...)
6.  OpenAI returns the AI reply
7.  server.js responds with { reply }
8.  app.js renders the reply bubble in the chat UI
```

---

## 📤 Uploading to GitHub

```bash
# Inside the project root
git init
git add .
git commit -m "feat: initial Knowledge Management Chatbot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/knowledge-chatbot.git
git push -u origin main
```

> **Important:** Never commit your `.env` file. Add it to `.gitignore`:
> ```
> server/.env
> node_modules/
> ```

---

## 🎥 Recording a Technical Demo (English)

1. **Prepare** — Make sure the server is running (`node server.js`) and open the browser at `localhost:3000`.
2. **Tools** — Use OBS Studio, Loom, or macOS Screen Recording.
3. **Script outline:**
   - *"This is the Knowledge Management Chatbot, a full-stack web app built with Node.js, Express, and the OpenAI API."*
   - Show the UI: navbar, declaration card, chat panel.
   - Send a message in English and show the response.
   - Send a message in Spanish and show the language switch.
   - Briefly show `server.js` — the `/chat` endpoint and the system prompt.
   - Briefly show `app.js` — the `sendMessage` function and `fetch` call.
4. **Export** as MP4 (1080p recommended).

---

## 📜 License

MIT — Free for academic and personal use.
