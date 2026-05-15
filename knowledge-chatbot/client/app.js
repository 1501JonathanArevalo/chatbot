// ============================================================
// app.js — Knowledge Management Chatbot Frontend
// Communicates with the Express backend via Fetch API
// ============================================================

// ── Configuration ─────────────────────────────────────────
const API_URL = "http://localhost:3000/chat";

// ── State ──────────────────────────────────────────────────
let conversationHistory = [];  // Keeps track of the full conversation
let isBotTyping = false;       // Prevents double sends

// ── DOM References ─────────────────────────────────────────
const chatMessages = document.getElementById("chatMessages");
const userInput    = document.getElementById("userInput");
const sendBtn      = document.getElementById("sendBtn");
const clearBtn     = document.getElementById("clearBtn");

// ── Utility: Get current time string ──────────────────────
function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ── Render a message bubble ────────────────────────────────
function renderMessage(role, text, isError = false) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message", role);

  const avatar = document.createElement("div");
  avatar.classList.add("msg-avatar");
  avatar.textContent = role === "user" ? "Tú" : "IA";

  const content = document.createElement("div");
  content.classList.add("msg-content");

  const bubble = document.createElement("div");
  bubble.classList.add("msg-bubble");
  if (isError) bubble.classList.add("error");
  bubble.textContent = text;

  const time = document.createElement("span");
  time.classList.add("msg-time");
  time.textContent = getCurrentTime();

  content.appendChild(bubble);
  content.appendChild(time);

  wrapper.appendChild(avatar);
  wrapper.appendChild(content);

  chatMessages.appendChild(wrapper);
  scrollToBottom();
}

// ── Show / Remove typing indicator ────────────────────────
function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message", "bot");
  typingDiv.id = "typingIndicator";

  const avatar = document.createElement("div");
  avatar.classList.add("msg-avatar");
  avatar.textContent = "IA";

  const content = document.createElement("div");
  content.classList.add("msg-content");

  const indicator = document.createElement("div");
  indicator.classList.add("typing-indicator");
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    dot.classList.add("typing-dot");
    indicator.appendChild(dot);
  }

  content.appendChild(indicator);
  typingDiv.appendChild(avatar);
  typingDiv.appendChild(content);

  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}

function removeTyping() {
  const el = document.getElementById("typingIndicator");
  if (el) el.remove();
}

// ── Scroll chat to bottom ──────────────────────────────────
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ── Set loading state (disable input while bot responds) ──
function setLoading(loading) {
  isBotTyping = loading;
  sendBtn.disabled = loading;
  userInput.disabled = loading;
}

// ── Send a message to the backend ─────────────────────────
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text || isBotTyping) return;

  // 1. Render user message
  renderMessage("user", text);

  // 2. Add to history
  conversationHistory.push({ role: "user", content: text });

  // 3. Clear input
  userInput.value = "";

  // 4. Show typing indicator
  setLoading(true);
  showTyping();

  try {
    // 5. Call the backend
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        history: conversationHistory.slice(-10), // Send last 10 turns for context
      }),
    });

    const data = await response.json();

    removeTyping();

    if (!response.ok) {
      // API-level error
      renderMessage("bot", data.error || "An error occurred. Please try again.", true);
      return;
    }

    // 6. Render bot reply
    renderMessage("bot", data.reply);

    // 7. Add bot reply to history
    conversationHistory.push({ role: "assistant", content: data.reply });

  } catch (err) {
    // Network or server error
    removeTyping();
    renderMessage(
      "bot",
      "⚠ Could not reach the server. Make sure the backend is running on port 3000.",
      true
    );
    console.error("Fetch error:", err);
  } finally {
    setLoading(false);
    userInput.focus();
  }
}

// ── Clear chat ─────────────────────────────────────────────
function clearChat() {
  conversationHistory = [];
  chatMessages.innerHTML = "";
  renderWelcomeMessage();
}

// ── Welcome message on load ────────────────────────────────
function renderWelcomeMessage() {
  const welcomeText =
    "¡Hola! Soy tu asistente de gestión del conocimiento. " +
    "Encarno el principio: soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del " +
    "diálogo y la construcción. Estoy aquí para acompañarte en tu desarrollo " +
    "humano, ético y personal. ¿En qué puedo ayudarte hoy? " +
    "(You can also write to me in English 🌐)";

  renderMessage("bot", welcomeText);
}

// ── Event Listeners ────────────────────────────────────────
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

clearBtn.addEventListener("click", () => {
  if (confirm("¿Limpiar la conversación? / Clear the conversation?")) {
    clearChat();
  }
});

// ── Init ───────────────────────────────────────────────────
renderWelcomeMessage();
userInput.focus();
